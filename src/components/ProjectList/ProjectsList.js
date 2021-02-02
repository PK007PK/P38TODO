import React from "react";
import Project from "../Project/Project";

const ProjectList = ({ list }) => {
  return (
    <div>
      <h2>Taskksss:</h2>
      <ul style={{ padding: 0 }}>
        {list.map((item, index) => (
          <Project key={index} index={index} name={item.name} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
