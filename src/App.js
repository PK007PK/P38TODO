import React from "react";
import AppContext from "./context";

import ButtonHuge from "../src/components/ButtonHuge/ButtonHuge";
import Modal from "./components/Modal/Modal";
import ProjectList from "./components/ProjectList/ProjectsList";
import { inArrayPositionChange } from "./utils/inArrayPositionChange";
import FormAddNewProject from "./components/FormAddNewProject/FormAddNewProject";
import FormEditProject from "./components/FormEditProject/FormEditProject";

class AddRemoveListItem extends React.Component {
  state = {
    allProjects: [
      {
        id: 0,
        name: "Dodanie aplikacji todo do portfolio",
        description:
          "1. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed rhoncus semper risus, id placerat neque cursus a. Donec quam nisl, euismod a eleifend in, commodo eu leo. Nunc imperdiet nulla quis semper pretium. Cras sagittis quam eu est volutpat, aliquam lacinia nunc imperdiet. In convallis nulla nibh, in pharetra urna viverra et. In molestie a augue in dapibus. Vivamus non maximus felis, ac lobortis dui.",
      },
      {
        id: 1,
        name: "Zmodyfikowanie portfolio aby pokazywać drobne aktywności",
        description:
          "2. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed rhoncus semper risus, id placerat neque cursus a. Donec quam nisl, euismod a eleifend in, commodo eu leo. Nunc imperdiet nulla quis semper pretium. Cras sagittis quam eu est volutpat, aliquam lacinia nunc imperdiet. In convallis nulla nibh, in pharetra urna viverra et. In molestie a augue in dapibus. Vivamus non maximus felis, ac lobortis dui.",
      },
      {
        id: 2,
        name: "Obrona Ziemi",
        description:
          "3. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed rhoncus semper risus, id placerat neque cursus a. Donec quam nisl, euismod a eleifend in, commodo eu leo. Nunc imperdiet nulla quis semper pretium. Cras sagittis quam eu est volutpat, aliquam lacinia nunc imperdiet. In convallis nulla nibh, in pharetra urna viverra et. In molestie a augue in dapibus. Vivamus non maximus felis, ac lobortis dui.",
      },
      {
        id: 3,
        name: "Podbój Marsa",
        description:
          "4. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed rhoncus semper risus, id placerat neque cursus a. Donec quam nisl, euismod a eleifend in, commodo eu leo. Nunc imperdiet nulla quis semper pretium. Cras sagittis quam eu est volutpat, aliquam lacinia nunc imperdiet. In convallis nulla nibh, in pharetra urna viverra et. In molestie a augue in dapibus. Vivamus non maximus felis, ac lobortis dui.",
      },
    ],
    currentId: 4,
    projectInEdition: null,
    projectPanelOpen: false,
    newProjectPanelOpen: false,
    editProjectPanelOpen: false,
    // switchNewProjectPanel: () => this.switchNewProjectPanel(),
    // switchEditProjectPanel: () => this.switchEditProjectPanel(),
    // changeProjectName: (id, name) => this.changeProjectName(id, name),
    // deleteProject: (id) => this.deleteProject(id),
    // handleInputChange: (e) => this.handleInputChange(e),
    changeProjectPosition: (arr, id, direction) =>
      this.changeProjectPosition(arr, id, direction),
    addNewProject: (item) => this.addNewProject(item),
    updateProject: (item) => this.updateProject(item),
    switchStateItem: (item) => this.switchStateItem(item),
    killStateItem: (item) => this.killStateItem(item),
    setValueForStateItem: (item, value) =>
      this.setValueForStateItem(item, value),
  };

  changeProjectName = (id, name) => {
    const projectBase = this.state.project;
    // const foundIndex = projectBase.findIndex((x) => x.id == id);
    projectBase[id].name = name;
    this.setState({ project: projectBase });
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

export default AddRemoveListItem;
