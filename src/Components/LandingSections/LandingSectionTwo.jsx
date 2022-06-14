import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import axios from "axios";
import LoadingScreen from "../../Screens/LoadingScreen";
import MediaCard from "../Cards/MediaCard";
import MediaCardWrapper from "../MediaCardWrapper";

function LandingSectionTwo() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function FetchRandomMovies() {
      const data = await axios
        .get("https://api.langregate.com/getFilms")
        .catch((err) => {
          console.log(err);
        });
        console.log(data)
      setMovies(data.data);
      setIsLoading(false);
    }

    FetchRandomMovies();
  }, []);

  return (
    <Grid sx={{ minHeight: "200px" }}>
      <Title
        mainHeading={"Discover new media in your target language"}
        secondHeading={
          "Langregate makes it easy to find new, interesting content"
        }
      />
      <MediaCardWrapper>
        {isLoading && !movies ? (
          <LoadingScreen />
        ) : (
          movies &&
          movies.map((item) => {
            return <MediaCard bg={item.poster_path} key={item.id} link={`/Movies/${item.id}`}/>;
          })
        )}
      </MediaCardWrapper>
    </Grid>
  );
}

export default LandingSectionTwo;
