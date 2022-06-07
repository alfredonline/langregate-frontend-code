import React, { useState } from "react";
import CenterWrapper from "../Components/CenterWrapper";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import languages from "../Data/LanguagesArr";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterScreen() {
  const potentialInterests = [
    { label: "Languages" },
    { label: "Television" },
    { label: "Productivity" },
    { label: "Netflix" },
    { label: "War" },
    { label: "Politics" },
    { label: "Fashion" },
    { label: "Studying" },
    { label: "Memes" },
    { label: "Movies" },
    { label: "Series" },
    { label: "Technology" },
    { label: "Programming" },
    { label: "Gaming" },
    { label: "Art" },
    { label: "Privacy" },
    { label: "Languages" },
  ];

  const [usersName, setUsersName] = useState("");
  const [usersEmail, setUsersEmail] = useState("");
  const [usersPassword, setUsersPassword] = useState("");
  const [usersPreferredLang, setUsersPreferredLang] = useState("");
  const [usersInterests, setUsersInterests] = useState([]);
  const [userCanGoToLogin, setUserCanGoToLogin] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const updateUsersInterests = (interest) => {
    setUsersInterests((usersInterests) => [...usersInterests, interest]);
  };

  const sendInformationToApi = async () => {
    const infoSent = await axios
      .post("https://api.langregate.com/api/register", {
        name: `${usersName}`,
        email: `${usersEmail}`,
        password: `${usersPassword}`,
        interests: `${usersInterests}`,
        usersTL: `${usersPreferredLang}`,
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(infoSent);

    if (infoSent.data.status === "User added without problems") {
      setUserCanGoToLogin(true);
    }

    if (infoSent.data.errType === "Email") {
      setErrMessage(infoSent.data.errMessage);
    }
  };

  return (
    <CenterWrapper>
      <Grid container sx={{ paddingTop: "40px", display: "flex", gap: "40px", justifyContent: "center", marginTop: "80px", paddingBottom: "80px"}}>
        <Grid
          container
          sx={{ display: "flex", flexDirection: "column", gap: "40px" }}
          lg="4"
          sm="12"
        >
          <Grid item>
            <TextField
              sx={{ width: 300 }}
              onChange={(e) => {
                setUsersName(e.target.value);
              }}
              required
              variant="outlined"
              label="Name"
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: 300 }}
              required
              onChange={(e) => {
                setUsersEmail(e.target.value);
              }}
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              type="Password"
              onChange={(e) => {
                setUsersPassword(e.target.value);
              }}
              label="Password"
              sx={{ width: 300 }}
              variant="outlined"
              required
            />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ display: "flex", flexDirection: "column", gap: "40px" }}
          lg="4"
          sm="12"
        >
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={languages}
              sx={{ width: 300 }}
              onChange={(e) => {
                setUsersPreferredLang(e.target.lastChild.data);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Language I'm learning" required />
              )}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={potentialInterests}
              sx={{ width: 300 }}
              onChange={(e) => {
                updateUsersInterests(e.target.lastChild.data);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Things I'm interested in"
                  required
                />
              )}
            />
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "300px",
              gap: "10px",
            }}
          >
            {usersInterests.map((item) => {
              return <div className="interest" key={item}>{item}</div>;
            })}
          </Grid>
          <Grid item>
            <Button variant="ctaMain" onClick={() => sendInformationToApi()}>
              {userCanGoToLogin ? (
                <Link to="/SignIn" className="removeUnderlineNotAffectText">
                  Log in
                </Link>
              ) : (
                <Link to="/signup/new" className="removeUnderlineNotAffectText">Create Account</Link>
              )}
            </Button>
            <Grid item>
              <Typography
                varian="errorText"
                className="removeUnderlineNotAffectText"
              >
                {errMessage}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CenterWrapper>
  );
}

export default RegisterScreen;
