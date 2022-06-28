import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ContextUser } from "../ContextUser";
import Logo from "../assets/logo.svg"

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
      .post("https://api.langregate.com/api/login", {
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
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={Logo} alt="crocodile in cirlce" style={{width: "50px"}} />
      <Typography variant="titleText" sx={{padding: "20px"}}>Sign in to Langregate</Typography>
      <div className="SignInForm">
        <TextField
          placeholder="Email"
          onChange={(e) => {
            setUsersEmail(e.target.value);
          }}
          sx={{ backgroundColor: "#fff" }}
          variant="outlined"
          label="Email"
        />
        <TextField
          placeholder="Password"
          onChange={(e) => {
            setUsersPass(e.target.value);
          }}
          type="password"
          sx={{ backgroundColor: "#fff" }}
          variant="outlined"
          label="Password"
        />
        <Button
          variant="ctaMain"
          onClick={() => {
            sendInformationToApi();
          }}
        >
          Log In
        </Button>
        <Link to="/signup/new">Don't have an account?</Link>
      </div>
    </Grid>
  );
}

export default SignInScreen;
