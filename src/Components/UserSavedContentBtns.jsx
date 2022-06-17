import { Grid } from "@mui/material";
import React, { useState } from "react";
import arr from "../Data/UsersSavedContentBtns";

function UserSavedContentBtns(props) {
  const [active, setActive] = useState("Articles");

  // add active class when value is passed up as well in function down below

  const passValueUp = (name, arrName) => {
    switch (name) {
      case "Articles":
        setActive("Articles");
        break;

      case "Movies":
        setActive("Movies");
        break;

      case "Series":
        setActive("Series");
        break;
    }

    props.changeArrFromChild(arrName);
  };

  return (
    <Grid
      container
      spacing="30px"
      sx={{
        marginTop: "30px",
        color: "#222",
        fontWeight: "600",
        borderBottom: "2px solid #f1f5fe",
        paddingBottom: "30px",
      }}
    >
      <Grid item sx={{ display: "flex", gap: "10px" }}>
        <div
          className={active === "Articles" ? "activeItem" : "flexSavedContent"}
          onClick={(e) => {
            passValueUp(e.target.innerText, e.target.innerText.toLowerCase());
          }}
        >
          <div>{arr[0].btnName}</div>
          <div className={active === "Articles" ? "lengthActive" : "lengthSaved"}> {props.lengthOne}</div>
        </div>
      </Grid>
      <Grid
        item
        sx={{ display: "flex", gap: "10px" }}
        className="cursorPointer"
      >
        <div
          className={active === "Movies" ? "activeItem" : "flexSavedContent"}
          onClick={(e) => {
            passValueUp(e.target.innerText, e.target.innerText.toLowerCase());
          }}
        >
          <div> {arr[1].btnName}</div>
          <div className={active === "Movies" ? "lengthActive" : "lengthSaved"}> {props.lengthTwo}</div>{" "}
        </div>
      </Grid>
      <Grid item sx={{ display: "flex", gap: "10px" }}>
        <div
          className={active === "Series" ? "activeItem" : "flexSavedContent"}
          onClick={(e) => {
            passValueUp(e.target.innerText, e.target.innerText.toLowerCase());
          }}
        >
          <div>{arr[2].btnName}</div>
          <div className={active === "Series" ? "lengthActive" : "lengthSaved"}> {props.lengthThree}</div>{" "}
        </div>
      </Grid>
    </Grid>
  );
}

export default UserSavedContentBtns;
