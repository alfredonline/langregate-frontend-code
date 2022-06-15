import React, { useState, useEffect } from "react";
import Title from "../Components/Title";
import WrapperContainer from "../Components/WrapperContainer";
import axios from "axios";
import { checkIfTokenIsValid } from "../Functions/CheckIfTokenIsValid";
import SavedVocabCard from "../Components/Cards/SavedVocabCard";

function UserSavedVocab() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let checkToken = await checkIfTokenIsValid();
      if (checkToken === "USER CAN PASS") {
        const data = await axios.get("https://api.langregate.com/api/viewSavedVocabulary");
        setWords(data.data.words);
        console.log(data.data.words);
        setLoading(false);
      }
    }

    getData();
  }, []);


  return (
    <WrapperContainer>
      <Title
        mainHeading={`You have saved ${words.length} words`}
        secondHeading="You can view example sentences and many other things with your saved words."
      />
      <div className="SavedVocabCardWrapper">
        {words &&
          words.map((item) => {
            return <SavedVocabCard word={item.wordEnglish || "Translation not found."} translation={item.ogWord}/>;
          })}
      </div>
    </WrapperContainer>
  );
}

export default UserSavedVocab;
