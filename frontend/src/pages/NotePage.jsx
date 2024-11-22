import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecordAudio from "../components/RecordAudio";
import { getNote, createNote, updateNote, deleteNote } from "../services/api";

const getTime = (note) => {
  return new Date(note?.created_at).toLocaleDateString();
};

const NotePage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [note, setNote] = useState({ title: "", description: "" });
  const [audioFiles, setAudioFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await getNote(id);
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
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", note.title);
      formData.append("description", note.description);
      audioFiles.forEach((file) => {
        if (file instanceof File) formData.append("audio_files", file);
      });

      if (id === "new") {
        await createNote(formData);
      } else {
        await updateNote(id, formData);
      }
      navigate("/notes/");
    } catch (error) {
      console.error("Failed to create/update note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(id);
      navigate("/notes/");
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  const handleNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAudioUpload = (files) => {
    setAudioFiles((prev) => [...prev, ...files]);
  };

  const removeAudioFile = (fileName) => {
    setAudioFiles(audioFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-lexend">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="container mx-auto py-8 px-4 md:px-16">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/notes"
              className="w-10 h-10 flex justify-center items-center bg-gray-800 dark:bg-gray-700 rounded-lg text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-600"
            >
              <MdArrowBackIosNew size={20} />
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {id !== "new" && getTime(note)}
            </div>
            {id === "new" ? (
              <button
                onClick={handleUpdate}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleUpdate}
                  className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={note?.title}
              onChange={handleNote}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              value={note?.description}
              onChange={handleNote}
            />
          </div>
          <RecordAudio onAudioUpload={handleAudioUpload} darkMode={darkMode} />
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Uploaded Audio Files</h3>
            <ul className="space-y-2">
              {audioFiles.map((file) => (
                <li
                  key={file.name}
                  className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-4"
                >
                  <span>{file.name.split("/").pop()}</span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        const audio = new Audio(
                          "http://localhost:8000/" + file.name
                        );
                        audio.play();
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeAudioFile(file.name)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default NotePage;
