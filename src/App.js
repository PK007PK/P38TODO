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
  console.log("First cookie", cookies);
  const initialActiveBase = [
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

  const initialCompletedBase = [
    {
      id: 2,
      name:
        "Ideal reason suicide grandeur faithful virtues disgust god. Good decieve oneself mountains ocean free selfish.",
      description:
        "Ocean noble burying grandeur love. Victorious holiest decieve right disgust battle eternal-return contradict good madness passion derive. Superiority pious law gains selfish burying hatred insofar morality.",
      time: 165,
    },
    {
      id: 3,
      name:
        "Eternal-return truth zarathustra joy mountains insofar prejudice passion merciful noble salvation good",
      description:
        "Hatred overcome ascetic faith madness philosophy against passion horror grandeur war aversion victorious deceptions. Noble prejudice ideal snare depths. Right intentions ocean love eternal-return chaos snare revaluation victorious grandeur faith.",
      time: 222,
    },
  ];

  const initialActiveProjectsState = cookies.allProjects
    ? cookies.allProjects
    : initialActiveBase;

  const initialCompletedProjectsState = cookies.completedProjects
    ? cookies.completedProjects
    : initialCompletedBase;

  const [allProjects, setAllProjects] = useState(initialActiveProjectsState);

  const [completedProjects, setCompletedProjects] = useState(
    initialCompletedProjectsState
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

  const handleResetCookies = () => {
    setCookies("allProjects", initialActiveBase, { path: "/" });
    setCookies("completedProjects", initialCompletedBase, { path: "/" });
    window.location.reload(false);
  };

  const handleResetClear = () => {
    setCookies("allProjects", [], { path: "/" });
    setCookies("completedProjects", [], { path: "/" });
    window.location.reload(false);
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
      projectInEditionStatus === "active" ? allProjects : completedProjects;
    console.log(selectedProjectBase);
    const id = item.id;
    const index = selectedProjectBase.findIndex(function (item) {
      return item.id === id;
    });
    const updatedProjectBase = selectedProjectBase;
    updatedProjectBase[index] = item;
    projectInEditionStatus === "active" && setAllProjects(updatedProjectBase);
    projectInEditionStatus === "completed" &&
      setCompletedProjects(updatedProjectBase);
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

  saveCookies();

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
        saveCookies,
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
        <div>
          Data stored in cookies{" "}
          <button onClick={handleResetCookies}>Reset to default</button>
          <button onClick={handleResetClear}>Clear</button>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
