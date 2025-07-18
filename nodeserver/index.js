// index.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { PinataSDK } = require('pinata-web3');
require('dotenv').config();
const fs = require('fs');

// Replace this with the dynamic serviceAccount config if not using JSON file
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const expressApp = express();

// Use multer memory storage (better for cloud deployments)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// CORS configuration
expressApp.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080',
    'https://arrowstarter.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  credentials: false,
  maxAge: 86400
}));

expressApp.use(express.json());

// Root route
expressApp.get('/', (req, res) => {
  res.send('<h1>Welcome to the Arrow Starter Backend API Server</h1>');
});

// Create project
expressApp.post('/api/projects', async (req, res) => {
  try {
    const { title, description, category, goal, creatorAddress } = req.body;
    const projectRef = await db.collection('projects').add({
      title,
      description,
      category,
      goal,
      creatorAddress,
      raised: 0,
      supporters: 0,
      status: 'Funding Open',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json({ id: projectRef.id, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get projects (with optional filtering)
expressApp.get('/api/projects', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = db.collection('projects');

    if (category && category !== 'all') {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.get();
    const projects = [];

    snapshot.forEach(doc => {
      const project = doc.data();
      if (!search || project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase())) {
        projects.push({ id: doc.id, ...project });
      }
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project by ID
expressApp.get('/api/projects/:id', async (req, res) => {
  try {
    const projectRef = await db.collection('projects').doc(req.params.id).get();
    if (!projectRef.exists) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ id: projectRef.id, ...projectRef.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Back a project
expressApp.post('/api/projects/:id/back', async (req, res) => {
  try {
    const { amount, backerAddress } = req.body;
    const projectRef = db.collection('projects').doc(req.params.id);

    await db.runTransaction(async (transaction) => {
      const project = await transaction.get(projectRef);
      if (!project.exists) throw new Error('Project not found');

      const projectData = project.data();
      transaction.update(projectRef, {
        raised: projectData.raised + amount,
        supporters: projectData.supporters + 1,
        updatedAt: new Date()
      });

      const backingRef = db.collection('backings').doc();
      transaction.set(backingRef, {
        projectId: req.params.id,
        backerAddress,
        amount,
        createdAt: new Date()
      });
    });

    res.json({ message: 'Project backed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize Pinata client
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY
});

// Upload file to Pinata/IPFS
expressApp.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const file = new File([req.file.buffer], req.file.originalname, { type: req.file.mimetype });

    const result = await pinata.upload.file(file);
    const ipfsHash = result.IpfsHash;

    res.json({
      message: 'File uploaded successfully to IPFS via Pinata',
      ipfsHash,
      fileUrl: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      filename: req.file.originalname,
      size: req.file.size,
      pinataUrl: `https://app.pinata.cloud/pinmanager?hash=${ipfsHash}`
    });
  } catch (error) {
    console.error('Pinata upload error:', error);
    res.status(500).json({ error: 'Failed to upload file to IPFS via Pinata' });
  }
});

// Get projects created by a user
expressApp.get('/api/users/:address/projects', async (req, res) => {
  try {
    const { address } = req.params;
    const snapshot = await db.collection('projects').where('creatorAddress', '==', address).get();

    const projects = [];
    snapshot.forEach(doc => projects.push({ id: doc.id, ...doc.data() }));

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get projects backed by a user
expressApp.get('/api/users/:address/backed-projects', async (req, res) => {
  try {
    const { address } = req.params;
    const snapshot = await db.collection('backings').where('backerAddress', '==', address).get();

    const backedProjects = [];
    for (const doc of snapshot.docs) {
      const backing = doc.data();
      const project = await db.collection('projects').doc(backing.projectId).get();
      if (project.exists) {
        backedProjects.push({
          id: project.id,
          ...project.data(),
          backedAmount: backing.amount
        });
      }
    }

    res.json(backedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
expressApp.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
