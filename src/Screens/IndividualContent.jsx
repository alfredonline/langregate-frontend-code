import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import WrapperContainer from "../Components/WrapperContainer";
import { Typography } from "@mui/material";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import { checkIfTokenIsValid } from "../Functions/CheckIfTokenIsValid";
import VocabularyCard from "../Components/Cards/VocabularyCard";
import CenterWrapper from "../Components/CenterWrapper";

function IndividualContent({ typeOfContent }) {
  let { id } = useParams();
  const [translatedDesc, setTranslatedDesc] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function FetchThenRenderTranslation(ogLang, overview) {
    let request = await axios.get(
      `https://api.langregate.com/${ogLang}/${
        overview
      }`
    );

    const arr = request.data.split(" ").map((item) => {
      return (
        <VocabularyCard word={item} lang={data?.original_language} key={item}/>
      );
    });

    setTranslatedDesc(arr);

    return "success";
  }

  useEffect(() => {
    async function callData() {
      setIsLoading(true);
      let request = await axios.get(`https://api.langregate.com/collect-content/${typeOfContent}/${id}`);
      setData(request.data);
      setIsLoading(false);
      if (request.data.original_language) {
        await FetchThenRenderTranslation(request.data.original_language, request.data.overview);
      }
    }

    callData();
  }, []);

  const [userWantsToSeeContentEnglish, setUserWantsToSeeContentEnglish] =
    useState(false);


  if (
    (data &&
      data.original_language &&
      data.original_language === "en" &&
      !userWantsToSeeContentEnglish) ||
    (data &&
      data.spoken_languages &&
      !userWantsToSeeContentEnglish &&
      data.spoken_languages[0].name === "English")
  ) {
    return (
      <WrapperContainer>
        <div className="nonEnglishBox">
          Langregate is an app designed to help people learn languages other
          than English. The content you have found is in English. You can still
          view it, but some features such as vocabulary saving and translating
          descriptions will not be available.
          <div
            onClick={() => {
              setUserWantsToSeeContentEnglish(true);
            }}
          >
            Show Media!
          </div>
        </div>
      </WrapperContainer>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const bgImagePoster = `https://www.themoviedb.org/t/p/w1280/${
    data && data.poster_path
  }`;
  const bgImageLong = `https://www.themoviedb.org/t/p/w1280/${
    data && data.backdrop_path
  }`;


  const returnOverview = () => {
    return (
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Typography sx={{ fontWeight: "700", fontSize: "42px", color: "#222" }}>
          {data && data.original_title}
        </Typography>
        <Typography variant="titleText">Synopsis</Typography>
        <Typography variant="textMdSemiBoldSemiImportant">
          {data?.overview}
        </Typography>
        <Typography variant="titleText">
          Save vocabulary from the description in its original language
        </Typography>
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          {translatedDesc && translatedDesc}
        </Typography>
        <Typography variant="titleText">Movie Language</Typography>
        <Typography variant="textMdSemiBoldSemiImportant">
          {data?.original_language}
        </Typography>
        <Typography variant="titleText">Genres</Typography>
        <Grid
          container
          sx={{ display: "flex", gap: "10px", paddingBottom: "20px" }}
        >
          {data?.genres.map(({ id, name }) => {
            return (
              <Grid
                item
                sx={{ backgroundColor: "#222", color: "#fff", padding: "10px" }}
                key={id}
              >
                {name}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  };

  return (
    <CenterWrapper>
      <Grid container sx={{ minHeight: "100vh", marginTop: "20px" }}>
        <Grid
          item
          lg="12"
          sx={{
            backgroundImage: "url(" + bgImageLong + ")",
            height: "300px",
            borderRadius: "6px",
            width: "100%",
            position: "relative",
            marginTop: "20px",
          }}
          className="bgCover"
        >
          <div
            style={{
              marginTop: "200px",
              position: "absolute",
              bottom: "-75px",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              height: "150px",
              width: "150px",
              backgroundColor: "yellow",
              borderRadius: "50%",
              backgroundImage: "url(" + bgImagePoster + ")",
              border: "5px solid white",
            }}
            className="bgCover"
          ></div>
        </Grid>
        <Grid item lg="12" sx={{ marginTop: "50px" }}>
          {returnOverview()}
        </Grid>
      </Grid>
    </CenterWrapper>
  );
}

export default IndividualContent;
