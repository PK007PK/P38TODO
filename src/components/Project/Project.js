import React, { useState } from "react";

import styles from "./Project.module.scss";

const Project = ({
  name,
  value,
  id,
  active,
  deleteProject,
  handleChangeProjectName,
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
    <li
      className={panelIsActive ? styles.projectActive : styles.project}
      onClick={!panelIsActive && handlePanelActive}
    >
      <div className={styles.nameBlock}>
        <h3 className={styles.title}>{name}</h3>
        {panelIsActive && <button onClick={handlePanelActive}>-</button>}
      </div>
      {panelIsActive && (
        <div className={styles.detailsBlock}>
          <button onClick={deleteProject}>Usuń</button>
          <div>
            <input value={projectName} onChange={handleChange}></input>
            <button onClick={handleChangeProjectName.bind(this, projectName)}>
              Change name
            </button>
          </div>
        </div>
      )}
    </li>
  );
};
export default Project;
