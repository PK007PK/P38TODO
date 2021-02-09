import React, { useContext, useState } from "react";
import style from "./FormEditProject.module.scss";
import AppContext from "../../context";

const FormEditProject = () => {
  const { allProjects, projectInEdition } = useContext(AppContext);

  const project = allProjects.find((item) => item.id === projectInEdition);

  const [state, setState] = useState(project);

  const { updateProject, closeModals } = useContext(AppContext);

  const handleInputChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleClick = () => {
    updateProject.bind(this, state)();
    closeModals();
    // switchStateItem.bind(this, "editProjectPanelOpen")();
  };

  return (
    <div className={style.formBody}>
      <div className={style.formItem}>
        <input
          className={style.input}
          type="text"
          name="name"
          placeholder=" "
          value={state.name}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        <label className={style.label} htmlFor="name">
          Title
        </label>
        <div className={style.formItemBar} />
      </div>
      <div className={style.formItem}>
        <input
          className={style.input}
          type="textarea"
          name="description"
          placeholder=" "
          value={state.description}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        <label className={style.label} htmlFor="description">
          Description
        </label>
        <div className={style.formItemBar} />
      </div>
      <button className={style.buttons} onClick={handleClick}>
        +
      </button>
    </div>
  );
};

export default FormEditProject;
