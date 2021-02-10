import React, { useState } from "react";
import { useCookies } from "react-cookie";
import AppContext from "./context";

import ButtonHuge from "../src/components/ButtonHuge/ButtonHuge";
import Modal from "./components/Modal/Modal";
import ProjectList from "./components/ProjectList/ProjectsList";
import FormAddNewProject from "./components/FormAddNewProject/FormAddNewProject";
import FormEditProject from "./components/FormEditProject/FormEditProject";

import { inArrayPositionChange } from "./utils/inArrayPositionChange";

import styles from "./app.module.scss";

const App = () => {
  const [cookies, setCookies] = useCookies(["name"]);

  const initialActiveProjects = cookies.allProjects
    ? cookies.allProjects
    : [
        {
          id: 0,
          name:
            "Truth deceptions snare endless inexpedient Truth deceptions snare endless inexpedient",
          description:
            "Battle hatred superiority victorious gains suicide reason society. Hope self disgust derive convictions victorious ascetic. Battle good evil self justice.",
          time: 65,
        },
        {
          id: 1,
          name: "Holiest of contradict spirit dead",
          description:
            "Self burying love passion morality justice morality. Passion ocean oneself burying pious pious victorious inexpedient value will. Fearful",
          time: 22,
        },
      ];
  const initialCompletedProjects = cookies.completedProjects
    ? cookies.completedProjects
    : [
        {
          id: 2,
          name: "Merciful decieve faith free decrepit. Dead merciful play",
          description:
            "Truth christian will law insofar enlightenment snare dead right ultimate. Truth ultimate ocean overcome self philosophy war",
          time: 165,
        },
        {
          id: 3,
          name: "Right convictions justice evil hope of decrepit pious will",
          description:
            "Eternal-return moral superiority christian ocean enlightenment god zarathustra endless prejudice marvelous. Contradict of ideal self christian pinnacle ideal moral.",
          time: 165,
        },
      ];

  const [allProjects, setAllProjects] = useState(initialActiveProjects);
  const [completedProjects, setCompletedProjects] = useState(
    initialCompletedProjects
  );
  const [update, setUpdate] = useState(false);
  const [currentId, setcurrentId] = useState(
    allProjects.length + completedProjects.length
  );
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [projectInEdition, setProjectInEdition] = useState(null);
  const [projectInEditionStatus, setProjectInEditionStatus] = useState(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);

  const saveCookies = () => {
    setCookies("allProjects", allProjects, { path: "/" });
    setCookies("completedProjects", completedProjects, { path: "/" });
  };

  const switchNewProjectPanel = () =>
    setNewProjectModalOpen((prevState) => !prevState);

  const toogleProjectOpen = (id) => {
    setProjectOpen(!projectOpen);
    setProjectInEdition(id);
  };

  const toogleEditProjectModalOpen = (id, status) => {
    setEditProjectModalOpen(!editProjectModalOpen);
    setProjectInEdition(id);
    setProjectInEditionStatus(status);
  };

  const closeModals = () => {
    setEditProjectModalOpen(false);
    setNewProjectModalOpen(false);
    setProjectOpen(false);
  };

  const changeProjectPosition = (arr, index, direction) => {
    const newProjectOrder = inArrayPositionChange(arr, index, direction);
    arr === allProjects
      ? setAllProjects(newProjectOrder)
      : setCompletedProjects(newProjectOrder);
    setUpdate(!update);
    saveCookies();
  };

  const addNewProject = (item) => {
    item.id = currentId;
    setAllProjects((prevState) => [item].concat(prevState));
    setcurrentId((prevState) => prevState + 1);
    saveCookies();
  };

  const updateProject = (item, status) => {
    const selectedProjectBase =
      status === "active" ? allProjects : completedProjects;
    const id = item.id;
    const index = selectedProjectBase.findIndex(function (item) {
      return item.id === id;
    });
    const updatedProjectBase = selectedProjectBase;
    updatedProjectBase[index] = item;
    status === "active"
      ? setAllProjects(updatedProjectBase)
      : setCompletedProjects(updatedProjectBase);
    saveCookies();
  };

  const deleteProject = (id, status) => {
    const selectedProjectBase =
      status === "active" ? allProjects : completedProjects;

    const newProjectBase = selectedProjectBase;
    const index = selectedProjectBase.findIndex(function (item) {
      return item.id === id;
    });
    newProjectBase.splice(index, 1);
    status === "active"
      ? setAllProjects(newProjectBase)
      : setCompletedProjects(newProjectBase);
    setUpdate(!update);
    setProjectOpen(false);
    saveCookies();
  };

  const toogleProjectStatus = (id, item, status) => {
    const selectedProjectBase =
      status === "active" ? allProjects : completedProjects;
    const index = selectedProjectBase.findIndex(function (item) {
      return item.id === id;
    });
    const projectInTransfer = selectedProjectBase[index];
    deleteProject(id, status);
    status === "active"
      ? setCompletedProjects((prevState) =>
          [projectInTransfer].concat(prevState)
        )
      : setAllProjects((prevState) => [projectInTransfer].concat(prevState));
    saveCookies();
  };

  return (
    <AppContext.Provider
      value={{
        addNewProject,
        allProjects,
        changeProjectPosition,
        closeModals,
        completedProjects,
        deleteProject,
        projectInEdition,
        projectInEditionStatus,
        projectOpen,
        setProjectInEdition,
        switchNewProjectPanel,
        toogleEditProjectModalOpen,
        toogleProjectOpen,
        toogleProjectStatus,
        updateProject,
      }}
    >
      {newProjectModalOpen && (
        <Modal title="Add new project" content={() => <FormAddNewProject />} />
      )}
      {editProjectModalOpen && (
        <Modal title="Edit project" content={() => <FormEditProject />} />
      )}
      <div className={styles.container}>
        <div>
          <h1>Todo APP</h1>
          <ButtonHuge onClick={switchNewProjectPanel}>+</ButtonHuge>
          <div className={styles.lists} style={{ display: "flex" }}>
            <ProjectList list={allProjects} status="active" />
            <ProjectList list={completedProjects} status="completed" />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
