import React from "react";
import style from "./ButtonHuge.module.scss";

const AddProjectPanel = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={style.addButton.concat(" ", className)}
    >
      {children}
    </button>
  );
};

export default AddProjectPanel;
