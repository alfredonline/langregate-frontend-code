import React, { useState, useEffect } from "react";
import Title from "../Components/Title";
import WrapperContainer from "../Components/WrapperContainer";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { checkIfTokenIsValid } from "../Functions/CheckIfTokenIsValid";

function UserSavedVocab() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let checkToken = await checkIfTokenIsValid();
      if (checkToken === "USER CAN PASS") {
        const data = await axios.get("https://api.langregate.com/api/viewSavedVocabulary");
        setWords(data.data.words);
        setLoading(false);
      }
    }

    getData();
  }, []);

  function createData(name, english, foreign, id) {
    return { name, english, foreign, id };
  }

  let rows = [];

  if (words) {
    words.forEach((word, i) => {
      const pushWord = createData(
        word.languageOgWord,
        word.wordEnglish,
        word.ogWord,
        i + Math.random()
      );
      rows.push(pushWord);
    });
  }

  const wordsArrNotUseState = [];
  const [wordsArr, setWordsArr] = useState([]);

  const deleteWord = async (wordPassedIn) => {
    wordsArrNotUseState.push(wordPassedIn);
    const oldArr = wordsArr;
    setWordsArr((oldArr) => [...oldArr, wordPassedIn]);

    let checkToken = await checkIfTokenIsValid();
    if (checkToken === "USER CAN PASS") {
      const wordDelete = await axios.post(`https://api.langregate.com/api/deleteWordForUser`, {
        wordToDelete: wordPassedIn,
      });
    }
  };

  return (
    <WrapperContainer>
      <Title
        mainHeading={`You have saved ${words.length} words`}
        secondHeading="You can view example sentences and many other things with your saved words."
      />

      <TableContainer component={Paper} sx={{marginTop: "40px"}}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "2px solid #f1f5fe",
                  fontWeight: "700",
                  color: "#202020",
                }}
              >
                Language of translated word
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  borderLeft: "2px solid #f1f5fe",
                  borderBottom: "2px solid #f1f5fe",
                  borderRight: "2px solid #f1f5fe",
                  fontWeight: "700",
                  color: "#202020",
                }}
              >
                Word in English
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  borderBottom: "2px solid #f1f5fe",
                  fontWeight: "700",
                  color: "#202020",
                }}
              >
                Translated word
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.foreign}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderBottom: "2px solid #f1f5fe",
                }}
                className={
                  wordsArr && wordsArr.includes(row.foreign) && "strike-through"
                }
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    borderLeft: "2px solid #f1f5fe",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderLeft: "2px solid #f1f5fe" }}
                >
                  {row.english}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderLeft: "2px solid #f1f5fe" }}
                  onClick={(e) => deleteWord(e.target.textContent)}
                >
                  {row.foreign}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </WrapperContainer>
  );
}

export default UserSavedVocab;
