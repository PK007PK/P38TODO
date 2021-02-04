import React, { useState } from "react";
import AppContext from "./context";

import ButtonHuge from "../src/components/ButtonHuge/ButtonHuge";
import Modal from "./components/Modal/Modal";
import ProjectList from "./components/ProjectList/ProjectsList";
import { inArrayPositionChange } from "./utils/inArrayPositionChange";
import FormAddNewProject from "./components/FormAddNewProject/FormAddNewProject";
import FormEditProject from "./components/FormEditProject/FormEditProject";

const App = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  const changeProjectPosition = (arr, index, direction) => {
    const newProjectOrder = inArrayPositionChange(arr, index, direction);
    this.setState({ project: newProjectOrder });
  };

  const addNewProject = (item) => {
    item.id = this.state.id;
    this.setState((prevState) => ({
      allProjects: [item].concat(prevState.allProjects),
      currentId: prevState.currentId + 1,
    }));
  };

  const updateProject = (item) => {
    const projectBase = this.state.allProjects;
    projectBase[this.state.projectInEdition] = item;
    this.setState((prevState) => ({
      allProjects: projectBase,
    }));
  };

  const deleteProject = (id) => {
    // const newProjectBase = this.state.project.filter((ele) => ele.id != id);
    const newProjectBase = this.state.project;
    newProjectBase.splice(id, 1);
    this.setState({ allProjects: newProjectBase });
  };

  const [projectInEdition, setProjectInEdition] = useState(null);
  const [projectPanelOpen, setProjectPanelOpen] = useState(false);
  const [newProjectPanelOpen, setNewProjectPanelOpen] = useState(false);
  const [editProjectPanelOpen, setEditProjectPanelOpen] = useState(false);

  // state = {

  //   currentId: 4,
  //   projectInEdition: null,
  //   projectPanelOpen: false,
  //   newProjectPanelOpen: false,
  //   editProjectPanelOpen: false,

  //   // changeProjectPosition: (arr, id, direction) =>
  //   //   this.changeProjectPosition(arr, id, direction),
  //   // addNewProject: (item) => this.addNewProject(item),
  //   updateProject: (item) => this.updateProject(item),
  //   switchStateItem: (item) => this.switchStateItem(item),
  //   killStateItem: (item) => this.killStateItem(item),
  //   setValueForStateItem: (item, value) =>
  //     this.setValueForStateItem(item, value),
  // };

  // switchStateItem = (item) =>
  //   this.setState((prevState) => ({ [item]: !prevState[item] }));

  // killStateItem = (item) => this.setState({ [item]: false });

  // setValueForStateItem = (item, value) => this.setState({ [item]: value });

  return (
    <AppContext.Provider value={allProjects}>
      {newProjectPanelOpen && (
        <Modal
          title="Add new project"
          panel="newProjectPanelOpen"
          content={() => <FormAddNewProject />}
        />
      )}
      {editProjectPanelOpen && (
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
      )}
      <div style={{ padding: "30px" }}>
        <h1>Todo APP</h1>
        <ButtonHuge onClick={switchStateItem.bind(this, "newProjectPanelOpen")}>
          +
        </ButtonHuge>
        <div style={{ display: "flex" }}>
          <ProjectList list={allProjects} />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
