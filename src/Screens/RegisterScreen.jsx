import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import languages from "../Data/LanguagesArr";
import { Link } from "react-router-dom";
import axios from "axios";
import GenreArr from "../Data/GenreArrWithCodes";

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
  const [userGenres, setUserGenres] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  // eventually refactor these two functions into one function

  const updateUsersInterests = (interest) => {
    setUsersInterests((usersInterests) => [...usersInterests, interest]);
  };

  const updateUserGenres = (genre) => {
    setUserGenres((userGenres) => [...userGenres, genre]);
  };

  const sendInformationToApi = async () => {
    const infoSent = await axios
      .post("https://api.langregate.com/api/register", {
        name: `${usersName}`,
        email: `${usersEmail}`,
        password: `${usersPassword}`,
        interests: `${usersInterests}`,
        usersTL: `${usersPreferredLang}`,
        genres: `${userGenres}`,
      })
      .catch((err) => {
        console.log(err);
      });

    if (infoSent.data.status === "User added without problems") {
      setUserCanGoToLogin(true);
    }

    if (infoSent.data.errType === "Email") {
      setErrMessage(infoSent.data.errMessage);
    }
  };

  const sideImage =
    "https://images.unsplash.com/photo-1606937295547-bc0f668595b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        lg="6"
        xs={false}
        style={{ backgroundImage: "url(" + sideImage + ")" }}
        className="registerScreenSideImage bgCover"
      />
      <Grid
        item
        lg="6"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "80px",
          alignItems: "center",
          height: "100vh",
        }}
        className="registerScreenText"
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
            gap: "10px",
            width: "350px",
          }}
        >
          {usersInterests.map((item) => {
            return (
              <div className="interest" key={item}>
                {item}
              </div>
            );
          })}
        </Grid>
        <Grid item>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={GenreArr}
            sx={{ width: 300 }}
            onChange={(e) => {
              updateUserGenres(e.target.lastChild.data);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Types of movies and series I like" required />
            )}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            width: "350px",
          }}
        >
          {userGenres.map((item) => {
            return (
              <div className="interest" key={item}>
                {item}
              </div>
            );
          })}
        </Grid>
        <Grid item>
          <Button
            variant="ctaMain"
            onClick={() => sendInformationToApi()}
            sx={{ width: "300px" }}
          >
            {userCanGoToLogin ? (
              <Link to="/SignIn" className="removeUnderlineNotAffectText">
                Log in
              </Link>
            ) : (
              <Link to="/signup/new" className="removeUnderlineNotAffectText">
                Create Account
              </Link>
            )}
          </Button>
        </Grid>
        {!userCanGoToLogin && (
          <Grid item>
            <Link to="/SignIn">Already have an account? Sign in here.</Link>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default RegisterScreen;
