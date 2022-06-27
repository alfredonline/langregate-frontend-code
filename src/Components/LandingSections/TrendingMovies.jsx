import React, { useEffect, useState } from "react";
import MediaCardWrapper from "../MediaCardWrapper";
import Grid from "@mui/material/Grid";
import Title from "../Title";
import axios from "axios";
import LoadingScreen from "../../Screens/LoadingScreen";
import MediaCard from "../Cards/MediaCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function TrendingMovies({ region, country, lang, isRegisteredUser }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const matches = useMediaQuery("max-width:600px)");

  useEffect(() => {
    async function getTrendingMovies() {
      const data = await axios
        .get(`https://api.langregate.com/getTrending/${region}`)
        .catch((err) => {
          console.log(err);
        });
      setMovies(data.data);
      setIsLoading(false);
    }

    getTrendingMovies();
  }, []);

  // had to include the isregistereduser to avoid problems on the backend with getting country codes etc. this will be resolved in future update

  return (
    <Grid sx={{ minHeight: "200px" }}>
      <Title
        mainHeading={isRegisteredUser ? `Trending movies in ${lang}` : `Trending Movies in ${country} in ${lang}`}
        icon={<TrendingUpIcon />}
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

export default TrendingMovies;
