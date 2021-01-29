import React, { useState, useEfect } from "react";
import Project from "../Project/Project";

const ProjectList = ({ list }) => {
  return (
    <div style={{ flexGrow: 1, margin: "0 50px" }}>
      <h2>Taskkk</h2>
      <ul style={{ padding: 0 }}>
        {list.map((item, index) => (
          <Project key={index} index={index} name={item.name} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
