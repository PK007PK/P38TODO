import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context";
import styles from "./Project.module.scss";

import play from "../../assets/images/play.svg";
import pause from "../../assets/images/pause.svg";

const Project = ({ id }) => {
  const {
    changeProjectPosition,
    allProjects,
    projectOpen,
    deleteProject,
    toogleProjectOpen,
    toogleEditProjectModalOpen,
  } = useContext(AppContext);

  const projectIndex = allProjects.findIndex(function (item) {
    return item.id === id;
  });

  const project = allProjects.find((item) => item.id === id);

  const [projectIsActive, setProjectIsActive] = useState(false);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [seconds, setSeconds] = useState(project.time);

  useEffect(() => {
    let interval = null;
    if (timerIsActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!timerIsActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerIsActive, seconds]);

  // wywalić jsxy do osobnych komponentów ??
  // zmienić nazwy funkcji - to co obrabia inną funkcję to handle
  // poukładać hooki razem
  // dostosować nazwy do aktualnej struktury komponentów

  const handleOpenCloseProjectCard = (id) => {
    toogleProjectOpen(id);
    setProjectIsActive(!projectIsActive);
  };

  const handleOpenEditProjectModal = () => {
    setProjectIsActive(false);
    toogleEditProjectModalOpen(id);
  };

  const handleDeleteProject = () => {
    deleteProject(id);
    setProjectIsActive(!projectIsActive);
  };

  const editDelButtonBlock = projectIsActive ? (
    <div className={styles.editDelButtonBlock}>
      <button className={styles.upDownBtn} onClick={handleOpenEditProjectModal}>
        Edit
      </button>
      <button className={styles.upDownBtn} onClick={handleDeleteProject}>
        Del
      </button>
    </div>
  ) : null;

  const closeButtonBlock = projectIsActive ? (
    <div className={styles.closeButtonBlock}>
      <button
        className={styles.closeBtn}
        onClick={() => {
          handleOpenCloseProjectCard();
          setTimerIsActive(false);
        }}
      >
        Close
      </button>
    </div>
  ) : null;

  const projectMainInfoPanel = projectIsActive ? (
    <div className={styles.projectMainInfoPanel}>
      <div className={styles.timeTrackBlock}>
        <button
          onClick={() => setTimerIsActive(!timerIsActive)}
          className={styles.timeControlBtn}
        >
          <i className={timerIsActive ? styles.pause : styles.play} />
        </button>
        <div className={styles.counter}>{seconds}</div>
      </div>
      <div>{project.description}</div>
    </div>
  ) : null;

  const upDownButtonBlock = (
    <div className={styles.upDownBlock}>
      <button
        disabled={projectIndex === 0 || projectOpen ? true : false}
        className={styles.upDownBtn}
        onClick={changeProjectPosition.bind(
          this,
          allProjects,
          projectIndex,
          "up"
        )}
      >
        up
      </button>
      <button
        disabled={
          projectIndex === allProjects.length - 1 || projectOpen ? true : false
        }
        className={styles.upDownBtn}
        onClick={changeProjectPosition.bind(
          this,
          allProjects,
          projectIndex,
          "down"
        )}
      >
        down
      </button>
    </div>
  );

  return (
    <li className={projectIsActive ? styles.projectActive : styles.project}>
      <div
        className={styles.mainInfo}
        style={!projectIsActive && projectOpen ? { opacity: 0.3 } : null}
        onClick={
          !projectIsActive && !projectOpen ? handleOpenCloseProjectCard : null
        }
      >
        <div className={styles.nameBlock}>
          <h3 className={styles.title}>{project.name}</h3>
        </div>
        {closeButtonBlock}
        {editDelButtonBlock}
        {projectMainInfoPanel}
      </div>
      {upDownButtonBlock}
    </li>
  );
};
export default Project;
