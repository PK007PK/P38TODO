import React from "react";
import AppContext from "./context";

import ButtonHuge from "../src/components/ButtonHuge/ButtonHuge";
import AddProjectPanel from "./components/AddProjectPanel/AddProjectPanel";
import ProjectList from "./components/ProjectList/ProjectsList";
import { inArrayPositionChange } from "./utils/inArrayPositionChange";
class AddRemoveListItem extends React.Component {
  state = {
    project: [
      {
        id: 0,
        name: "Dodanie aplikacji todo do portfolio",
        value: 1,
        active: false,
        phase: "iideas",
      },
      {
        id: 1,
        name: "Zmodyfikowanie portfolio aby pokazywać drobne aktywności",
        value: 2,
        active: false,
        phase: "ideas",
      },
      {
        id: 2,
        name: "Przerobić stronę CV w stronę ogólnego bloga",
        value: 3,
        active: false,
        phase: "ideas",
      },
      {
        id: 3,
        name: "Przygotować arkusz ogólny pod prognozy",
        value: 4,
        active: false,
        phase: "ideas",
      },
    ],
    newProject: { name: "" },
    // currentId: 10,
    newProjectPanelOpen: false,
    changeProjectName: (id, name) => this.changeProjectName(id, name),
    deleteProject: (id) => this.deleteProject(id),
    changeProjectPosition: (arr, id, direction) =>
      this.changeProjectPosition(arr, id, direction),
    switchNewProjectPanel: () => this.switchNewProjectPanel(),
  };

  changeProjectName = (id, name) => {
    console.log("id: ", id, "name: ", name);
    const projectBase = this.state.project;
    const foundIndex = projectBase.findIndex((x) => x.id == id);
    projectBase[foundIndex].name = name;
    this.setState({ project: projectBase });
  };

  deleteProject = (id) => {
    // const newProjectBase = this.state.project.filter((ele) => ele.id != id);
    const newProjectBase = this.state.project;
    newProjectBase.splice(id, 1);
    this.setState({ project: newProjectBase });
  };

  changeProjectPosition = (arr, index, direction) => {
    console.log(arr[index].name, "index: ", index, "Direction: ", direction);
    const newProjectOrder = inArrayPositionChange(arr, index, direction);
    this.setState({ project: newProjectOrder });
  };

  switchNewProjectPanel = () =>
    this.setState((prevState) => ({
      newProjectPanelOpen: !prevState.newProjectPanelOpen,
    }));

  handleInputChange = (e) =>
    this.setState({
      newProject: [
        {
          id: this.state.currentId,
          name: e.target.value,
          value: 0,
          active: false,
          phase: "initial",
        },
      ],
    });

  handleAddItem = () =>
    this.setState((prevState) => ({
      project: prevState.project.concat(this.state.newProject),
      newProject: { name: "" },
      currentId: prevState.currentId + 1,
    }));

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.state.newProjectPanelOpen && <AddProjectPanel />}
        <div style={{ padding: "30px" }}>
          <h1>Todo APP</h1>
          <ButtonHuge onClick={this.switchNewProjectPanel}>+</ButtonHuge>
          {/* <AddProjectPanel
            inputValue={this.state.newProject.name}
            inputChange={this.handleInputChange}
            addProject={this.handleAddItem}
          /> */}
          <div style={{ display: "flex" }}>
            <ProjectList list={this.state.project} />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default AddRemoveListItem;
