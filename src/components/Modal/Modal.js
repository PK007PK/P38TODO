import React from "react";
import AppContext from "../../context";
import style from "./Modal.module.scss";
import ButtonHuge from "../ButtonHuge/ButtonHuge";

const Modal = ({ content, panel, title }) => {
  const Content = content;
  return (
    <AppContext.Consumer>
      {({ killStateItem }) => (
        <div className={style.panel}>
          <div className={style.card}>
            <ButtonHuge
              onClick={killStateItem.bind(this, panel)}
              className={style.switchButton}
            >
              -
            </ButtonHuge>
            <h3>{title}</h3>
            <Content />
            <p>Buttons are beautiful when they are big...</p>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default Modal;
