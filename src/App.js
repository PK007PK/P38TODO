import React, { useState } from "react";
import AppContext from "./context";

import ButtonHuge from "../src/components/ButtonHuge/ButtonHuge";
import Modal from "./components/Modal/Modal";
import ProjectList from "./components/ProjectList/ProjectsList";
import FormAddNewProject from "./components/FormAddNewProject/FormAddNewProject";
import FormEditProject from "./components/FormEditProject/FormEditProject";

import { inArrayPositionChange } from "./utils/inArrayPositionChange";

const App = () => {
  const [allProjects, setAllProjects] = useState([
    { id: 0, name: "00000", description: "000 00 0 00" },
    { id: 1, name: "11111", description: "11 1111 111" },
  ]);
  const [update, setUpdate] = useState(false);
  const [currentId, setcurrentId] = useState(2);
  const [newProjectPanelOpen, setNewProjectPanelOpen] = useState(false);

  const switchNewProjectPanel = () =>
    setNewProjectPanelOpen((prevState) => !prevState);

  // const [editProjectPanelOpen, setEditProjectPanelOpen] = useState(false);
  const [projectInEdition, setProjectInEdition] = useState(null);
  const [projectPanelOpen, setProjectPanelOpen] = useState(false);

  const toogleProjectPanelOpen = (id) => {
    setProjectPanelOpen(!projectPanelOpen);
    setProjectInEdition(id);
  };
  // state = {
  //   allProjects: [],
  //   currentId: 2,
  //   projectInEdition: null,
  //   projectPanelOpen: false,
  //   newProjectPanelOpen: false,
  //   editProjectPanelOpen: false,

  //   changeProjectPosition: (arr, id, direction) =>
  //     this.changeProjectPosition(arr, id, direction),
  //   addNewProject: (item) => this.addNewProject(item),
  //   updateProject: (item) => this.updateProject(item),
  //   switchStateItem: (item) => this.switchStateItem(item),
  //   killStateItem: (item) => this.killStateItem(item),
  //   setValueForStateItem: (item, value) =>
  //     this.setValueForStateItem(item, value),
  // };

  // deleteProject = (id) => {
  //   // const newProjectBase = this.state.project.filter((ele) => ele.id != id);
  //   const newProjectBase = this.state.project;
  //   newProjectBase.splice(id, 1);
  //   this.setState({ allProjects: newProjectBase });
  // };

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

  // updateProject = (item) => {
  //   const projectBase = this.state.allProjects;
  //   projectBase[this.state.projectInEdition] = item;
  //   this.setState((prevState) => ({
  //     allProjects: projectBase,
  //   }));
  // };

  // switchStateItem = (item) =>
  //   this.setState((prevState) => ({ [item]: !prevState[item] }));

  // killStateItem = (item) => this.setState({ [item]: false });

  // setValueForStateItem = (item, value) => this.setState({ [item]: value });
  console.log("Initial list: ", allProjects);
  return (
    <AppContext.Provider
      value={{
        changeProjectPosition,
        allProjects,
        switchNewProjectPanel,
        addNewProject,
        projectPanelOpen,
        toogleProjectPanelOpen,
      }}
    >
      {newProjectPanelOpen && (
        <Modal
          title="Add new project"
          panel="newProjectPanelOpen"
          content={() => <FormAddNewProject />}
        />
      )}
      {/* {editProjectPanelOpen && (
        <Modal
          title="Edit project"
          panel="editProjectPanelOpen"
          content={() => (
            <FormEditProject
              name={allProjects[projectInEdition].name}
              description={allProjects[projectInEdition].description}
            />
          )}
        />
      )} */}
      <div style={{ padding: "30px" }}>
        <h1>Todo APP</h1>
        <ButtonHuge onClick={switchNewProjectPanel}>+</ButtonHuge>
        <div style={{ display: "flex" }}>
          <ProjectList />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
