import React from "react";
import style from "./AddProject.module.scss";

const AddProjectPanel = ({ inputValue, inputChange, addProject }) => {
  return (
    <>
      {/* <h2>Enter list item:</h2>
      <div>
        <input type="text" value={inputValue} onChange={inputChange} />
        <button onClick={addProject}>Add item</button>
      </div> */}
      <button className={style.addButton}>+</button>
    </>
  );
};

export default AddProjectPanel;
