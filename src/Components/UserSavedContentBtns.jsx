import { Grid } from "@mui/material";
import React from "react";
import arr from "../Data/UsersSavedContentBtns";

function UserSavedContentBtns(props) {
  const passValueUp = (arrName) => {
    props.changeArrFromChild(arrName);
  };

  return (
    <Grid
      container
      spacing="30px"
      sx={{
        marginTop: "50px",
        color: "#222",
        fontWeight: "600",
        borderBottom: "2px solid #f1f5fe",
        paddingBottom: "30px",
      }}
    >
      <Grid item sx={{ display: "flex", gap: "10px" }}>
        <div
          className="cursorPointer flexSavedContent"
          onClick={(e) => {
            passValueUp(e.target.innerText.toLowerCase());
          }}
        >
          <div> {arr[0].btnName}</div>
          <div className="lengthSaved"> {props.lengthOne}</div>
        </div>
      </Grid>
      <Grid
        item
        sx={{ display: "flex", gap: "10px" }}
        className="cursorPointer"
      >
        <div
          className="cursorPointer flexSavedContent"
          onClick={(e) => {
            passValueUp(e.target.innerText.toLowerCase());
          }}
        >
          <div> {arr[1].btnName}</div>
          <div className="lengthSaved"> {props.lengthTwo}</div>{" "}
        </div>
      </Grid>
      <Grid item sx={{ display: "flex", gap: "10px" }}>
        <div
          className="cursorPointer flexSavedContent"
          onClick={(e) => {
            passValueUp(e.target.innerText.toLowerCase());
          }}
        >
          <div> {arr[2].btnName}</div>
          <div className="lengthSaved"> {props.lengthThree}</div>{" "}
        </div>
      </Grid>
    </Grid>
  );
}

export default UserSavedContentBtns;
