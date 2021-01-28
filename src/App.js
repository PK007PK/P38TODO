import React from "react";

import AddProjectPanel from "./components/AddProjectPanel/AddProjectPanel";
import ProjectList from "./components/ProjectList/ProjectsList";
class AddRemoveListItem extends React.Component {
  state = {
    project: [
      { name: "aaa", value: 1 },
      { name: "bbb", value: 2 },
      { name: "ccc", value: 3 },
      { name: "ddd", value: 4 },
    ],
    newProject: [{ name: "", value: 0 }],
  };

  handleDelete = (id) => {
    let table = this.state.project;
    table.splice(id, 1);
    this.setState({ project: table });
  };

  handleInputChange = (e) =>
    this.setState({ newProject: [{ name: e.target.value, value: 0 }] });

  handleAddItem = () =>
    this.setState((prevState) => ({
      project: prevState.project.concat(this.state.newProject),
      newProject: [{ name: "", value: 0 }],
    }));

  handleRename = (id, name) => {
    let table = this.state.project;
    table[id] = { ...table[id], name: name };
    this.setState({ project: table });
  };

  handleChangeProjectValue = (id, delta) => {
    let table = this.state.project;
    table[id] = { ...table[id], value: table[id].value + delta };
    this.setState({ project: table });
  };

  positionChange = (arr, from, direction) => {
    let numberOfDeletedElm = 1;
    if (direction === "down" && from !== arr.length) {
      const elm = arr.splice(from, numberOfDeletedElm)[0];
      numberOfDeletedElm = 0;
      arr.splice(from + 1, numberOfDeletedElm, elm);
    } else if (direction === "up" && from !== 0) {
      const elm = arr.splice(from, numberOfDeletedElm)[0];
      numberOfDeletedElm = 0;
      arr.splice(from - 1, numberOfDeletedElm, elm);
    }
    return arr;
  };

  handleChangeProjectPosition = (index, direction) => {
    const newProjectOrder = this.positionChange(
      this.state.project,
      index,
      direction
    );
    this.setState({ project: newProjectOrder });
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
        <ProjectList
          renameProject={this.handleRename}
          list={this.state.project}
          deleteProject={this.handleDelete}
          handleChangeProjectValue={this.handleChangeProjectValue}
          handleChangeProjectPosition={this.handleChangeProjectPosition}
        />
      </>
    );
  }
}

export default AddRemoveListItem;
