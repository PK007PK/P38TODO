import React, { useContext } from "react";
import AppContext from "../../context";
import style from "./Modal.module.scss";
import ButtonHuge from "../ButtonHuge/ButtonHuge";

const Modal = ({ content, title }) => {
  const Content = content;
  const { closeModals } = useContext(AppContext);

  return (
    <div className={style.modal}>
      <div className={style.card}>
        <ButtonHuge onClick={closeModals} className={style.switchButton}>
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
