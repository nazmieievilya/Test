import React from "react";
import "./sidebar.css";
import ListItem from "../ListItem/ListItem.js";
export default function Sidebar({ notes, setCurr, curr }) {
  return (
    <div>
      {notes.map((note) => (
        <ListItem key={note.id} note={note} curr={curr} setCurr={setCurr} />
      ))}
    </div>
  );
}
