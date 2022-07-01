import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import axios from "axios";
import { ContextUser } from "../../ContextUser";

function VocabularyCard({ word, lang }) {
  const [wordSaved, setWordSaved] = useState(false);


  const { setShowCreateSignInModal , usersSignedInStatus} = useContext(ContextUser)


  const sendItemToUsersCollection = async () => {
    if (!usersSignedInStatus) {
      setShowCreateSignInModal(true);
    } else {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      const sendData = await axios.post(
        "https://api.langregate.com/api/addVocabToUsersCollection",
        {
          originalWord: word,
          date: date,
          language: lang,
        }
      );

      setWordSaved(true);
    }
  };

  return (
    <Button
      className="hoverMoveUp cursorPointer saveVocabItem"
      variant={wordSaved && "disabled"}
      onClick={() => sendItemToUsersCollection(word)}
    >
      {word}
    </Button>
  );
}

export default VocabularyCard;
