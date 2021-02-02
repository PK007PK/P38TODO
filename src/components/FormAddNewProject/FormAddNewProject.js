import React, { useState } from "react";
import style from "./FormAddNewProject.module.scss";
import AppContext from "../../context";

const Form = () => {
  const [state, setState] = useState({ name: "", description: "" });

  const handleInputChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <AppContext.Consumer>
      {({ addNewProject, switchStateItem }) => {
        const handleAddProjectButton = () => {
          addNewProject.bind(this, state)();
          switchStateItem.bind(this, "newProjectPanelOpen")();
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
              <label className={style.label} htmlFor="imie">
                Title:
              </label>
              <div className={style.formItemBar} />
            </div>
            <div className={style.formItem}>
              <input
                className={style.textarea}
                type="textarea"
                name="description"
                value={state.description}
                onChange={handleInputChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label className={style.label} htmlFor="email">
                Description:
              </label>
              <div className={style.formItemBar} />
            </div>
            <div className={style.policy}>
              <input
                className={style.buttons}
                type="checkbox"
                id="policy"
                name="policy"
                required
              />
              <p>Click to confirm</p>
            </div>
            <button className={style.buttons} onClick={handleAddProjectButton}>
              +
            </button>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Form;
