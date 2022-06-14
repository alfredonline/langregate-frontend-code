import React from "react";
import { Link } from "react-router-dom";

function MiniMediaCard({ bg, movieName, link }) {
  return (
    <Link
      to={`/movies/${link}`}
      style={{ backgroundImage: "url(" + bg + ")" }}
      className="MiniMovieCard bgCover"
    >
      {movieName}
    </Link>
  );
}

export default MiniMediaCard;
