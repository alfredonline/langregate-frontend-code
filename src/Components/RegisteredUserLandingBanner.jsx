import { Typography, Button } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom"

function RegisteredUserLandingBanner({
  movieArr,
  statsObj,
  targetLanguage,
  name,
}) {
  const genRandNum = () => Math.random() * movieArr.length;

  const matches = useMediaQuery("(max-width:600px)");

  const bg = `https://www.themoviedb.org/t/p/w1280${
    movieArr[Math.floor(genRandNum())].backdrop_path ||
    movieArr[Math.floor(genRandNum())].poster_path
  }`;

  return (
    <div className="RegisteredUserLandingBanner">
      <div
        style={{ backgroundImage: "url(" + bg + ")" }}
        className="backgroundRegisteredUser bgCover"
      ></div>
      <div className="RegisteredUserLandingBannerTextBox">
        <Typography
          variant="textMdSemiBoldSemiImportant"
          sx={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}
        >
          {targetLanguage} movies for {name}
        </Typography>
        <Typography sx={{ color: "#fefefe", fontSize: "18px" }}>
          You have saved {statsObj && statsObj.lengthOfMovies.length} movies
        </Typography>
        <Button
          variant="ctaMain"
          sx={{ width: !matches && "250px", display: matches && "none" }}
          className="hideBtn"
        >
          <Link to="/Discover-Movies" className="removeUnderlineNotAffectText">Discover Movies</Link>
        </Button>
      </div>
      <div className="userStatsFilter"></div>
      <div className="bgFilterBlack"></div>
    </div>
  );
}

export default RegisteredUserLandingBanner;
