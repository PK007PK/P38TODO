import React from "react";

const AddProjectPanel = ({ inputValue, inputChange, addProject }) => {
  return (
    <>
      <h2>Enter list item:</h2>
      <div>
        <input type="text" value={inputValue} onChange={inputChange} />
        <button onClick={addProject}>Add item</button>
      </div>
    </>
  );
};

export default AddProjectPanel;
