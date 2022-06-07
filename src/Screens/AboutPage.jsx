import { Grid, Typography } from "@mui/material";
import React from "react";
import Title from "../Components/Title";
import WrapperContainer from "../Components/WrapperContainer";

function AboutPage() {
  const aboutItems = [
    {
      title: "What we do",
      desc: "What we do is make it easier to find movies and series in foreign languages, translate descriptions, and find articles about topics which you find interesting in your target language. You can save content to go back to later on without needing to make an account. You can keep track of your vocabulary.",
    },
    {
      title: "Mission objectives",
      desc: "Making language learning more fun by means of consuming interesting content is the main objective of Langregate. Consuming content in your target language is a great way of improving your target language skills. Let's learning languages and discover interesting cultures together!",
    },
    {
      title: "Thanks to TMDB",
      desc: "All film-related and series-related metadata used in Langregate, including actor, director and studio names, synopses, release dates, trailers and poster art is supplied by The Movie Database (TMDB). Langregate uses the TMDB API but is not endorsed or certified by TMDB.",
    },
    {
      title: "Thanks to Newscatcher",
      desc: "We are able to bring you articles in many languages thanks to the people who developed Newscatcher, go and give them some love because without them most of this project wouldn't have been possible. Their product is amazing and helped so much with the development.",
    },
  ];

  return (
    <WrapperContainer>
      <Title  mainHeading="About Langregate" secondHeading="Learn more about what makes Langregate run" />
      <Grid container direction="column" spacing="40px" sx={{marginTop: "20px"}}>
        {aboutItems.map((item) => {
          return (
            <Grid item sx={{display: "flex", flexDirection: "column", gap: "20px"}}>
              <Typography variant="titleText">{item.title}</Typography>
              <Typography variant="textMdSemiBoldSemiImportant">
                {item.desc}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </WrapperContainer>
  );
}

export default AboutPage;
