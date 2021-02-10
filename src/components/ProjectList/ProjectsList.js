import React, { useContext } from "react";
import Project from "../Project/Project";
import AppContext from "../../context";

const ProjectList = ({ list, status }) => {
  const { allProjects } = useContext(AppContext);

  return (
    <div>
      {/* <h2>{list.length === 0 ? "Add first task" : "Active tasks:"}</h2> */}
      <h2>{status === "active" ? "Active tasks" : "Completed tasks:"}</h2>
      <ul style={{ padding: 0 }}>
        {list.map((item) => (
          <Project key={item.id} id={item.id} status={status} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
