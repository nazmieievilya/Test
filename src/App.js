import SearchBox from "./components/SearchBox/SearchBox.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Workspace from "./components/Workspace/Workspace.js";
import {
  postRecord,
  deleteAllRec,
  getStucturedRecords,
  replaceObjectsInDB,
  getAllDataFromDB,
  addObjectToDB,
} from "./components/dbHandler/dbHandler.js";
import "./App.css";
import { NotesContext } from "./context.js";
import { useState, useEffect, useRef, createContext } from "react";

function App() {
  const [textareaValue, setTextareaValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState("");
  const [isWorkspaceEdit, setIsWorkspaceEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const textarea = useRef(null);
  async function fillnotes() {
    // see "https://i.imgur.com/nIhBVM9.png"
    const data = await getAllDataFromDB();
    if (!data) return;
    console.log(data);
    setNotes(data);
  }
  useEffect(() => {
    fillnotes();
  }, []);
  useEffect(() => {
    const updatedArr = notes.map((note) => {
      if (+note.id === +currNote && note.isEditing)
        return { ...note, value: textareaValue };
      return note;
    });
    if (notes.length !== 0) replaceObjectsInDB(updatedArr);
    setNotes(updatedArr);
  }, [textareaValue]);

  function addNote(e) {
    const newNote = {
      id: Math.random(),
      value: "",
      isEditing: true,
      date: new Date(),
    };
    const updatedArr = notes.map((note) => {
      if (+note.id === +currNote) return { ...note, isEditing: false };
      note.isEditing = false;
      return note;
    });
    textarea.current.focus();
    setCurrNote(newNote.id);
    setNotes([...updatedArr, newNote]);
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
    // replaceObjectsInDB([...updatedArr]);
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
    replaceObjectsInDB(updatedArr);
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
    <NotesContext.Provider
      value={{
        notes,
        currNote,
        setCurrNote,
        setIsWorkspaceEdit,
        textarea,
        isWorkspaceEdit,
        textareaValue,
        setTextareaValue,
        searchValue,
        setSearchValue,
      }}
    >
      <div className="notes_app">
        <div className="App">
          <div className="modal_container">
            <div
              className={showModal ? "modal show_modal" : "modal hide_modal"}
            >
              Are you sure?
              <button onClick={delModal}>Yes, definitely</button>
              <button
                className="close_modal"
                onClick={() => setShowModal(false)}
              >
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
          <Sidebar />
          <Workspace />
        </div>
      </div>
    </NotesContext.Provider>
  );
}

export default App;
