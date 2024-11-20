import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { listNotes } from '../api'; 

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login'
        }
        else {
            const fetchNotes = async () => {  
                try {  
                    const notesData = await listNotes(localStorage.getItem('access_token'));  
                    setNotes(notesData);  
                } catch (error) {  
                    console.error("Failed to fetch notes:", error);  
                }  
            };  
    
            fetchNotes(); 
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Update note  
                const response = await axios.put(`http://localhost:8000/api/notes/${currentNoteId}/`, {
                    title,
                    description
                }, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
                });
                setNotes(notes.map(note => (note.id === currentNoteId ? response.data : note)));
                setIsEditing(false);
            } else {
                // Create a new note  
                const response = await axios.post('http://localhost:8000/api/notes/', {
                    title,
                    description
                }, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
                });
                setNotes([...notes, response.data]);
            }
            setTitle('');
            setDescription('');
            setCurrentNoteId(null);
        } catch (error) {
            console.error('Error submitting note:', error);
        }
    };

    const handleEdit = (note) => {
        setTitle(note.title);
        setDescription(note.description);
        setIsEditing(true);
        setCurrentNoteId(note.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/notes/${id}/`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
            });
            setNotes(notes.filter(note => note.id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div>
            <h1>Notes</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                ></textarea>
                <button type="submit">{isEditing ? 'Update Note' : 'Create Note'}</button>
            </form>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                        <button onClick={() => handleEdit(note)}>Edit</button>
                        <button onClick={() => handleDelete(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;