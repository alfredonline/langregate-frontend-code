import DeleteSweep from "@mui/icons-material/DeleteSweep";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { checkIfTokenIsValid } from "../../Functions/CheckIfTokenIsValid";

function SavedVocabCard({ word, translation, ogLang }) {
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteWord = async (wordPassedIn) => {
    let checkToken = await checkIfTokenIsValid();
    if (checkToken === "USER CAN PASS") {
      const wordDelete = await axios.post(
        `https://api.langregate.com/api/deleteWordForUser`,
        {
          wordToDelete: wordPassedIn,
        }
      );
    }
    setIsDeleted(true);
  };

  return (
    <div className={isDeleted ? "hide" : "SavedVocabCard"} style={{ position: "relative" }}>
      <div className="SavedVocabCardTrans">{translation}</div>
      <div className="SavedVocabCardEng">{word}</div>
      <div
        className="deleteVocab"
        onClick={() => deleteWord(translation)}
        style={{ position: "absolute", right: "10px" }}
      >
        <DeleteSweep />
      </div>
    </div>
  );
}

export default SavedVocabCard;
