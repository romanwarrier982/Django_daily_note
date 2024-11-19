import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { Notes } from './components/Notes';
import RecordAudio from './components/RecordAudio';
import { Logout } from './components/logout';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      {/* <Navigation></Navigation> */}
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Notes />} />
        {/* <Route path="/record/:noteId" element={<RecordAudio />} /> */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;