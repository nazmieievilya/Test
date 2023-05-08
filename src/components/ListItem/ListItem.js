import React from "react";
import "./listItem.css";
export default function ListItem({ note, setCurr, curr }) {
  return (
    <div
      className={+note.id === +curr ? "selected_note" : "not"}
      onClick={() => setCurr(note.id)}
    >
      {note.value}
    </div>
  );
}
