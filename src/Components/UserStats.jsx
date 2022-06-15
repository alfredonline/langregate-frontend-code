import { Paper, Typography } from "@mui/material";
import React from "react";

function UserStats({ movieArr, statsObj }) {
  console.log(movieArr);
  const bg = `https://www.themoviedb.org/t/p/w1280${
    movieArr[Math.floor(Math.random() * movieArr.length)].backdrop_path ||
    movieArr[Math.floor(Math.random() * movieArr.length)].poster_path
  }`;

  return (
    <div
      className="UserStatsCard bgCover"
      style={{ backgroundImage: "url(" + bg + ")" }}
    >
      <div className="UserStatsTextBox">
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{
            color: "#fff",
            fontSize: "22px",
          }}
        >
          {statsObj.lengthOfArticles.length} saved articles.
        </Typography>{" "}
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{
            color: "#fff",
            fontSize: "22px",
          }}
        >
          {statsObj.lengthOfMovies.length} saved movies.
        </Typography>{" "}
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{
            color: "#fff",
            fontSize: "22px",
          }}
        >
          {statsObj.lengthOfSeries.length} saved series.
        </Typography>
      </div>

      <div className="userStatsFilter"></div>
    </div>
  );
}

export default UserStats;
