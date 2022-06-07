import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

function VocabularyCard({ word, lang }) {
  const [wordSaved, setWordSaved] = useState(false);

  const sendItemToUsersCollection = async () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const sendData = await axios.post("https://api.langregate.com/api/addVocabToUsersCollection", {
      originalWord: word,
      date: date,
      language: lang,
    });

    setWordSaved(true);
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
