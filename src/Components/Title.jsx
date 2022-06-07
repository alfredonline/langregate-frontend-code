import React from "react";
import { Container, Grid, Typography } from "@mui/material";

function Title({ mainHeading, secondHeading }) {
  return (
    <Grid sx={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0px"}}>
      <Typography variant="h4" gutterBottom sx={{padding: "0px"}}>
        {mainHeading}
      </Typography>
      <Typography variant="textMdSemiBoldSemiImportant" sx={{padding: "0px"}}>
        {secondHeading}
      </Typography>
    </Grid>
  );
}

export default Title;
