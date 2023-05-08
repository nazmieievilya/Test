import React from "react";
import { forwardRef } from "react";
import "./workspace.css";

export default function Workspace({
  textareaValue: value,
  setTextareaValue: setValue,
  isEditable,
  forwardedRef,
}) {
  return (
    <div className="workspace">
      <div>Date</div>
      <textarea
        ref={forwardedRef}
        disabled={!isEditable}
        className="new_note"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
}
