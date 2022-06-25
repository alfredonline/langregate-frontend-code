import React from "react";
import { Grid, Typography } from "@mui/material";

function Title({ mainHeading, secondHeading, icon }) {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "0px",
        alignContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ padding: "0px" }}>
        {icon && icon} {mainHeading}
      </Typography>
      <Typography variant="textMdSemiBoldSemiImportant" sx={{ padding: "0px" }}>
        {secondHeading}
      </Typography>
    </Grid>
  );
}

export default Title;
