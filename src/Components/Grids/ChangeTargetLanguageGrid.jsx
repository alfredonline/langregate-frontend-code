import axios from "axios";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { TextField, Typography, Autocomplete, Button } from "@mui/material";
import languages from "../../Data/LanguagesArr";
import { checkIfTokenIsValid } from "../../Functions/CheckIfTokenIsValid";

function ChangeTargetLanguageGrid() {
  const [newTargetLanguage, setNewTargetLanguage] = useState("");

  const updateTargetLanguage = async () => {
    let checkToken = await checkIfTokenIsValid();

    if (checkToken === "USER CAN PASS") {
      const updateTL = axios.post("http://api.langregate.com/api/updateTargetLanguage", {
        newTargetLanguage: newTargetLanguage,
      });
    }
  };

  const changeTargetLanguageGrid = (
    <Grid container xs="12" direction="column" gap="20px">
      <Grid item>
        <Typography variant="semiImportantText">
          Update Target Language
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="textMdSemiBoldSemiImportant">
          You can only have one target language at a time. The option to have
          multiple target languages as well as more language options will be in
          the next update of Langregate.
        </Typography>
      </Grid>
      <Grid item>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={languages}
          sx={{ width: 300 }}
          onChange={(e) => {
            setNewTargetLanguage(e.target.lastChild.data);
          }}
          renderInput={(params) => (
            <TextField {...params} label="New Target Language" required />
          )}
        />
      </Grid>
      <Grid item>
        <Typography variant="customText">
          {newTargetLanguage &&
            `Change Target Language to ${newTargetLanguage}`}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => updateTargetLanguage()}
          variant="ctaMain"
        >
          Confirm Change
        </Button>
      </Grid>
    </Grid>
  );

  return changeTargetLanguageGrid;
}

export default ChangeTargetLanguageGrid;
