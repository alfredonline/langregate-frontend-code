import { Paper, Typography } from "@mui/material";
import React from "react";

function UserStats({ name, tl, statsObj }) {
  const Background =
    "https://images.pexels.com/photos/7991327/pexels-photo-7991327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  return (
    <Paper
      className="UserStatsCard bgCover"
      style={{ backgroundImage: "url(" + Background + ")" }}
    >
      <div className="UserStatsTextBox">
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{
            color: "#fff",
            fontWeight: "600",
            fontSize: "22px",
            textShadow: ".5px .5px 10px #222",
            
          }}
        >
          {statsObj.lengthOfArticles.length} saved articles.
        </Typography>{" "}
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{
            color: "#fff",
            fontSize: "22px",
            textShadow: ".5px .5px 10px #222",
          }}
        >
          {statsObj.lengthOfMovies.length} saved movies.
        </Typography>{" "}
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{
            color: "#fff",
            fontSize: "22px",
            textShadow: ".5px .5px 10px #222",
          }}
        >
          {statsObj.lengthOfSeries.length} saved series.
        </Typography>
      </div>

      <div className="userStatsWhiteFilter"></div>
    </Paper>
  );
}

export default UserStats;
