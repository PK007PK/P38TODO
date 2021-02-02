import React from "react";
import AppContext from "./context";

import ButtonHuge from "../src/components/ButtonHuge/ButtonHuge";
import Modal from "./components/Modal/Modal";
import ProjectList from "./components/ProjectList/ProjectsList";
import { inArrayPositionChange } from "./utils/inArrayPositionChange";
import FormAddNewProject from "./components/FormAddNewProject/FormAddNewProject";

class AddRemoveListItem extends React.Component {
  state = {
    project: [
      {
        id: 0,
        name: "Dodanie aplikacji todo do portfolio",
        description:
          "1. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed rhoncus semper risus, id placerat neque cursus a. Donec quam nisl, euismod a eleifend in, commodo eu leo. Nunc imperdiet nulla quis semper pretium. Cras sagittis quam eu est volutpat, aliquam lacinia nunc imperdiet. In convallis nulla nibh, in pharetra urna viverra et. In molestie a augue in dapibus. Vivamus non maximus felis, ac lobortis dui.",
        active: false,
      },
      {
        id: 1,
        name: "Zmodyfikowanie portfolio aby pokazywać drobne aktywności",
        description:
          "2. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed rhoncus semper risus, id placerat neque cursus a. Donec quam nisl, euismod a eleifend in, commodo eu leo. Nunc imperdiet nulla quis semper pretium. Cras sagittis quam eu est volutpat, aliquam lacinia nunc imperdiet. In convallis nulla nibh, in pharetra urna viverra et. In molestie a augue in dapibus. Vivamus non maximus felis, ac lobortis dui.",
        active: false,
      },
      {
        id: 2,
        name: "Obrona Ziemi",
        description:
          "3. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed rhoncus semper risus, id placerat neque cursus a. Donec quam nisl, euismod a eleifend in, commodo eu leo. Nunc imperdiet nulla quis semper pretium. Cras sagittis quam eu est volutpat, aliquam lacinia nunc imperdiet. In convallis nulla nibh, in pharetra urna viverra et. In molestie a augue in dapibus. Vivamus non maximus felis, ac lobortis dui.",
        active: false,
      },
      {
        id: 3,
        name: "Podbój Marsa",
        description:
          "4. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed rhoncus semper risus, id placerat neque cursus a. Donec quam nisl, euismod a eleifend in, commodo eu leo. Nunc imperdiet nulla quis semper pretium. Cras sagittis quam eu est volutpat, aliquam lacinia nunc imperdiet. In convallis nulla nibh, in pharetra urna viverra et. In molestie a augue in dapibus. Vivamus non maximus felis, ac lobortis dui.",
        active: false,
      },
    ],
    currentId: 4,
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
    handleAddNewProject: (item) => this.handleAddNewProject(item),
    switchStateItem: (item) => this.switchStateItem(item),
    killStateItem: (item) => this.killStateItem(item),
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
    this.setState({ project: newProjectBase });
  };

  changeProjectPosition = (arr, index, direction) => {
    const newProjectOrder = inArrayPositionChange(arr, index, direction);
    this.setState({ project: newProjectOrder });
  };

  // switchNewProjectPanel = () =>
  //   this.setState((prevState) => ({
  //     newProjectPanelOpen: !prevState.newProjectPanelOpen,
  //   }));

  handleAddNewProject = (item) => {
    item.id = this.state.id;
    this.setState((prevState) => ({
      project: [item].concat(prevState.project),
      currentId: prevState.currentId + 1,
    }));
  };

  switchStateItem = (item) =>
    this.setState((prevState) => ({ [item]: !prevState[item] }));

  killStateItem = (item) => this.setState({ [item]: false });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.state.newProjectPanelOpen && (
          <Modal
            panel="newProjectPanelOpen"
            content={() => <FormAddNewProject />}
          />
        )}
        {this.state.editProjectPanelOpen && (
          <Modal panel="editProjectPanelOpen" content={() => <p>ppp</p>} />
        )}
        <div style={{ padding: "30px" }}>
          <h1>Todo APP</h1>
          <ButtonHuge
            onClick={this.switchStateItem.bind(this, "newProjectPanelOpen")}
          >
            +
          </ButtonHuge>
          <div style={{ display: "flex" }}>
            <ProjectList list={this.state.project} />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default AddRemoveListItem;
