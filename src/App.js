import React from "react";

import AddProjectPanel from "./components/AddProjectPanel/AddProjectPanel";
import ProjectList from "./components/ProjectList/ProjectsList";
class AddRemoveListItem extends React.Component {
  state = {
    project: [
      { id: 0, name: "aaa", value: 1, active: false, phase: "iideas" },
      { id: 1, name: "bbb", value: 2, active: false, phase: "ideas" },
      { id: 2, name: "ccc", value: 3, active: false, phase: "ideas" },
      { id: 3, name: "ddd", value: 4, active: false, phase: "ideas" },
      { id: 4, name: "eee", value: 4, active: false, phase: "toDo" },
      { id: 5, name: "fff", value: 4, active: false, phase: "toDo" },
      { id: 6, name: "ggg", value: 4, active: false, phase: "toDo" },
      { id: 7, name: "hhh", value: 4, active: false, phase: "inProgress" },
      { id: 8, name: "iii", value: 4, active: false, phase: "inProgress" },
      { id: 9, name: "jjj", value: 4, active: false, phase: "inProgress" },
    ],
    newProject: [{}],
    currentId: 10,
  };

  // handleDelete = (id) => {
  //   let table = this.state.project;
  //   table.splice(id, 1);
  //   this.setState({ project: table });
  // };

  handleDelete = (id) => {
    const newProjectBase = this.state.project.filter((ele) => ele.id != id);
    this.setState({ project: newProjectBase });
    console.log(newProjectBase);
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
      newProject: [{}],
      currentId: prevState.currentId + 1,
    }));

  handleChangeProjectName = (id, name) => {
    console.log("id: ", id, "name: ", name);
    const projectBase = this.state.project;
    const foundIndex = projectBase.findIndex((x) => x.id == id);
    console.log(foundIndex);
    projectBase[foundIndex].name = name;
    this.setState({ project: projectBase });
  };

  handleChangeProjectValue = (id, delta) => {
    // let table = this.state.project;
    // table[id] = { ...table[id], value: table[id].value + delta };
    // this.setState({ project: table });
  };

  render() {
    return (
      <>
        <h1>Todo APP</h1>
        <AddProjectPanel
          inputValue={this.state.inputValue}
          inputChange={this.handleInputChange}
          addProject={this.handleAddItem}
        />
        <div style={{ display: "flex" }}>
          <ProjectList
            phase="ideas"
            handleChangeProjectName={this.handleChangeProjectName}
            list={this.state.project}
            deleteProject={this.handleDelete}
            handleChangeProjectValue={this.handleChangeProjectValue}
            handleChangeProjectPosition={this.handleChangeProjectPosition}
          />
          {/* <ProjectList
            phase="toDo"
            handleChangeProjectName={this.handleChangeProjectName}
            list={this.state.project}
            deleteProject={this.handleDelete}
            handleChangeProjectValue={this.handleChangeProjectValue}
            handleChangeProjectPosition={this.handleChangeProjectPosition}
          />
          <ProjectList
            phase="inProgress"
            handleChangeProjectName={this.handleChangeProjectName}
            list={this.state.project}
            deleteProject={this.handleDelete}
            handleChangeProjectValue={this.handleChangeProjectValue}
            handleChangeProjectPosition={this.handleChangeProjectPosition}
          /> */}
        </div>
      </>
    );
  }
}

export default AddRemoveListItem;
