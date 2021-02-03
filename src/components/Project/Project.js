import React, { useContext, useState } from "react";
import AppContext from "../../context";
import styles from "./Project.module.scss";

const Project = ({ index, name }) => {
  const [panelIsActive, setPanelIsActive] = useState(false);
  const handlePanelActive = () => setPanelIsActive((prevState) => !prevState);

  const {
    changeProjectPosition,
    allProjects,
    projectPanelOpen,
    switchStateItem,
    killStateItem,
    setValueForStateItem,
  } = useContext(AppContext);

  const position = allProjects.findIndex(function (item) {
    return item.name === name;
  });

  const openCloseProjectCard = () => {
    switchStateItem.bind(this, "projectPanelOpen")();
    handlePanelActive();
  };

  const openEditProjectPanel = () => {
    switchStateItem.bind(this, "editProjectPanelOpen")();
    setValueForStateItem.bind(this, "projectInEdition", index)();
    killStateItem.bind(this, "projectPanelOpen")();
    handlePanelActive();
  };

  const mainControlButtons = panelIsActive ? (
    <div className={styles.buttonsBlock}>
      <button onClick={openCloseProjectCard}>x</button>
      <button onClick={openEditProjectPanel}>Edit</button>
    </div>
  ) : null;

  const projectDescriptionPanel = panelIsActive ? (
    <div className={styles.detailsBlock}>{allProjects[index].description}</div>
  ) : null;

  return (
    <li className={panelIsActive ? styles.projectActive : styles.project}>
      <div
        className={styles.mainInfo}
        style={!panelIsActive && projectPanelOpen ? { opacity: 0.3 } : null}
        onClick={
          !panelIsActive && !projectPanelOpen ? openCloseProjectCard : null
        }
      >
        <div className={styles.nameBlock}>
          <h3 className={styles.title}>{allProjects[index].name}</h3>
          {mainControlButtons}
        </div>
        {projectDescriptionPanel}
      </div>
      <div className={styles.upDownBlock}>
        <button
          disabled={index === 0 || projectPanelOpen ? true : false}
          className={styles.upDownBtn}
          onClick={changeProjectPosition.bind(
            this,
            allProjects,
            position,
            "up"
          )}
        >
          up
        </button>
        <button
          disabled={
            index === allProjects.length - 1 || projectPanelOpen ? true : false
          }
          className={styles.upDownBtn}
          onClick={changeProjectPosition.bind(
            this,
            allProjects,
            position,
            "down"
          )}
        >
          down
        </button>
      </div>
    </li>
  );
};
export default Project;
