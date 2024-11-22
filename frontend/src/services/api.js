import axios from "./axios";

export const login = (credentials) => axios.post(`/auth/login/`, credentials).then(res => res.data);

export const refreshToken = (refresh) => axios.post(`/auth/login/refresh/`, { refresh }).then(res => res.data);

export const signup = (userData) => axios.post(`/auth/signup/`, userData).then(res => res.data);

// Create Note  
export const createNote = (noteData) => axios.post(`/notes/`, noteData).then(res => res.data);

// List Notes  
export const listNotes = () => axios.get(`/notes/`).then(res => res.data);

// Get Note  
export const getNote = (id) => axios.get(`/notes/${id}/`).then(res => res.data);

// Update Note  
export const updateNote = (id, noteData) => axios.put(`/notes/${id}/`, noteData).then((res) => res.data)

// Delete Note  
export const deleteNote = (id) =>  axios.delete(`/notes/${id}/`).then(res => res.data);

export const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(`/auth/token/refresh/`, {
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


