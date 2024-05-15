/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Note from "./components/Note";
import Sample from "./components/Sample";
import axios from "axios";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

function App() {
  const [Notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const fetchData = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(Notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const notesToShow = showAll
    ? Notes
    : Notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = Notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(Notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(Notes.filter((n) => n.id !== id));
      });
  };

  return (
    <>
      {/* <Sample /> */}
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (    
          <Note
            key={note.id}
            content={note.content}
            important={note.important}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          placeholder="a new note.."
          type="text"
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </>
  );
}

export default App;
