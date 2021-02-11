import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context";
import styles from "./Project.module.scss";
import { secondsToHms } from "../../utils/secondsToHms";

const Project = ({ id, status }) => {
  const {
    allProjects,
    changeProjectPosition,
    completedProjects,
    deleteProject,
    projectOpen,
    toogleEditProjectModalOpen,
    toogleProjectOpen,
    toogleProjectStatus,
  } = useContext(AppContext);

  const projectBase = status === "active" ? allProjects : completedProjects;

  const projectIndex = projectBase.findIndex(function (item) {
    return item.id === id;
  });

  const project = projectBase.find((item) => item.id === id);

  const [projectIsActive, setProjectIsActive] = useState(false);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [seconds, setSeconds] = useState(project.time);

  useEffect(() => {
    let interval = null;
    if (timerIsActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      project.time = seconds;
    } else if (!timerIsActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerIsActive, seconds, project]);

  const handleOpenCloseProjectCard = (id) => {
    toogleProjectOpen(id);
    setProjectIsActive(!projectIsActive);
  };

  const handleOpenEditProjectModal = () => {
    setProjectIsActive(false);
    toogleEditProjectModalOpen(id, status);
  };

  const handleDeleteProject = () => {
    deleteProject(id, status);
    setProjectIsActive(!projectIsActive);
  };

  const handleProjectTransfer = () => {
    toogleProjectStatus(id, project, status);
    setProjectIsActive(!projectIsActive);
  };

  const editDelButtonBlock = projectIsActive ? (
    <div className={styles.editDelButtonBlock}>
      <button
        className={styles.upDownBtn}
        onClick={handleOpenEditProjectModal}
        style={
          status === "completed"
            ? {
                backgroundColor: "lightgreen",
              }
            : projectIsActive
            ? { backgroundColor: "lightgray" }
            : {}
        }
      >
        Edit
      </button>
      <button
        className={styles.upDownBtn}
        onClick={handleDeleteProject}
        style={
          status === "completed"
            ? {
                backgroundColor: "lightgreen",
              }
            : projectIsActive
            ? { backgroundColor: "lightgray" }
            : {}
        }
      >
        Del
      </button>
    </div>
  ) : null;

  const closeButtonBlock = projectIsActive ? (
    <div className={styles.closeButtonBlock}>
      <button
        style={
          status === "completed"
            ? {
                backgroundColor: "lightgreen",
              }
            : null
        }
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

  const Clock = () => {
    return <div className={styles.counter}>{secondsToHms(seconds)}</div>;
  };

  const projectMainInfoPanel = projectIsActive ? (
    <div className={styles.projectMainInfoPanel}>
      {status === "active" ? (
        <div className={styles.timeTrackBlock}>
          <button
            onClick={() => setTimerIsActive(!timerIsActive)}
            className={styles.timeControlBtn}
          >
            <i className={timerIsActive ? styles.pause : styles.play} />
          </button>
          <Clock />
        </div>
      ) : null}
      <div>{project.description}</div>
    </div>
  ) : null;

  const upDownButtonBlock = !projectIsActive ? (
    <div className={styles.upDownBlock}>
      <button
        style={
          status === "completed"
            ? {
                backgroundColor: "lightgreen",
              }
            : projectIsActive
            ? {}
            : {
                backgroundColor: "white",
              }
        }
        disabled={projectIndex === 0 || projectOpen ? true : false}
        className={styles.upDownBtn}
        onClick={changeProjectPosition.bind(
          this,
          projectBase,
          projectIndex,
          "up"
        )}
      >
        up
      </button>
      <button
        style={
          status === "completed"
            ? {
                backgroundColor: "lightgreen",
              }
            : null
        }
        disabled={
          projectIndex === projectBase.length - 1 || projectOpen ? true : false
        }
        className={styles.upDownBtn}
        onClick={changeProjectPosition.bind(
          this,
          projectBase,
          projectIndex,
          "down"
        )}
      >
        down
      </button>
    </div>
  ) : null;

  const timeWhenInactive = !projectIsActive ? (
    <div
      className={styles.timeWhenInactive}
      style={
        status === "completed"
          ? {
              backgroundColor: "lightgreen",
            }
          : null
      }
    >
      {secondsToHms(seconds)}
    </div>
  ) : null;

  const finishButton = projectIsActive ? (
    <button
      onClick={handleProjectTransfer}
      className={styles.finishButton}
      style={
        status === "completed"
          ? {
              backgroundColor: "lightgreen",
            }
          : null
      }
    >
      {status === "active" ? "Mark as completed" : "Back to active"}
    </button>
  ) : null;

  return (
    <li
      className={projectIsActive ? styles.projectActive : styles.project}
      style={
        status === "completed"
          ? projectIsActive
            ? { backgroundColor: "lightgreen", border: "1px solid red" }
            : { backgroundColor: "lightgreen" }
          : projectIsActive
          ? { border: "1px solid red" }
          : {}
      }
    >
      <div
        className={styles.nameBlock}
        onClick={
          !projectIsActive && !projectOpen ? handleOpenCloseProjectCard : null
        }
        style={
          status === "completed"
            ? projectIsActive
              ? { cursor: "auto" }
              : { cursor: "pointer" }
            : projectIsActive
            ? { cursor: "auto" }
            : { cursor: "pointer" }
        }
      >
        <h3 className={styles.title}>
          {projectIsActive ? project.name : project.name.slice(0, 40)}
        </h3>
      </div>
      {projectMainInfoPanel}
      {closeButtonBlock}
      {editDelButtonBlock}
      {timeWhenInactive}
      {upDownButtonBlock}
      {finishButton}
    </li>
  );
};
export default Project;
