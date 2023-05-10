import React, { useContext } from "react";
import { NotesContext } from "../../context.js";
import "./searchBox.css";

export default function SearchBox() {
  const { searchValue, setSearchValue } = useContext(NotesContext);
  return (
    <div className="searchBox">
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
    </div>
  );
}
