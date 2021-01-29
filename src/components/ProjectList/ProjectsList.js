import React, { useState, useEfect } from "react";
import Project from "../Project/Project";
import { inArrayPositionChange } from "../../utils/inArrayPositionChange";

const ProjectList = ({
  phase,
  list,
  deleteProject,
  handleChangeProjectName,
  handleChangeProjectValue,
  handleChangeProjectPosition,
}) => {
  const [localProjectList, setLocalProjectList] = useState(
    list.filter((item) => item.phase === phase)
  );

  return (
    <div style={{ flexGrow: 1, margin: "0 50px" }}>
      <h2>{phase}:</h2>
      <ul style={{ padding: 0 }}>
        {list.map((item, index) => (
          <Project
            id={item.id}
            key={index}
            name={item.name}
            active={item.active}
            value={item.value}
            deleteProject={deleteProject.bind(this, item.id)}
            handleChangeProjectPosition={handleChangeProjectPosition.bind(
              this,
              index
            )}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
