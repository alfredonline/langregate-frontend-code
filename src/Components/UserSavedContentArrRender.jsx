import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ArticleCard from "../Components/Cards/NewsItemCard";
import FlexWrapper from "./FlexWrapper";
import MediaCard from "./Cards/MediaCard";

function UserSavedContentArrRender({
  arrName,
  articles,
  movies,
  series,
  updateModalFromChild,
}) {
  const [arrToRender, setArrToRender] = useState(articles);

  useEffect(() => {
    switch (arrName) {
      case "articles":
        setArrToRender(articles);
        break;

      case "movies":
        setArrToRender(movies);
        break;

      case "series":
        setArrToRender(series);
        break;
    }
  }, [arrName]);

  const returnArticles = () => {
    if (arrToRender && arrToRender.length === 0) {
      return (
        <div className="noContentFound">
          Looks like you haven't saved any articles!
        </div>
      );
    } else if (arrToRender && articles && articles.length !== 0) {
      return arrToRender.map((item) => {
        return (
          <div onClick={() => updateModalFromChild(item)} key={item.id}>
            <ArticleCard
              title={item.articleHeader}
              media={item.articleMedia}
              overview={
                item.articleSummary ||
                item.overview ||
                "No description found for this article."
              }
              deleteMode={true}
              id={item.articleID}
              hideBm={true}
              fullObjOfArticle={item}
            />
          </div>
        );
      });
    }
  };

  const returnMovies = () => {
    if (arrToRender && arrToRender.length === 0) {
      return (
        <div className="noContentFound">
          Looks like you haven't saved any movies!
        </div>
      );
    } else if (arrToRender && movies && movies.length !== 0) {
      return arrToRender.map((item) => {
        return (
          <div id={item.id}>
            <MediaCard
              bg={item.media}
              link={`/Movies/${item.id}`}
              deleteActivate={true}
              data={item}
              typeOfContent="Movie"
            />
          </div>
        );
      });
    }
  };

  const returnSeries = () => {
    if (arrToRender && arrToRender.length === 0) {
      return (
        <div className="noContentFound">
          Looks like you haven't saved any series!
        </div>
      );
    } else if (arrToRender && series && series.length !== 0) {
      return arrToRender.map((item) => {
        return (
          <div key={item.id}>
            <MediaCard
              bg={item.media}
              link={`/tv/${item.id}`}
              deleteActivate={true}
              data={item}
              typeOfContent="tv"
            />
          </div>
        );
      });
    }
  };

  return (
    <>
      <Grid container sx={{ marginTop: "50px" }}>
        <FlexWrapper>
          {arrName === "articles" && returnArticles()}
          {arrName === "movies" && returnMovies()}
          {arrName === "series" && returnSeries()}
        </FlexWrapper>
      </Grid>
    </>
  );
}

export default UserSavedContentArrRender;
