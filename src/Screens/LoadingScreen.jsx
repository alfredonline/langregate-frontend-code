import React from "react";
import WrapperContainer from "../Components/WrapperContainer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box"

function LoadingScreen() {
  return (
    <WrapperContainer>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </WrapperContainer>
  );
}

export default LoadingScreen;
