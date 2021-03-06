import { Paper } from "@mui/material";
import React, { useState } from "react";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Link } from "react-router-dom";
import { checkIfTokenIsValid } from "../../Functions/CheckIfTokenIsValid";
import axios from "axios";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useContext } from "react";
import { ContextUser } from "../../ContextUser";

function MediaCard({
  bg,
  link,
  typeOfContent,
  data,
  deleteActivate,
  widthPassedIn,
  heightPassedIn,
}) {
  const { usersSignedInStatus, setShowCreateSignInModal } =
    useContext(ContextUser);

  bg = `https://image.tmdb.org/t/p/w1280/${bg}`;

  const [savingContent, setSavingContent] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const saveItemToUsersCollection = async () => {
    if (!usersSignedInStatus) {
      setShowCreateSignInModal(true);
    } else {
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
    }
  };

  const deleteContent = async () => {
    if (!usersSignedInStatus) {
      setShowCreateSignInModal(true);
    } else {
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

      setIsDeleted(true);
    }
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
            width: widthPassedIn ? widthPassedIn : "160px",
            height: heightPassedIn ? heightPassedIn : "230px",
            backgroundImage: "url(" + `${bg}` + ")",
            position: "relative",
            borderRadius: "8px",
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
