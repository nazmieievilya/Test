import { React, useContext } from "react";
import "./sidebar.css";
import { NotesContext } from "../../context.js";
import ListItem from "../ListItem/ListItem.js";
export default function Sidebar() {
  const {
    currNote,
    setCurrNote,
    notes,
    setIsWorkspaceEdit,
    searchValue,
    showMenu,
    addNote,
    showModalWindow,
    editNote,
    openMenu,
  } = useContext(NotesContext);
  return (
    <div
      className={showMenu ? "sidebar menu_open" : "sidebar menu_close"}
      onClick={() => setIsWorkspaceEdit(false)}
    >
      {notes
        .filter((note) =>
          searchValue.toLowerCase() === ""
            ? note
            : note.value.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((note) => (
          <ListItem
            key={note.id}
            note={note}
            curr={currNote}
            setCurr={setCurrNote}
          />
        ))}
    </div>
  );
}
