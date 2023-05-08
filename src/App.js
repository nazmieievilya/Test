import SearchBox from "./components/SearchBox/SearchBox.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Workspace from "./components/Workspace/Workspace.js";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [textareaValue, setTextareaValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState("");
  const [selectedNote, setSelectedNote] = useState("");
  useEffect(() => {
    const updatedArr = notes.map((note) => {
      if (+note.id === +currNote) return { ...note, value: textareaValue };
      return note;
    });
    setNotes(updatedArr);
    console.log(notes);
  }, [textareaValue]);
  function addNote(e) {
    const newNote = { id: Math.random(), value: textareaValue };
    setCurrNote(newNote.id);
    setTextareaValue("");
    setNotes([...notes, newNote]);
  }
  useEffect(() => {
    if (currNote === "") return;
    setTextareaValue(notes.find((note) => +note.id == +currNote).value);
  }, [currNote]);

  return (
    <div className="App">
      <nav className="navigation">
        <div className="buttons">
          <button onClick={addNote}>+</button>
          <button>del</button>
          <button>edit</button>
        </div>
        <SearchBox />
      </nav>
      <Sidebar notes={notes} curr={currNote} setCurr={setCurrNote} />
      <Workspace
        textareaValue={textareaValue}
        setTextareaValue={setTextareaValue}
      />
    </div>
  );
}

export default App;
