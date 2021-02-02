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
        return (
          <div>
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
            <button onClick={updateProject.bind(this, state)}>Zmień</button>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export default FormEditProject;
