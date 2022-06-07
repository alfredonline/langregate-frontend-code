import React from "react";
import Box from "@mui/material/Box"

function FlexWrapper({ children }) {
  return (
    <Box display="flex" flexWrap="wrap" rowGap="20px" columnGap="30px">
      {children}
    </Box>
  );
}

export default FlexWrapper;
