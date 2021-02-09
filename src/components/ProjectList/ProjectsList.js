import React, { useContext } from "react";
import Project from "../Project/Project";
import AppContext from "../../context";

const ProjectList = () => {
  const { allProjects } = useContext(AppContext);

  return (
    <div>
      <h2>{allProjects.length === 0 ? "Add first task" : "Active tasks:"}</h2>
      <ul style={{ padding: 0 }}>
        {allProjects.map((item) => (
          <Project key={item.id} id={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
