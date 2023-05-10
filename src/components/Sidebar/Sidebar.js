import { React, useContext } from "react";
import "./sidebar.css";
import { NotesContext } from "../../context.js";
import ListItem from "../ListItem/ListItem.js";
export default function Sidebar() {
  const { currNote, setCurrNote, notes, setIsWorkspaceEdit, searchValue } =
    useContext(NotesContext);
  return (
    <div className="sidebar" onClick={() => setIsWorkspaceEdit(false)}>
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
