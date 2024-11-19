import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import Login from './components/Login';
import Register from './components/Register';  
import Notes from './components/Notes';  
import RecordAudio from './components/RecordAudio';

const store = configureStore();

const App = () => {  
  return (
    <Provider store={store}>
      <Router>  
        <Routes>  
          <Route path="/login" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/notes" element={<Notes />} />  
          <Route path="/record/:noteId" element={<RecordAudio />} />  
          <Route path="/" element={<Login />} /> {/* Redirect to login if the path is '/' */}  
        </Routes>
      </Router>
    </Provider>
  );  
};  

export default App;