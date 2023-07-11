import axios from 'axios';

const API_URL = 'http://localhost:6465/auth';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};
