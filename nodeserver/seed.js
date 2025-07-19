// seed.js

require('dotenv').config();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

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

async function seedData() {
  const projects = [
    {
      title: 'Solar-Powered Cold Storage',
      description: 'Affordable cooling systems for rural farmers.',
      category: 'Energy',
      goal: 5000,
      raised: 1200,
      supporters: 5,
      creatorAddress: '0xABC123...DEF',
      status: 'Funding Open',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'E-learning App for Kids',
      description: 'Gamified learning for kids aged 6-12.',
      category: 'Education',
      goal: 10000,
      raised: 7000,
      supporters: 20,
      creatorAddress: '0x456DEF...789',
      status: 'Funding Open',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const backings = [
    {
      projectId: '', // to be filled after project creation
      backerAddress: '0xBACKER001',
      amount: 500,
      createdAt: new Date()
    },
    {
      projectId: '', // to be filled after project creation
      backerAddress: '0xBACKER002',
      amount: 300,
      createdAt: new Date()
    }
  ];

  try {
    console.log('🌱 Seeding Firestore...');

    const createdProjects = [];
    for (const project of projects) {
      const docRef = await db.collection('projects').add(project);
      console.log(`✅ Project added with ID: ${docRef.id}`);
      createdProjects.push(docRef.id);
    }

    // Link backings to the created projects
    backings[0].projectId = createdProjects[0];
    backings[1].projectId = createdProjects[1];

    for (const backing of backings) {
      await db.collection('backings').add(backing);
      console.log(`🎉 Backing added for project ${backing.projectId}`);
    }

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

seedData();
