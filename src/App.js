import React from "react";
import AppContext from "./context";

import ButtonHuge from "../src/components/ButtonHuge/ButtonHuge";
import Modal from "./components/Modal/Modal";
import ProjectList from "./components/ProjectList/ProjectsList";
import { inArrayPositionChange } from "./utils/inArrayPositionChange";
import FormAddNewProject from "./components/FormAddNewProject/FormAddNewProject";
import FormEditProject from "./components/FormEditProject/FormEditProject";

class App extends React.Component {
  state = {
    allProjects: [
      {
        id: 0,
        name: "Task 1",
        description: "Description 1",
      },
      {
        id: 1,
        name: "Task 2",
        description: "Description 2",
      },
    ],
    currentId: 2,
    projectInEdition: null,
    projectPanelOpen: false,
    newProjectPanelOpen: false,
    editProjectPanelOpen: false,

    changeProjectPosition: (arr, id, direction) =>
      this.changeProjectPosition(arr, id, direction),
    addNewProject: (item) => this.addNewProject(item),
    updateProject: (item) => this.updateProject(item),
    switchStateItem: (item) => this.switchStateItem(item),
    killStateItem: (item) => this.killStateItem(item),
    setValueForStateItem: (item, value) =>
      this.setValueForStateItem(item, value),
  };

  deleteProject = (id) => {
    // const newProjectBase = this.state.project.filter((ele) => ele.id != id);
    const newProjectBase = this.state.project;
    newProjectBase.splice(id, 1);
    this.setState({ allProjects: newProjectBase });
  };

  changeProjectPosition = (arr, index, direction) => {
    const newProjectOrder = inArrayPositionChange(arr, index, direction);
    this.setState({ project: newProjectOrder });
  };

  addNewProject = (item) => {
    item.id = this.state.id;
    this.setState((prevState) => ({
      allProjects: [item].concat(prevState.allProjects),
      currentId: prevState.currentId + 1,
    }));
  };

  updateProject = (item) => {
    const projectBase = this.state.allProjects;
    projectBase[this.state.projectInEdition] = item;
    this.setState((prevState) => ({
      allProjects: projectBase,
    }));
  };

  switchStateItem = (item) =>
    this.setState((prevState) => ({ [item]: !prevState[item] }));

  killStateItem = (item) => this.setState({ [item]: false });

  setValueForStateItem = (item, value) => this.setState({ [item]: value });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.state.newProjectPanelOpen && (
          <Modal
            title="Add new project"
            panel="newProjectPanelOpen"
            content={() => <FormAddNewProject />}
          />
        )}
        {this.state.editProjectPanelOpen && (
          <Modal
            title="Edit project"
            panel="editProjectPanelOpen"
            content={() => (
              <FormEditProject
                name={this.state.allProjects[this.state.projectInEdition].name}
                description={
                  this.state.allProjects[this.state.projectInEdition]
                    .description
                }
              />
            )}
          />
        )}
        <div style={{ padding: "30px" }}>
          <h1>Todo APP</h1>
          <ButtonHuge
            onClick={this.switchStateItem.bind(this, "newProjectPanelOpen")}
          >
            +
          </ButtonHuge>
          <div style={{ display: "flex" }}>
            <ProjectList list={this.state.allProjects} />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
