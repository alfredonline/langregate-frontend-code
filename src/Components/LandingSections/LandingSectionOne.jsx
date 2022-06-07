import React from "react";
import Grid from "@mui/material/Grid";
import { ButtonGroup, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom"

function LandingSectionOne() {
  const arrOfImg = [
    "https://images.alphacoders.com/107/1072652.jpg",
    "https://media.vanityfair.com/photos/60c0ceba6bf244fff3e1ca93/master/pass/lupin-season-2-netflix-still.jpg",
    "https://wallpaperaccess.com/full/1097130.jpg",
  ];

  return (
    <Grid container sx={{ width: "100%", marginTop: "100px"}}>
      <Grid container lg="6" sm="12" gap="20px">
        <Grid item sm="12">
          <Typography variant="textLgBoldImportant">
            Discover new content in your target language!
          </Typography>
        </Grid>
        <Grid item sm="12">
          <Typography variant="textMdSemiBoldSemiImportant">
            Langregate is a tool that allows you to explore new movies, series
            and news articles in your target language.
          </Typography>
        </Grid>
        <Grid item sm="12" sx={{ display: "flex" }} gap="10px">
          <Button variant="ctaMain" disableElevation >
            <Link to="/signup/new" className="removeUnderlineNotAffectText">
            Create Account
            </Link>
          </Button>
          <Button variant="ctaSub" startIcon={<LoginIcon />} className="removeUnderline">
            Log In
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        lg="6"
        sm="12"
        gap="10px"
        justifyContent="right"
      >
        <Grid
          item
          lg="9"
          sx={{
            height: "50px",
            backgroundImage: "url(" + `${arrOfImg[0]}` + ")",
          }}
          className="bgCover"
        ></Grid>
        <Grid
          item
          lg="6"
          sx={{
            height: "80px",
            backgroundImage: "url(" + `${arrOfImg[1]}` + ")",
          }}
          className="bgCover"
        ></Grid>
        <Grid
          item
          lg="9"
          sx={{
            height: "50px",
            backgroundImage: "url(" + `${arrOfImg[2]}` + ")",
          }}
          className="bgCover"
        ></Grid>
      </Grid>
    </Grid>
  );
}

export default LandingSectionOne;
