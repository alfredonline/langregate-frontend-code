import React from "react";
import SearchingImage from "../assets/nothing.svg";

function NothingFoundScreen() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "80vh",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <img
        src={SearchingImage}
        alt="looking for content"
        style={{ width: "400px" }}
      />
      <div>Sorry we found nothing. Try another search?</div>
    </div>
  );
}

export default NothingFoundScreen;
