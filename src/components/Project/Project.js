import React, { useContext, useState } from "react";
import AppContext from "../../context";
import styles from "./Project.module.scss";

const Project = ({ id }) => {
  const [panelIsActive, setPanelIsActive] = useState(false);

  const {
    changeProjectPosition,
    allProjects,
    projectOpen,
    deleteProject,
    toogleProjectOpen,
    toogleEditProjectModalOpen,
  } = useContext(AppContext);

  const index = allProjects.findIndex(function (item) {
    return item.id === id;
  });

  const project = allProjects.find((item) => item.id === id);

  const openCloseProjectCard = (id) => {
    toogleProjectOpen(id);
    setPanelIsActive(!panelIsActive);
  };

  const openEditProjectPanel = () => {
    setPanelIsActive(false);
    toogleEditProjectModalOpen.bind(this, id)();
  };

  const handleDeleteProject = () => {
    deleteProject.bind(this, id)();
    setPanelIsActive(!panelIsActive);
  };

  const mainControlButtons = panelIsActive ? (
    <div className={styles.mainControlBlock}>
      <button className={styles.upDownBtn} onClick={openEditProjectPanel}>
        Edit
      </button>
      <button className={styles.upDownBtn} onClick={handleDeleteProject}>
        Del
      </button>
    </div>
  ) : null;

  const closeButtonBlock = panelIsActive ? (
    <div className={styles.closeButtonBlock}>
      <button className={styles.closeBtn} onClick={openCloseProjectCard}>
        Close
      </button>
    </div>
  ) : null;

  const projectDescriptionPanel = panelIsActive ? (
    <div className={styles.detailsBlock}>{project.description}</div>
  ) : null;

  return (
    <li className={panelIsActive ? styles.projectActive : styles.project}>
      <div
        className={styles.mainInfo}
        style={!panelIsActive && projectOpen ? { opacity: 0.3 } : null}
        onClick={!panelIsActive && !projectOpen ? openCloseProjectCard : null}
      >
        <div className={styles.nameBlock}>
          <h3 className={styles.title}>{project.name}</h3>
        </div>
        {closeButtonBlock}
        {mainControlButtons}
        {projectDescriptionPanel}
      </div>
      <div className={styles.upDownBlock}>
        <button
          disabled={index === 0 || projectOpen ? true : false}
          className={styles.upDownBtn}
          onClick={changeProjectPosition.bind(this, allProjects, index, "up")}
        >
          up
        </button>
        <button
          disabled={
            index === allProjects.length - 1 || projectOpen ? true : false
          }
          className={styles.upDownBtn}
          onClick={changeProjectPosition.bind(this, allProjects, index, "down")}
        >
          down
        </button>
      </div>
    </li>
  );
};
export default Project;
