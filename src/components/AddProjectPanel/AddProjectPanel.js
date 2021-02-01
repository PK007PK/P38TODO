import React, { useState } from "react";
import AppContext from "../../context";
import style from "./AddProjectPanel.module.scss";
import ButtonHuge from "../ButtonHuge/ButtonHuge";

const AddProjectPanel = () => {
  return (
    <AppContext.Consumer>
      {({ switchNewProjectPanel }) => (
        <div className={style.panel}>
          <div className={style.card}>
            <ButtonHuge
              onClick={switchNewProjectPanel}
              className={style.switchButton}
            >
              -
            </ButtonHuge>
            <h3>Add new project</h3>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default AddProjectPanel;
