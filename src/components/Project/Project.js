import React, { useState } from "react";
import AppContext from "../../context";
import styles from "./Project.module.scss";

const Project = ({ name, id, handleChangeProjectPosition }) => {
  const [projectName, changeName] = useState(name);
  const handleChange = (e) => changeName(e.target.value);

  const [projectValue, changeValue] = useState(name);
  const handleValue = (direction) =>
    changeValue((prevState) => prevState + direction);

  const [panelIsActive, setPanelIsActive] = useState(false);
  const handlePanelActive = () => setPanelIsActive((prevState) => !prevState);

  return (
    <AppContext.Consumer>
      {({ handleChangeProjectName, handleDelete }) => (
        <li
          className={panelIsActive ? styles.projectActive : styles.project}
          onClick={!panelIsActive && handlePanelActive}
        >
          <div className={styles.mainInfo}>
            <div className={styles.nameBlock}>
              <h3 className={styles.title}>{name}</h3>
              {panelIsActive && <button onClick={handlePanelActive}>-</button>}
            </div>
            {panelIsActive && (
              <div className={styles.detailsBlock}>
                <button onClick={handleDelete.bind(this, id)}>Usuń</button>
                <div>
                  <input value={projectName} onChange={handleChange}></input>
                  <button
                    onClick={handleChangeProjectName.bind(
                      this,
                      id,
                      projectName
                    )}
                  >
                    Change name
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.upDownBlock}>
            <button className={styles.upDownBtn}>up</button>
            <button className={styles.upDownBtn}>down</button>
          </div>
        </li>
      )}
    </AppContext.Consumer>
  );
};
export default Project;
