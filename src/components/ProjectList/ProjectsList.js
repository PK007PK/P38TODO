import Project from "../Project/Project";

const ProjectList = ({
  list,
  deleteProject,
  renameProject,
  decrase,
  incrase,
}) => {
  return (
    <>
      <h2>List:</h2>
      <ul>
        {list.map((item, index) => (
          <Project
            key={index}
            name={item.name}
            deleteProject={deleteProject.bind(this, index)}
            renameProject={renameProject.bind(this, index)}
            // decrase={decrase.bind(this, index)}
            // incrase={incrase.bind(this, index)}
          />
        ))}
      </ul>
    </>
  );
};

export default ProjectList;
