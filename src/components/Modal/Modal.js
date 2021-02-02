import React, { useState } from "react";
import AppContext from "../../context";
import style from "./Modal.module.scss";
import ButtonHuge from "../ButtonHuge/ButtonHuge";

const Modal = ({ content, panel }) => {
  const Content = content;
  return (
    <AppContext.Consumer>
      {({ switchNewProjectPanel, killStateItem }) => (
        <div className={style.panel}>
          <div className={style.card}>
            <ButtonHuge
              onClick={killStateItem.bind(this, panel)}
              className={style.switchButton}
            >
              -
            </ButtonHuge>
            <h3>Add new project</h3>
            <Content />
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default Modal;
