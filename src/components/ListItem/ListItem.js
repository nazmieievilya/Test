import React from "react";
import "./listItem.css";
export default function ListItem({ note, setCurr, curr }) {
  console.log(note);
  return (
    <div
      className={+note.id === +curr ? "selected_note note_item" : "note_item"}
      onClick={() => setCurr(note.id)}
    >
      {note.value}
    </div>
  );
}
