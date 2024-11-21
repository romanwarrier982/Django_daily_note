import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecordAudio from "../components/RecordAudio";
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
  const [audioFiles, setAudioFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await getNote(id, accessToken);
        setNote(noteData);
        setAudioFiles(noteData.audio_files || []);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      }
    };

    if (id === "new") {
      setNote({ title: "", description: "" });
    } else {
      fetchNote();
    }
  }, [id, accessToken]);

  const handleUpdate = async () => {
    try {
      if (id !== 'new' && !note.title) {
        await deleteNote(id, accessToken);
      } else if (id !== 'new') {
        const formData = new FormData();
        formData.append('title', note.title)
        formData.append('description', note.description)
        audioFiles.forEach(file => {
          if (file instanceof File) { 
            formData.append('audio_files', file)
          }
        })
        await updateNote(id, formData, accessToken);
      } else if (id === 'new' && note) {
        const formData = new FormData();
        formData.append('title', note.title)
        formData.append('description', note.description)
        audioFiles.forEach(file => {
          formData.append('audio_files', file)
        })
        await createNote(formData, accessToken);
      }
      navigate("/notes/");
    } catch (error) {
      console.error("Failed to create/update note:", error);
    }
  };

  const handleDelete = () => {
    deleteNote(id, accessToken);
    navigate("/notes/");
  }

  const handleNote = (e) => {
    setNote(({ ...note, [e.target.name]: e.target.value }));
  };

  const handleAudioUpload = (files) => {
    setAudioFiles(prev => [...prev, ...files]);
  };

  const removeAudioFile = (fileName) => {
    setAudioFiles(audioFiles.filter(file => file.name !== fileName)); // Remove file based on its name  
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-lexend ">
        <section className=" border-sky-600 px-4 md:px-16">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="bg-transparent md:pt-2">
            <div className="flex justify-between items-center mb-3 md:my-4">
              <Link
                className="w-10 h-10 flex justify-center items-center rounded-xl bg-gray-700 cursor-pointer"
                to="/notes"
              >
                <MdArrowBackIosNew className="text-white text-xl " />
              </Link>
              <div className="dark:text-white">{id !== 'new' && getTime(note)}</div>
              {id === 'new' ? <></> : (<button
                onClick={handleUpdate}
                className="text-white py-2 px-3  rounded-xl bg-gray-700"
              >
                Update
              </button>)}
              {id === 'new' ? (<button
                onClick={handleUpdate}
                className="text-white py-2 px-3  rounded-xl bg-gray-700"
              >
                Done
              </button>) : (<button
                onClick={() => handleDelete()}
                className="text-white py-2 px-3  rounded-xl bg-stone-950"
              >
                Delete
              </button>)}
            </div>
            <input
              autoFocus
              placeholder="Title"
              className=" dark:text-white bg-transparent w-full h-[6vh] outline-none my-1 p-2 border-2 border-cyan-900 resize-none"
              name="title"
              value={note?.title}
              onChange={(e) => handleNote(e)}
            ></input>
            <textarea
              placeholder="Description"
              className=" dark:text-white bg-transparent w-full h-[25vh] outline-none p-2 border-2 border-cyan-900"
              name="description"
              value={note?.description}
              onChange={(e) => handleNote(e)}
            ></textarea>
            <RecordAudio onAudioUpload={handleAudioUpload} />
            <div className="mt-3">
              <h3 className="dark:text-white">Uploaded Audio Files:</h3>
              <ul>
                {audioFiles?.map(file => (
                  <li className="dark:text-green-900" key={file.name}>
                    {file.name.split('/').pop()}
                    <button
                      onClick={() => {
                        const audio = new Audio("http://localhost:8000/" + file.name);
                        audio.play();
                      }}
                      className="text-blue-500 ml-3"
                    >
                      Play
                    </button>
                    <button onClick={() => removeAudioFile(file.name)} className="text-red-500 ml-3">Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Footer />
        </section>
      </div>
    </div>

  );
};

export default NotePage;
