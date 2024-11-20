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
    console.log("noteData is ", noteData)
    for (const [key, value] of noteData.entries()) {  
        console.log(key, value);  
    }  
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

export const uploadAudio = async (id, file, accessToken) => {
    const response = await axios.post(`${API_URL}notes/${id}/audio/`, file, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
};


export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(`${API_URL}auth/token/refresh/`, {
            refresh: refreshToken,
        });

        // Check if the response contains the new access token  
        if (response.data && response.data.access) {
            return response.data.access; // Return the new access token  
        }
        throw new Error('No access token returned');
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null; // If refresh fails, return null (handle this case in your component)  
    }
};


