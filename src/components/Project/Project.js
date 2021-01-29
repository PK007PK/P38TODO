import React, { useState } from "react";
import AppContext from "../../context";
import styles from "./Project.module.scss";

const Project = ({ index, name }) => {
  const [projectName, changeName] = useState(name);
  const handleChange = (e) => changeName(e.target.value);

  const [panelIsActive, setPanelIsActive] = useState(false);
  const handlePanelActive = () => setPanelIsActive((prevState) => !prevState);

  const id = index;

  return (
    <AppContext.Consumer>
      {({
        changeProjectName,
        deleteProject,
        changeProjectPosition,
        project,
      }) => {
        const position = project.findIndex(function (item) {
          return item.name === name;
        });
        return (
          <li className={panelIsActive ? styles.projectActive : styles.project}>
            <div
              className={styles.mainInfo}
              onClick={!panelIsActive && handlePanelActive}
            >
              <div className={styles.nameBlock}>
                <h3 className={styles.title}>{project[id].name}</h3>
                {panelIsActive && (
                  <button onClick={handlePanelActive}>-</button>
                )}
              </div>
              {panelIsActive && (
                <div className={styles.detailsBlock}>
                  <button onClick={deleteProject.bind(this, index)}>
                    {index} Usuń
                  </button>
                  <div>
                    <input value={projectName} onChange={handleChange}></input>
                    <button
                      onClick={changeProjectName.bind(this, id, projectName)}
                    >
                      Change name
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.upDownBlock}>
              <button
                className={styles.upDownBtn}
                onClick={changeProjectPosition.bind(
                  this,
                  project,
                  position,
                  "up"
                )}
              >
                up
              </button>
              <button
                className={styles.upDownBtn}
                onClick={changeProjectPosition.bind(
                  this,
                  project,
                  position,
                  "down"
                )}
              >
                down
              </button>
            </div>
          </li>
        );
      }}
    </AppContext.Consumer>
  );
};
export default Project;
