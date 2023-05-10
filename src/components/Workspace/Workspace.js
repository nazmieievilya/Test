import React, { useContext } from "react";
import "./workspace.css";
import { NotesContext } from "../../context.js";
export default function Workspace() {
  const {
    textarea,
    isWorkspaceEdit,
    notes,
    currNote,
    textareaValue,
    setTextareaValue,
  } = useContext(NotesContext);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = notes.find((note) => +note.id == +currNote)?.date;
  const template = date
    ? `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()} ${
        date.getHours() - 12 < 0 ? "AM" : "PM"
      }`
    : "";
  return (
    <div className="workspace">
      <div>{template}</div>
      <textarea
        ref={textarea}
        disabled={!isWorkspaceEdit}
        className="new_note"
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      ></textarea>
    </div>
  );
}
