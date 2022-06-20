import { Paper } from "@mui/material";
import React, { useState } from "react";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Link } from "react-router-dom";
import { checkIfTokenIsValid } from "../../Functions/CheckIfTokenIsValid";
import axios from "axios";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function MediaCard({ bg, link, typeOfContent, data, deleteActivate, widthPassedIn, heightPassedIn }) {
  bg = `https://image.tmdb.org/t/p/w1280/${bg}`;

  const [savingContent, setSavingContent] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false)

  const saveItemToUsersCollection = async () => {
    let checkToken = await checkIfTokenIsValid();
    if (checkToken === "USER CAN PASS") {
      setSavingContent(true);
      const sentData = await axios.post(
        `https://api.langregate.com/api/add${
          typeOfContent === "tv" ? "Series" : "Movie"
        }ToUsersCollection`,
        { data: data }
      );
      setSavingContent(false);
      setContentSaved(true);
    }
  };

  const deleteContent = async () => {
    let checkToken = await checkIfTokenIsValid();

    if (checkToken === "USER CAN PASS") {
      if (typeOfContent === "tv") {
        const contentDelete = await axios.post(
          `https://api.langregate.com/api/deleteSeriesForUser`,
          { seriesToDelete: data.name }
        );
      } else if (typeOfContent === "Movie") {
        const contentDelete = await axios.post(
          `https://api.langregate.com/api/deleteMovieForUser`,
          { movieToDelete: data.original_title }
        );
      }
    }

    setIsDeleted(true)
  };

  return (
    <Paper sx={{ position: "relative" }} className={isDeleted && "hideContent"}>
      {!deleteActivate ? (
        !contentSaved ? (
          <Bookmark
            sx={{
              position: "absolute",
              zIndex: "10",
              left: "10px",
              top: "10px",
              fontSize: "32px",
              cursor: "Pointer",
              color: "#fff",
            }}
            onClick={() => saveItemToUsersCollection()}
          />
        ) : (
          <BookmarkAddedIcon
            sx={{
              position: "absolute",
              zIndex: "10",
              left: "10px",
              top: "10px",
              fontSize: "32px",
              cursor: "Pointer",
              color: "#fff",
            }}
          />
        )
      ) : (
        ""
      )}
      {deleteActivate && (
        <DeleteSweepIcon
          sx={{
            position: "absolute",
            zIndex: "10",
            left: "10px",
            top: "10px",
            fontSize: "32px",
            cursor: "Pointer",
            color: "#fff",
          }}
          onClick={() => deleteContent()}
        />
      )}
      <Link to={`${link}`} className="removeUnderlineNotAffectText">
        <Paper
          sx={{
            width: widthPassedIn ? widthPassedIn : "200px",
            height: heightPassedIn ? heightPassedIn : "280px",
            backgroundImage: "url(" + `${bg}` + ")",
            position: "relative",
          }}
          className="bgCover"
        >
          {" "}
        </Paper>
      </Link>
    </Paper>
  );
}

export default MediaCard;
