import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { listNotes } from '../services/api';

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await listNotes();
        setNotes(notesData);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-lexend ">
        <section className=" border-sky-600 px-4 md:px-16">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="pb-16 pt-4 min-h-[80vh] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-4 notes">
            <ListItem new />
            {notes.map((note, index) => (
              <ListItem key={index} note={note} />
            ))}
          </div>
          <Footer />
        </section>
      </div>
    </div>

  );
};

export default NotesListPage;
