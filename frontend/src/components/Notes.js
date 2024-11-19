import React, { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';  

const Notes = () => {  
    const [notes, setNotes] = useState([]);  
    const [title, setTitle] = useState('');  
    const [description, setDescription] = useState('');  

    useEffect(() => {  
        fetchNotes();  
    }, []);  

    const fetchNotes = async () => {  
        // const response = await api.get('/notes/', {  
        //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
        // });  
        // setNotes(response.data);  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        // await api.post('/notes/', { title, description }, {  
        //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
        // });  
        setTitle('');  
        setDescription('');  
        fetchNotes();  
    };  

    const handleDelete = async (id) => {  
        // await api.delete(`/notes/${id}/`, {  
        //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },  
        // });  
        fetchNotes();  
    };  

    return (  
        <div>  
            <h1>My Notes</h1>  
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
                />  
                <button type="submit">Add Note</button>  
            </form>  
            <ul>  
                {notes.map(note => (  
                    <li key={note.id}>  
                        <h3>{note.title}</h3>  
                        <p>{note.description}</p>  
                        <Link to={`/record/${note.id}`}>Record Audio</Link>  
                        <button onClick={() => handleDelete(note.id)}>Delete</button>  
                    </li>  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default Notes;