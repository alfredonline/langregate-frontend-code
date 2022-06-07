import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import VocabularyCard from "../Components/Cards/VocabularyCard";

function ArticleFullScreen(props) {
  const [translatedDesc, setTranslatedDesc] = useState(false);

  async function RenderArrOfVocabToSave(overview) {
    let request = await axios.get(`https://api.langregate.com/translate-Description/en/${overview}`);
    setTranslatedDesc(request.data);

    return "success";
  }

  useEffect(() => {
    RenderArrOfVocabToSave(props.overview);
  }, [props.id]);

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#fff",
        zIndex: "100",
        padding: "22px",
        position: "fixed",
        bottom: 0,
        top: "100px",
        overflow: "auto",
      }}
      gap="30px"
    >
      <Grid item lg="12" sx={{ width: "100%" }}>
        <Typography variant="titleText">{props.header}</Typography>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{
            lineHeight: "1.6",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {props.overview.split(" ").map((item) => {
            return <VocabularyCard word={item} lang={props.language} key={item}/>;
          })}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{ display: "flex", gap: "10px", flexWrap: "wrap", width: "100%" }}
      >
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{ lineHeight: "1.6" }}
        >
          {translatedDesc}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ArticleFullScreen;
