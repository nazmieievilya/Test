import { React, useContext } from "react";
import "./sidebar.css";
import { NotesContext } from "../../context.js";
import ListItem from "../ListItem/ListItem.js";
export default function Sidebar() {
  const { currNote, setCurrNote, notes, setIsWorkspaceEdit } =
    useContext(NotesContext);
  return (
    <div onClick={() => setIsWorkspaceEdit(false)}>
      {notes.map((note) => (
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
