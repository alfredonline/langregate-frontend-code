import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import ArticleIcon from "@mui/icons-material/Article";
import { checkIfTokenIsValid } from "../../Functions/CheckIfTokenIsValid";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { ContextUser } from "../../ContextUser";


function NewsItemCard({
  title,
  media,
  overview,
  id,
  deleteMode,
  credit,
  hideBm,
}) {
  const [articleSaved, setArticleSaved] = useState(false);
  const [articleDeleted, setArticleDeleted] = useState(false);
  const { usersSignedInStatus, setShowCreateSignInModal } = useContext(ContextUser);

  const saveItemToUsersCollection = async () => {
    if (!usersSignedInStatus) {
      setShowCreateSignInModal(true);
    } else {
      let checkToken = await checkIfTokenIsValid();
      if (checkToken === "USER CAN PASS") {
        const sentData = await axios.post(
          "https://api.langregate.com/api/addArticleToUsersCollection",
          {
            content: {
              newsHeader: title,
              newsMedia: media,
              newsOverview: overview,
              newsID: id,
              credit: credit,
            },
          }
        );

        setArticleSaved(true);
      }
    }
  };

  const deleteArticleFromUsersCollection = async () => {
    if (!usersSignedInStatus) {
      setShowCreateSignInModal(true);
    } else {
      let checkToken = await checkIfTokenIsValid();
      if (checkToken === "USER CAN PASS") {
        await axios.post(
          "https://api.langregate.com/api/deleteArticleForUser",
          {
            id: id,
          }
        );
        setArticleDeleted(true);
      }
    }
  };

  return (
    <Card
      sx={{
        width: "350px",
        height: "400px",
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        position: "relative",
      }}
      className={articleDeleted && "hideContent"}
    >
      <CardMedia
        sx={{
          height: 200,
        }}
        component="img"
        alt="An image was not found. Sorry!"
        image={media}
      />
      <CardContent>
        <Typography gutterBottom variant="textMdSemiBoldSemiImportant">
          {title}
        </Typography>
      </CardContent>
      <Grid
        container
        spacing="20px"
        sx={{ position: "absolute", bottom: "10px", left: "15px" }}
      >
        <Grid item>
          <ShareIcon className="cursorPointer" />
        </Grid>
        <Grid item>
          {!hideBm ? (
            articleSaved ? (
              <BookmarkAddedIcon className="cursorPointer" />
            ) : (
              <BookmarkAddIcon
                onClick={() => saveItemToUsersCollection()}
                className="cursorPointer"
              />
            )
          ) : (
            ""
          )}
        </Grid>
        <Grid item>
          <ArticleIcon className="cursorPointer" />
        </Grid>
        <Grid item>
          {articleSaved ||
            (deleteMode && (
              <DeleteSweepIcon
                onClick={() => deleteArticleFromUsersCollection()}
                className="cursorPointer"
              />
            ))}
        </Grid>
      </Grid>
    </Card>
  );
}

export default NewsItemCard;
