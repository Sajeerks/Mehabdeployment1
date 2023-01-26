import React, { useState } from "react";
import "./SidbarLama.css";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const SidbarLama = () => {
  const [colorSEl, setcolorSEl] = useState("blue");
  const changeColorProgaram = () => {
    var store = document.querySelector(":root");
    var value = getComputedStyle(store);
    store.style.setProperty("--firstcol", colorSEl);
  };

  return (
    <div className="sidebarLama">
    
      <div className="toplama">
      <h3 className="sideHeading"> LAMA ADMIN</h3>
        <div className="logolama">
          <EmojiObjectsIcon /> intellignet design{" "}
        </div>
      </div>
      <div className="centerlama">
        <ul>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <p>User Details</p>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <p>Product  Details</p>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
          <p>Contact  Details</p>
          <li>
            <AssignmentIndIcon /> <span>Assignments</span>
          </li>
        </ul>
      </div>
      <div className="bottomside">
        <button onClick={() => changeColorProgaram(colorSEl)}>
          {" "}
          change color
          <input
            type="color"
            onChange={(e) => setcolorSEl(e.target.value)}
            value={colorSEl}
          />
        </button>
      </div>
    </div>
  );
};

export default SidbarLama;
