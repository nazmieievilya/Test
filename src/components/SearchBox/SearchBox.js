import React, { useContext } from "react";
import { NotesContext } from "../../context.js";
import "./searchBox.css";

export default function SearchBox() {
  const { searchValue, setSearchValue, showMenu } = useContext(NotesContext);
  return (
    <div className={showMenu ? "searchBox" : "searchBox hidden"}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
    </div>
  );
}
