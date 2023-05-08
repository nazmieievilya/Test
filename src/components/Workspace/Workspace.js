import React, { useContext } from "react";
import { forwardRef } from "react";
import "./workspace.css";
import { NotesContext } from "../../context.js";
export default function Workspace() {
  const { textarea, isWorkspaceEdit, textareaValue, setTextareaValue } =
    useContext(NotesContext);
  return (
    <div className="workspace">
      <div>Date</div>
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
