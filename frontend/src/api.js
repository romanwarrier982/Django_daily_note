import axios from "axios";

const API_URL = "http://localhost:8000/api/";  // Adjust the URL as needed  

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}auth/login/`, credentials);
    return response.data;
};

export const refreshToken = async (refresh) => {
    const response = await axios.post(`${API_URL}auth/login/refresh/`, { refresh });
    return response.data;
};

export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}auth/signup/`, userData);
    return response.data;
};

// Create Note  
export const createNote = async (noteData, accessToken) => {
    const response = await axios.post(`${API_URL}notes/`, noteData, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};

// List Notes  
export const listNotes = async (accessToken) => {
    const response = await axios.get(`${API_URL}notes/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};

// Get Note  
export const getNote = async (id, accessToken) => {
    const response = await axios.get(`${API_URL}notes/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};

// Update Note  
export const updateNote = async (id, noteData, accessToken) => {
    const response = await axios.put(`${API_URL}notes/${id}/`, noteData, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};

// Delete Note  
export const deleteNote = async (id, accessToken) => {
    const response = await axios.delete(`${API_URL}notes/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};