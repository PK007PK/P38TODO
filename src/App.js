import React from "react";

import AddProjectPanel from "./components/AddProjectPanel/AddProjectPanel";
import ProjectList from "./components/ProjectList/ProjectsList";
class AddRemoveListItem extends React.Component {
  state = {
    project: [
      { name: "aaa" },
      { name: "bbb" },
      { name: "ccc" },
      { name: "ddd" },
    ],
    inputValue: "",
  };

  handleDelete = (id) => {
    let table = this.state.project;
    table.splice(id, 1);
    this.setState({ project: table });
  };

  handleInputChange = (e) => this.setState({ inputValue: e.target.value });

  handleAddItem = () =>
    this.setState((prevState) => ({
      project: prevState.project.concat(this.state.inputValue),
      inputValue: "",
    }));

  handleRename = (id, name) => {
    let table = this.state.project;
    table[id].name = name;
    this.setState({ project: table });
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
        />
      </>
    );
  }
}

export default AddRemoveListItem;
