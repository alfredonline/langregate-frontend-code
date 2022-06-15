import React from "react";
import { Link } from "react-router-dom";
import ConvertGenreIdToText from "../Functions/ConvertGenreIdToText"

function MiniMediaCard({ bg, movieName, link, genres }) {
  return (
    <Link to={`/movies/${link}`} className="MiniMovieCard">
      <div
        className="MiniMovieCardImg bgCover"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div>
      <div className="MiniMovieCardContent">
        <div className="MiniMovieCardHeader">{movieName}</div>
        <div className="MiniMovieCardGenres">
          {genres && genres.map((genre) => {
            return <div className="MiniMovieCardGenre">{ConvertGenreIdToText(genre)}</div>;
          })}
        </div>
        
      </div>
    </Link>
  );
}

export default MiniMediaCard;
