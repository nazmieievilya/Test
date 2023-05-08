import React from "react";
import "./workspace.css";

export default function Workspace({
  textareaValue: value,
  setTextareaValue: setValue,
}) {
  return (
    <div className="workspace">
      <div>Date</div>
      <textarea
        className="new_note"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
}
