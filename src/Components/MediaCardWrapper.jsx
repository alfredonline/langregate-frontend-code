import { Grid } from "@mui/material";
import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';


function MediaCardWrapper({ children }) {

  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Grid sx={{ display: "flex", gap: "35px", flexWrap: "wrap", marginTop: "20px", justifyContent: matches && "center" }}>
      {children}
    </Grid>
  );
}

export default MediaCardWrapper;
