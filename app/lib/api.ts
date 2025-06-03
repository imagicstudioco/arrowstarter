const API_BASE_URL = 'http://localhost:8080/api';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  goal: number;
  raised: number;
  supporters: number;
  status: string;
  creatorAddress: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}

export interface Backing {
  projectId: string;
  backerAddress: string;
  amount: number;
  createdAt: Date;
}

// Project API calls
export const createProject = async (projectData: Omit<Project, 'id' | 'raised' | 'supporters' | 'status' | 'createdAt' | 'updatedAt'>) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const getProjects = async (category?: string, search?: string) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  
  const response = await fetch(`${API_BASE_URL}/projects?${params.toString()}`);
  return response.json();
};

export const getProject = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  return response.json();
};

// Project backing
export const backProject = async (projectId: string, amount: number, backerAddress: string) => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/back`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount, backerAddress }),
  });
  return response.json();
};

// File upload
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

// User projects
export const getUserProjects = async (address: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${address}/projects`);
  return response.json();
};

export const getUserBackedProjects = async (address: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${address}/backed-projects`);
  return response.json();
}; 