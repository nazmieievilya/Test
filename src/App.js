import SearchBox from "./components/SearchBox/SearchBox.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Workspace from "./components/Workspace/Workspace.js";
import plus from "./components/icons/plus.svg";
import menu from "./components/icons/menu.svg";
import edit from "./components/icons/edit.svg";
import trash from "./components/icons/trash.svg";
import {
  replaceObjectsInDB,
  getAllDataFromDB,
} from "./components/dbHandler/dbHandler.js";
import "./App.css";
import { NotesContext } from "./context.js";
import { useState, useEffect, useRef } from "react";

function App() {
  const [textareaValue, setTextareaValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState("");
  const [isWorkspaceEdit, setIsWorkspaceEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
    openMenu();
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
    openMenu();
    console.log("editing");
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
    replaceObjectsInDB(updatedArr);
  }

  useEffect(() => {
    if (currNote === "") return;
    setTextareaValue(notes.find((note) => +note.id === +currNote).value);

    textarea.current.focus();
    if (notes.find((note) => +note.id === +currNote).isEditing) {
      return setIsWorkspaceEdit(true);
    }
    setIsWorkspaceEdit(false);
  }, [currNote]);
  function openMenu() {
    setShowMenu(!showMenu);
  }
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
        showMenu,
        addNote,
        showModalWindow,
        editNote,
        openMenu,
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
            <div
              className={showMenu ? "buttons menu_open" : "buttons menu_close"}
            >
              <button onClick={addNote}>
                <img src={plus} alt="+" />
              </button>
              <button onClick={showModalWindow}>
                <img src={trash} alt="del" />
              </button>
              <button onClick={editNote}>
                <img src={edit} alt="edit" />
              </button>
            </div>
            <SearchBox />
            <button className="menu" onClick={openMenu}>
              <img src={menu} alt="menu" />
            </button>
          </nav>
          <Sidebar />
          <Workspace />
        </div>
      </div>
    </NotesContext.Provider>
  );
}

export default App;
