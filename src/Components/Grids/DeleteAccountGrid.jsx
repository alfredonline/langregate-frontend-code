import React, { useState, useContext, useEffect } from "react";
import { TextField, Typography, Button, Grid } from "@mui/material";
import axios from "axios";
import { ContextUser } from "../../ContextUser";
import { useNavigate } from "react-router-dom";
import { checkIfTokenIsValid } from "../../SmallFunctions/CheckIfTokenIsValid";

function DeleteAccountGrid({ userInfoPassedInEmail }) {
  const { signUserInOut } = useContext(ContextUser);

  const navigate = useNavigate();

  const sendToLandingPage = () => {
    navigate("/logoutUser");
  };

  const [usersEmail, setUsersEmail] = useState("");

  const deleteAccountForUser = async () => {
    let checkToken = await checkIfTokenIsValid();

    if (checkToken === "USER CAN PASS") {
      if (usersEmail === userInfoPassedInEmail) {
        const accToDelete = await axios.post("https://api.langregate.com/api/deleteAccount", {
          usersEmail: usersEmail,
        });
        sendToLandingPage();
        signUserInOut(false)
      }
    }
  };

  const deleteAccountGrid = (
    <Grid container xs="12" direction="column" gap="20px">
      <Grid item sx={{ width: "400px" }}>
        <Typography variant="semiImportantText">DELETE ACCOUNT</Typography>
      </Grid>
      <Grid item>
        <Typography variant="errorText">
          This action is irreversible. There is no way to undo this action. Once
          your account is deleted, it is gone for good.
        </Typography>
      </Grid>
      <Grid item variant="errorText">
        Enter the email address associated with your account to delete your
        account for good.
      </Grid>
      <Grid item>
        <TextField
          placeholder="Enter email address."
          sx={{ width: "300px" }}
          onChange={(e) => {
            setUsersEmail(e.target.value);
          }}
        />
      </Grid>
      <Grid item>
        <Button
          onClick={() => deleteAccountForUser()}
          variant="ctaMain"
        >
          DELETE ACCOUNT
        </Button>
      </Grid>
    </Grid>
  );

  return deleteAccountGrid;
}

export default DeleteAccountGrid;
