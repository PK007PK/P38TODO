import React, { useContext } from "react";
import AppContext from "../../context";
import style from "./Modal.module.scss";
import ButtonHuge from "../ButtonHuge/ButtonHuge";

const Modal = ({ content, panel, title }) => {
  const Content = content;
  const { killStateItem } = useContext(AppContext);

  return (
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
        <p>Big buttons are cool...</p>
      </div>
    </div>
  );
};

export default Modal;
