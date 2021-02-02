import React, { useState } from "react";
import AppContext from "../../context";
import styles from "./Project.module.scss";

const Project = ({ index, name }) => {
  const [panelIsActive, setPanelIsActive] = useState(false);
  const handlePanelActive = () => setPanelIsActive((prevState) => !prevState);

  return (
    <AppContext.Consumer>
      {({
        changeProjectPosition,
        project,
        projectPanelOpen,
        switchStateItem,
        killStateItem,
      }) => {
        const position = project.findIndex(function (item) {
          return item.name === name;
        });

        const openCloseProjectCard = () => {
          switchStateItem.bind(this, "projectPanelOpen")();
          handlePanelActive();
        };

        const openEditProjectPanel = () => {
          switchStateItem.bind(this, "editProjectPanelOpen")();
          killStateItem.bind(this, "projectPanelOpen")();
          handlePanelActive();
        };

        return (
          <li className={panelIsActive ? styles.projectActive : styles.project}>
            <div
              className={styles.mainInfo}
              onClick={!panelIsActive ? openCloseProjectCard : null}
            >
              <div className={styles.nameBlock}>
                <h3 className={styles.title}>{project[index].name}</h3>
                {panelIsActive && (
                  <div className={styles.buttonsBlock}>
                    <button onClick={openCloseProjectCard}>x</button>
                    <button onClick={openEditProjectPanel}>Edit</button>
                  </div>
                )}
              </div>
              {panelIsActive && (
                <div className={styles.detailsBlock}>
                  {project[index].description}
                </div>
              )}
            </div>
            <div className={styles.upDownBlock}>
              <button
                disabled={index === 0 || projectPanelOpen ? true : false}
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
                disabled={
                  index === project.length - 1 || projectPanelOpen
                    ? true
                    : false
                }
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
