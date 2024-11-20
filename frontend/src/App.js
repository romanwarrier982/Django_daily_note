import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Notes from './components/Notes';
import RecordAudio from './components/RecordAudio';
import { Logout } from './components/logout';
import Signup from './components/Signup';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<NotesListPage />} />
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/new-note" element={<NotePage />} />
        {/* <Route path="/record/:noteId" element={<RecordAudio />} /> */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;