import React from "react";
import AppContext from "./context";

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
      // {
      //   id: 0,
      //   name: "000",
      //   value: 1,
      //   active: false,
      //   phase: "iideas",
      // },
      // {
      //   id: 1,
      //   name: "111",
      //   value: 2,
      //   active: false,
      //   phase: "ideas",
      // },
      // {
      //   id: 2,
      //   name: "222",
      //   value: 3,
      //   active: false,
      //   phase: "ideas",
      // },
      // {
      //   id: 3,
      //   name: "333",
      //   value: 4,
      //   active: false,
      //   phase: "ideas",
      // },
    ],
    newProject: { name: "" },
    currentId: 10,
    handleChangeProjectName: (id, name) =>
      this.handleChangeProjectName(id, name),
    handleDelete: (id) => this.handleDelete(id),
    handleChangeProjectPosition: (arr, id, direction) =>
      this.handleChangeProjectPosition(arr, id, direction),
  };

  handleChangeProjectName = (id, name) => {
    console.log("id: ", id, "name: ", name);
    const projectBase = this.state.project;
    const foundIndex = projectBase.findIndex((x) => x.id == id);
    projectBase[foundIndex].name = name;
    this.setState({ project: projectBase });
  };

  handleDelete = (id) => {
    // const newProjectBase = this.state.project.filter((ele) => ele.id != id);
    const newProjectBase = this.state.project;
    newProjectBase.splice(id, 1);
    this.setState({ project: newProjectBase });
  };

  handleChangeProjectPosition = (arr, index, direction) => {
    console.log(arr[index].name, "index: ", index, "Direction: ", direction);
    const newProjectOrder = inArrayPositionChange(arr, index, direction);
    this.setState({ project: newProjectOrder });
  };

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

  handleChangeProjectValue = (id, delta) => {
    // let table = this.state.project;
    // table[id] = { ...table[id], value: table[id].value + delta };
    // this.setState({ project: table });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <h1>Todo APP</h1>
        <AddProjectPanel
          inputValue={this.state.newProject.name}
          inputChange={this.handleInputChange}
          addProject={this.handleAddItem}
        />
        <div style={{ display: "flex" }}>
          <ProjectList
            handleChangeProjectName={this.handleChangeProjectName}
            list={this.state.project}
            deleteProject={this.handleDelete}
            handleChangeProjectValue={this.handleChangeProjectValue}
            handleChangeProjectPosition={this.handleChangeProjectPosition}
          />
        </div>
      </AppContext.Provider>
    );
  }
}

export default AddRemoveListItem;
