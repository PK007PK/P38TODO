import React from "react";
import Project from "../Project/Project";

const ProjectList = ({ list, status }) => {
  return (
    <div>
      <h2>
        {status === "active"
          ? list.length === 0
            ? "Add first task"
            : "Active tasks"
          : list.length === 0
          ? null
          : "Completed tasks:"}
      </h2>
      <ul style={{ padding: 0 }}>
        {list.map((item) => (
          <Project key={item.id} id={item.id} status={status} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
