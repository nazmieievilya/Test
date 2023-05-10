import React from "react";
import "./listItem.css";
export default function ListItem({ note, setCurr, curr }) {
  const date = note?.date;
  const template = date
    ? new Date() - date > 86400000
      ? `${date.getMonth() + 1}/${date.getDate()}/${String(
          date.getFullYear()
        ).substring(2)}`
      : `${date.getHours()}:${date.getMinutes()} ${
          date.getHours() - 12 < 0 ? "AM" : "PM"
        }`
    : "";
  const text = note.value.split(/\r?\n|\r|\n/g);
  return (
    <div
      className={+note.id === +curr ? "selected_note note_item" : "note_item"}
      onClick={() => setCurr(note.id)}
    >
      <h2>{text[0]}</h2>
      <div className="note_description">
        <h4>{template}</h4>
        <p>{text[1]}</p>
      </div>
    </div>
  );
}
