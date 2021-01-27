import React, { useState } from "react";

import styles from "./Project.module.scss";

const Project = ({ name, deleteProject, renameProject, decrase, incrase }) => {
  const [projectName, changeName] = useState(name);
  const handleChange = (e) => changeName(e.target.value);

  const [panelIsActive, setPanelIsActive] = useState(false);
  const handlePanelActive = () => setPanelIsActive((prevState) => !prevState);

  return (
    <li className={styles.project}>
      <div className={styles.nameBlock}>
        <h3>Nazwa: {name}</h3>
        <div className={styles.buttonsBlock}>
          <button onClick={handlePanelActive}>Edit</button>{" "}
          <button onClick={deleteProject}>Usuń</button>
          <button onClick={decrase}>-</button>
          <button onClick={incrase}>+</button>
        </div>
      </div>
      {panelIsActive && (
        <div>
          <input value={projectName} onChange={handleChange}></input>
          <button onClick={renameProject.bind(this, projectName)}>
            Change name
          </button>
        </div>
      )}
    </li>
  );
};
export default Project;
