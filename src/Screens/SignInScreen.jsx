import { Button, Grid, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import UtilityBtn from "../Components/UtilityBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../ContextUser";

function SignInScreen() {
  const { usersSignInStatus, signUserInOut, setUsersName } =
    useContext(ContextUser);

  const [usersEmail, setUsersEmail] = useState("");
  const [usersPass, setUsersPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const sendToLandingPage = () => {
    navigate("/");
  };

  const sendInformationToApi = async () => {
    const infoSent = await axios
      .post("/api/login", {
        email: `${usersEmail}`,
        password: `${usersPass}`,
      })
      .then((data) => {
        if (data.data.msg === "SIGN IN SUCCESSFUL") {
          sendToLandingPage();
          localStorage.setItem("USERISLOGGEDIN", true);
          signUserInOut(true);
        }
      });
  };

  useEffect(() => {
    if (usersSignInStatus) {
      sendToLandingPage();
    }
  }, []);

  return (
    <Grid
      container
      alignContent="center"
      sx={{ minHeight: "100vh", marginTop: "15%" }}
      direction={"column"}
      rowGap="10px"
    >
      <Grid item xs="6" sx={{ color: "red" }}>
        {errorMsg}
      </Grid>
      <TextField
        placeholder="Email"
        onChange={(e) => {
          setUsersEmail(e.target.value);
        }}
      />
      <TextField
        placeholder="Password"
        onChange={(e) => {
          setUsersPass(e.target.value);
        }}
        type="password"
      />
      <Button variant="ctaMain"
        onClick={() => {
          sendInformationToApi();
        }}
      >
        Log In
      </Button>
      <Button sx={{color:"#222"}}>Create Account</Button>
    </Grid>
  );
}

export default SignInScreen;
