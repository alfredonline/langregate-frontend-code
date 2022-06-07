import { Grid } from "@mui/material";
import React from "react";


function MediaCardWrapper({ children }) {
  return (
    <Grid sx={{ display: "flex", gap: "35px", flexWrap: "wrap", marginTop: "20px" }}>
      {children}
    </Grid>
  );
}

export default MediaCardWrapper;
