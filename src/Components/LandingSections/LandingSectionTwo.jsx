import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import axios from "axios";
import LoadingScreen from "../../Screens/LoadingScreen";
import MediaCard from "../Cards/MediaCard";
import MediaCardWrapper from "../MediaCardWrapper";
import useMediaQuery from "@mui/material/useMediaQuery";

function LandingSectionTwo() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const matches = useMediaQuery("max-width:600px)");

  useEffect(() => {
    async function FetchRandomMovies() {
      const data = await axios
        .get("https://api.langregate.com/getFilms")
        .catch((err) => {
          console.log(err);
        });
      setMovies(data.data);
      setIsLoading(false);
    }

    FetchRandomMovies();
  }, []);

  return (
    <Grid sx={{ minHeight: "200px"}}>
      <Title
        mainHeading={"Spanish movies we recommend."}
        secondHeading={
          "Langregate makes it easy to find new, interesting content in a variety of languages."
        }
      />
      <MediaCardWrapper>
        {isLoading && !movies ? (
          <LoadingScreen />
        ) : (
          movies &&
          movies.map((item) => {
            return (
              <MediaCard
                bg={item.poster_path}
                key={item.id}
                link={`/Movies/${item.id}`}
                widthPassedIn={matches && "150px"}
              />
            );
          })
        )}
      </MediaCardWrapper>
    </Grid>
  );
}

export default LandingSectionTwo;
