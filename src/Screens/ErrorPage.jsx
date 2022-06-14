import React from "react";
import CenterWrapper from "../Components/CenterWrapper";
import { Typography } from "@mui/material";

function ErrorPage() {
  return (
    <CenterWrapper>
      <Typography
        sx={{ fontWeight: "700", fontSize: "32px", paddingTop: "30px" }}
      >
        Oh No! It looks like you're lost!
      </Typography>
      <Typography sx={{ fontSize: "18px", paddingTop: "12px", paddingBottom: "30px" }}>
        Use the nav bar to find your way back around.
      </Typography>
    </CenterWrapper>
  );
}

export default ErrorPage;
