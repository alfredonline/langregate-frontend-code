import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Grid
      container
      sx={{
        maxWidth: "91%",
        margin: "auto",
        borderTop: "2px solid #f1f5fe",
        paddingTop: "60px",
      }}
    >
      <Grid container direction="column" spacing="20px">
        <Grid item>
          <Link to="/Report-bug" className="removeUnderlineNotAffectText">
            Report a bug
          </Link>
        </Grid>
        <Grid item>
          <Link
            to="/Settings/password"
            className="removeUnderlineNotAffectText"
          >
            Settings
          </Link>
        </Grid>
        <Grid item>
          <Link to="/Contact" className="removeUnderlineNotAffectText">
            Contact
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
