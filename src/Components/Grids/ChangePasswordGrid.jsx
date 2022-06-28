import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { checkIfTokenIsValid } from "../../Functions/CheckIfTokenIsValid";

function ChangePasswordGrid() {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordTwo, setNewPasswordTwo] = useState("");
  const [passwordNotSame, setPasswordNotSame] = useState(false);
  const [passwordShort, setPasswordShort] = useState(false);

  const updatePassword = async (passedInPass) => {
    let checkToken = await checkIfTokenIsValid();
    if (checkToken === "USER CAN PASS") {
      if (newPassword !== newPasswordTwo) {
        setPasswordNotSame(true);
      } else if (newPassword.length < 6) {
        setPasswordShort(true);
      } else {
        setPasswordNotSame(false);
        const changePassword = await axios.post(
          "http://api.langregate.com/api/changePassword",
          {
            currentPassword: passedInPass,
            userNewPassword: newPassword,
          }
        );
      }
    }
  };

  const changePasswordGrid = (
    <Grid container xs="12" direction="column" gap="20px">
      <Grid item>
        {" "}
        <Typography variant="titleText">Change Password</Typography>
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "400px" }}
          placeholder="Current Password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "400px" }}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          helperText={
            passwordNotSame &&
            "Passwords do not match. Please change and resubmit"
          }
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "400px" }}
          placeholder="Confirm New Password"
          onChange={(e) => setNewPasswordTwo(e.target.value)}
          helperText={
            passwordNotSame &&
            "Passwords do not match. Please change and resubmit"
          }
        />
      </Grid>
      <Grid item>
        <Button
          variant="ctaMain"
          onClick={() => updatePassword(currentPassword)}
        >
          Change Password
        </Button>
        {passwordShort && "Password needs to be longer than 6 characters."}
      </Grid>
    </Grid>
  );

  return changePasswordGrid;
}

export default ChangePasswordGrid;
