import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Title from "../Title";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

function LandingSectionThree() {
  const benefits = [
    {
      header: "Movies And Series",
      text: "Find movies and series in your target language, keep track of what you've watched and save your favourites.",
      link: "/Discover-Movies",
      img: "https://images.unsplash.com/photo-1615986201152-7686a4867f30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    },
    {
      header: "News Articles",
      text: "Find news articles in your target language, save your favourites and extract vocabulary from real texts.",
      link: "/Discover-Articles",
      img: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      reverse: true,
    },
    {
      header: "Saving Vocabulary",
      text: "Store vocabulary in your target language and have it translated instaneously by Langregate.",
      link: "/my-vocab",
      img: "https://images.unsplash.com/photo-1597392582469-a697322d5c16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29yZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60",
    },
  ];

  // this matches here is to remove padding on mobile for the text box when the grid is reversed

  const matches = useMediaQuery("(max-width:600px)");

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
        {benefits.map(({ header, text, link, img, reverse }) => {
          return (
            <Grid
              container
              lg="12"
              key={header}
              sx={{ minHeight: "60vh" }}
              direction={reverse && "row-reverse"}
            >
              <Grid
                item
                lg="6"
                xs="12"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  alignContent: "center",
                  justifyContent: "center",
                  padding: reverse && !matches && "40px",
                }}
              >
                <Typography variant="titleText">{header}</Typography>
                <Typography
                  variant="textMdSemiBoldSemiImportant"
                  sx={{ width: matches ? "100%" : "80%"}}
                >
                  {text}
                </Typography>
                <Button
                  variant="ctaSub"
                  sx={{ border: "2px solid #222", width: "150px" }}
                >
                  <Link to={`${link}`} className="removeUnderline">
                    Learn More
                  </Link>
                </Button>
              </Grid>
              <Grid
                item
                style={{ backgroundImage: "url(" + img + ")" }}
                lg="6"
                xs="12"
                className="bgCover"
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default LandingSectionThree;
