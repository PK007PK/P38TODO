import React, { useState, useEffect } from "react";
import AppContext from "./context";

import ButtonHuge from "../src/components/ButtonHuge/ButtonHuge";
import Modal from "./components/Modal/Modal";
import ProjectList from "./components/ProjectList/ProjectsList";
import FormAddNewProject from "./components/FormAddNewProject/FormAddNewProject";
import FormEditProject from "./components/FormEditProject/FormEditProject";

import { inArrayPositionChange } from "./utils/inArrayPositionChange";
import style from "./app.module.scss";

const App = () => {
  const [allProjects, setAllProjects] = useState([
    {
      id: 0,
      name: "Truth deceptions snare endless inexpedient",
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
  ]);
  const [update, setUpdate] = useState(false);
  const [currentId, setcurrentId] = useState(2);

  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);

  const switchNewProjectPanel = () =>
    setNewProjectModalOpen((prevState) => !prevState);

  const [projectInEdition, setProjectInEdition] = useState(null);
  const [projectOpen, setProjectOpen] = useState(false);

  const toogleProjectOpen = (id) => {
    setProjectOpen(!projectOpen);
    setProjectInEdition(id);
  };

  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);

  const toogleEditProjectModalOpen = (id) => {
    setEditProjectModalOpen(!editProjectModalOpen);
    setProjectInEdition(id);
  };

  const closeModals = () => {
    setEditProjectModalOpen(false);
    setNewProjectModalOpen(false);
    setProjectOpen(false);
  };

  const changeProjectPosition = (arr, index, direction) => {
    const newProjectOrder = inArrayPositionChange(arr, index, direction);
    setAllProjects(newProjectOrder);
    setUpdate(!update);
  };

  const addNewProject = (item) => {
    item.id = currentId;
    setAllProjects((prevState) => [item].concat(prevState));
    setcurrentId((prevState) => prevState + 1);
  };

  const updateProject = (item) => {
    const id = item.id;
    const index = allProjects.findIndex(function (item) {
      return item.id === id;
    });
    const updatedProjectBase = allProjects;
    updatedProjectBase[index] = item;
    setAllProjects(updatedProjectBase);
  };

  const deleteProject = (id) => {
    const newProjectBase = allProjects;
    const index = allProjects.findIndex(function (item) {
      return item.id === id;
    });
    newProjectBase.splice(index, 1);
    setAllProjects(newProjectBase);
    setUpdate(!update);
    setProjectOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        allProjects,
        changeProjectPosition,
        addNewProject,
        deleteProject,
        projectOpen,
        projectInEdition,
        setProjectInEdition,
        switchNewProjectPanel,
        toogleProjectOpen,
        updateProject,
        toogleEditProjectModalOpen,
        closeModals,
      }}
    >
      {newProjectModalOpen && (
        <Modal title="Add new project" content={() => <FormAddNewProject />} />
      )}
      {editProjectModalOpen && (
        <Modal title="Edit project" content={() => <FormEditProject />} />
      )}
      <div className={style.container}>
        <div>
          <h1>Todo APP</h1>
          <ButtonHuge onClick={switchNewProjectPanel}>+</ButtonHuge>
          <div style={{ display: "flex" }}>
            <ProjectList />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
