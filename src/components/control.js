import React, { Fragment } from "react";
import Menu from "./menu";
// import THREEBOX from "./three";
// import CARRYBOX from "./carrybox/carry"
// import FOODBOX from "./foodbox/food"
// import TRAYBOX from "./traybox/tray"
// import TRAYSBOX from "./traybox/trays"
// import SHIRTBOX from "./shirtbox/shirt"
// import UNTITLEDBOX from "./untitledbox/untitled"
import UNTITLED2BOX from "./untitled2box/untitled2"

const Control = () => {
  // Button
  const closeBox = (clb) => {
    // console.log("Close");
    return UNTITLED2BOX.rotations1();
  };

  const openBox = (opb) => {
    // console.log("Open");
    return UNTITLED2BOX.rotations2();
  };

  // Slider
  const sizeShape = (a, b, c) => {
    // console.log(`${a} ${b} ${c}`);
    return UNTITLED2BOX.updateSize(a, b, c);
  };

  // showShape
  const showShape = () => {
    return UNTITLED2BOX.main();
  };

  return (
    <Fragment>
      {showShape()}
      <Menu
        clb={closeBox}
        opb={openBox}
        size={sizeShape} />
    </Fragment>
  );
};

export default Control;
