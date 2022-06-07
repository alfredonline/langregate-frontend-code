import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Title from "../Title";
import { Link } from "react-router-dom";

function LandingSectionThree() {
  const benefits = [
    {
      header: "Movies And Series",
      text: "Find movies and series in your target language, keep track of what you've watched and save your favourites.",
      link: "/Discover-Movies",
    },
    {
      header: "News Articles",
      text: "Find news articles in your target language, save your favourites and extract vocabulary from real texts.",
      link: "/Discover-Articles",
    },
    {
      header: "Saving Vocabulary",
      text: "Store vocabulary in your target language and have it translated instaneously by Langregate.",
      link: "/my-vocab",
    },
    {
      header: "What comes next",
      text: "Langregate will be updated periodically to give more advanced functionality. Get update plans here.",
      link: "/about",
    },
  ];

  return (
    <>
      <Title
        mainHeading="What you can do with Langregate"
        secondHeading={
          "Below is a list of things which we can provide you with."
        }
      />
      <Grid
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
        }}
      >
        {benefits.map(({ header, text, link }) => {
          return (
            <Grid container lg="5" xs="12" spacing="20px" key={header}>
              <Grid item>
                <Typography variant="titleText" sx={{ textAlign: "center" }}>
                  {header}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="textMdSemiBoldSemiImportant">
                  {text}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="ctaSub" sx={{ border: "2px solid #222" }}>
                  <Link to={`${link}`} className="removeUnderline"> Learn More</Link>
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default LandingSectionThree;
