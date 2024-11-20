import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getNote, createNote, updateNote, deleteNote } from '../api';


let getTime = (note) => {
  return new Date(note?.created_at).toLocaleDateString();
};

const NotePage = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [note, setNote] = useState({
    title: "",
    description: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await getNote(id, accessToken);
        setNote(noteData);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      }
    };

    if ( id == "new") {
      setNote({title: "", description: ""});
    } else {
      fetchNote();
    }
  }, [id]);

  const handleUpdate = () => {
    if (id !== 'new' && !note.title) {
      deleteNote(id, accessToken)
    } else if (id !== 'new') {
      updateNote(id, note, accessToken);
    } else if (id === 'new' && note !== null) {
      createNote(note, accessToken)
    }
    navigate("/notes/");
  };

  const handleDelete = () => {
    deleteNote(id, accessToken);
    navigate("/notes/");
  }

  const handleNote = (e) => {
    setNote(({ ...note, [e.target.name]: e.target.value }));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-lexend ">
        <section className=" border-sky-600 px-4 md:px-16">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="bg-transparent md:pt-2">
            <div className="flex justify-between items-center mb-5 md:my-4">
              <div
                onClick={handleUpdate}
                className="w-10 h-10 flex justify-center items-center rounded-xl bg-gray-700 cursor-pointer"
              >
                <MdArrowBackIosNew className="text-white text-xl " />
              </div>
              <div className="dark:text-white">{id !== 'new' && getTime(note)}</div>
              {id === 'new' ? (<button
                onClick={handleUpdate}
                className="text-white py-2 px-3  rounded-xl bg-gray-700"
              >
                Done
              </button>) : (<button
                onClick={() => handleDelete()}
                className="text-white py-2 px-3  rounded-xl bg-gray-700"
              >
                Delete
              </button>)}
            </div>
            <input
              autoFocus
              placeholder="Title"
              className=" dark:text-white bg-transparent w-full h-[10vh] outline-none border-none resize-none"
              name="title"
              value={note?.title}
              onChange={(e) => handleNote(e)}
            ></input>
            <textarea
              placeholder="Description"
              className=" dark:text-white bg-transparent w-full h-[50vh] outline-none border-none resize-none"
              name="description"
              value={note?.description}
              onChange={(e) => handleNote(e)}
            ></textarea>
          </div>
          <Footer />
        </section>
      </div>
    </div>

  );
};

export default NotePage;
