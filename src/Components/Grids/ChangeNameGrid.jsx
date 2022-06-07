import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { checkIfTokenIsValid } from "../../SmallFunctions/CheckIfTokenIsValid";

function ChangeNameGrid() {
  const [usersNewName, setUsersNewName] = useState("");
  const [changeNameSuccess, setNameChangeSuccess] = useState(false);
  const [nameError, setNameError] = useState(false);

  const updateName = async (newName) => {
    if (!newName) {
      setNameError(true);
    }

    let checkToken = await checkIfTokenIsValid();

    if (checkToken === "USER CAN PASS") {
      const changeName = await axios.post(
        "https://api.langregate.com/api/changeName",
        {
          newName: newName,
        }
      );

      if (changeName.data.message === "Name updated") {
        setNameChangeSuccess(true);

        setTimeout(() => {
          setNameChangeSuccess(false);
        }, 2000);
      }
    }
  };

  const changeNameGrid = (
    <Grid container xs="12" direction="column" gap="20px">
      <Grid item sx={{ width: "400px" }}>
        <Typography variant="semiImportantText">Change Name</Typography>
      </Grid>
      <Grid item>
        <TextField
          placeholder="New Name"
          onChange={(e) => {
            setUsersNewName(e.target.value);
          }}
        />
        <Grid item>{changeNameSuccess && "Name changed successfully"}</Grid>
      </Grid>
      <Grid item>
        <Button variant="ctaMain" onClick={() => updateName(usersNewName)}>
          Change Name
        </Button>
      </Grid>
    </Grid>
  );

  return changeNameGrid;
}

export default ChangeNameGrid;
