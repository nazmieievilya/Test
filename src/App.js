import SearchBox from "./components/SearchBox/SearchBox.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Workspace from "./components/Workspace/Workspace.js";
import "./App.css";
import { useState, useEffect, useRef } from "react";
function App() {
  const [textareaValue, setTextareaValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState("");
  const [isWorkspaceEdit, setIsWorkspaceEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const textarea = useRef(null);

  useEffect(() => {
    const updatedArr = notes.map((note) => {
      if (+note.id === +currNote && note.isEditing)
        return { ...note, value: textareaValue };
      return note;
    });
    setNotes(updatedArr);
    console.log(notes);
  }, [textareaValue]);

  function addNote(e) {
    const newNote = { id: Math.random(), value: "", isEditing: true };
    const updatedArr = notes.map((note) => {
      if (+note.id === +currNote) return { ...note, isEditing: false };
      note.isEditing = false;
      return note;
    });
    textarea.current.focus();
    setCurrNote(newNote.id);
    setNotes([...updatedArr, newNote]);
    console.log(notes);
  }
  function editNote() {
    const updatedArr = notes.map((note) => {
      if (+note.id === +currNote) {
        note.isEditing = true;
        return note;
      }
      note.isEditing = false;
      return note;
    });
    setNotes([...updatedArr]);
    setIsWorkspaceEdit(true);
  }

  function showModalWindow() {
    if (currNote.length < 2) return;
    setShowModal(true);
  }

  function delModal() {
    setShowModal(false);
    const updatedArr = notes.filter((note) => +note.id !== +currNote);
    setNotes(updatedArr);
  }

  useEffect(() => {
    if (currNote === "") return;
    setTextareaValue(notes.find((note) => +note.id == +currNote).value);

    textarea.current.focus();
    if (notes.find((note) => +note.id == +currNote).isEditing) {
      return setIsWorkspaceEdit(true);
    }
    setIsWorkspaceEdit(false);
  }, [currNote]);

  return (
    <div className="App">
      <div className="modal_container">
        <div className={showModal ? "modal show_modal" : "modal hide_modal"}>
          Are you sure?
          <button onClick={delModal}>Yes, definitely</button>
          <button className="close_modal" onClick={() => setShowModal(false)}>
            X
          </button>
        </div>
      </div>

      <nav className="navigation">
        <div className="buttons">
          <button onClick={addNote}>+</button>
          <button onClick={showModalWindow}>del</button>
          <button onClick={editNote}>edit</button>
        </div>
        <SearchBox />
      </nav>
      <Sidebar
        isEdit={setIsWorkspaceEdit}
        notes={notes}
        curr={currNote}
        setCurr={setCurrNote}
      />
      <Workspace
        forwardedRef={textarea}
        isEditable={isWorkspaceEdit}
        textareaValue={textareaValue}
        setTextareaValue={setTextareaValue}
      />
    </div>
  );
}

export default App;
