import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;