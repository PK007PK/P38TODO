import React, { useState } from "react";
import style from "./FormEditProject.module.scss";
import AppContext from "../../context";

const FormEditProject = ({ name, description }) => {
  const [state, setState] = useState({ name: name, description: description });

  const handleInputChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <AppContext.Consumer>
      {({ switchStateItem, updateProject }) => {
        const handleClick = () => {
          updateProject.bind(this, state)();
          switchStateItem.bind(this, "editProjectPanelOpen")();
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
      }}
    </AppContext.Consumer>
  );
};

export default FormEditProject;
