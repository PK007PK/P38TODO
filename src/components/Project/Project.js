import React, { useState } from "react";

import styles from "./Project.module.scss";

const Project = ({
  name,
  value,
  deleteProject,
  renameProject,
  handleChangeProjectValue,
  handleChangeProjectPosition,
}) => {
  const [projectName, changeName] = useState(name);
  const handleChange = (e) => changeName(e.target.value);

  const [projectValue, changeValue] = useState(name);
  const handleValue = (direction) =>
    changeValue((prevState) => prevState + direction);

  const [panelIsActive, setPanelIsActive] = useState(false);
  const handlePanelActive = () => setPanelIsActive((prevState) => !prevState);

  return (
    <li className={styles.project}>
      <div className={styles.nameBlock}>
        <h3>Nazwa: {name}</h3>
        <p>wartość: {value}</p>
        <div className={styles.buttonsBlock}>
          <button onClick={handlePanelActive}>Edit</button>{" "}
          <button onClick={deleteProject}>Usuń</button>
          <button onClick={handleChangeProjectPosition.bind(this, "up")}>
            up
          </button>
          <button onClick={handleChangeProjectPosition.bind(this, "down")}>
            down
          </button>
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
