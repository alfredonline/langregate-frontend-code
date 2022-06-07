import React, { useEffect, useState } from "react";
import Title from "../Components/Title";
import { Autocomplete, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import langArr from "../Data/LanguageArrExtended";
import genreArr from "../Data/GenreArrWithCodes";
import FlexWrapper from "../Components/FlexWrapper";
import { Typography } from "@mui/material";
import convertGenre from "../SmallFunctions/convertGenre";
import MediaCard from "../Components/Cards/MediaCard";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import CenterWrapper from "../Components/CenterWrapper";

function DiscoverMedia({ searchQuery, typeOfMedia }) {
  const [currentGenre, setCurrentGenre] = useState("Action");
  const [preferredLanguage, setPreferredLanguage] = useState("Spanish");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setIsLoading(true);

    async function callData() {
      let request = await axios
        .get(
          `https://api.langregate.com/${searchQuery}-genres/${preferredLanguage}/${convertGenre(
            genreArr,
            currentGenre
          )}`
        )
        .catch((err) => {
          console.log(err);
        });
      setData(request.data);
      console.log(request.data)
      setIsLoading(false);
    }

    callData();
  }, [preferredLanguage, currentGenre]);

  // the rendered array which is returned if content matching users parameters is found!

  const returnContent = () => {
    return (
      data &&
      !isLoading &&
      data.map((item) => {
        return (
          <MediaCard
            bg={item.poster_path}
            link={`/${typeOfMedia}/${item.id}`}
            typeOfContent={typeOfMedia}
            data={item}
          />
        );
      })
    );
  };

  if (isLoading || !data) {
    return <LoadingScreen />;
  }

  return (
    <CenterWrapper>
      <Box
        display="flex"
        sx={{ marginTop: "100px", display: "flex", columnGap: "20px" }}
      >
        <Autocomplete
          onChange={(e) =>
            e.target.lastChild.data &&
            setPreferredLanguage(e.target.lastChild.data)
          }
          disablePortal
          id="combo-box-demo"
          options={langArr}
          sx={{ width: 150 }}
          renderInput={(params) => <TextField {...params} label="Language" />}
        />
        <Autocomplete
          onChange={(e) => setCurrentGenre(e.target.lastChild.data)}
          disablePortal
          id="combo-box-demo"
          options={genreArr}
          sx={{ width: 160 }}
          renderInput={(params) => <TextField {...params} label="Genres" />}
        />
      </Box>
      <Title
        mainHeading={`${currentGenre} ${typeOfMedia} in ${preferredLanguage}`}
        secondHeading={`Save, share, translate and discover new media in ${preferredLanguage}`}
      />
      <FlexWrapper>
        {data.length === 0 || typeof data === "null" ? (
          <Typography variant="errorText">
            Oh no! It looks like we couldn't find any {currentGenre}{" "}
            {typeOfMedia} in {preferredLanguage}
          </Typography>
        ) : (
          returnContent()
        )}
      </FlexWrapper>
    </CenterWrapper>
  );
}

export default DiscoverMedia;
