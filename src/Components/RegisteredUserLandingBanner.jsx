import { Typography, Button } from "@mui/material";
import React from "react";
function RegisteredUserLandingBanner({ targetLanguage, name }) {
  return (
    <div className="RegisteredUserLandingBanner">
      <Typography variant="textLgBoldImportant">
        There's a whole world of {targetLanguage} media waiting for you, {name}
      </Typography>
    </div>
  );
}

export default RegisteredUserLandingBanner;
