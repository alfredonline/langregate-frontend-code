import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import axios from "axios";
import { checkIfTokenIsValid } from "../../SmallFunctions/CheckIfTokenIsValid";
import InterestItem from "../InterestItem";

function ChangeInterestsGrid({ usersInfo }) {
  const potentialInterests = [
    "Languages",
    "Television",
    "Productivity",
    "YouTube",
    "Netflix",
    "War",
    "Politics",
    "Fashion",
    "Studying",
    "Memes",
    "Movies",
    "Series",
    "Technology",
    "Programming",
    "Gaming",
    "COVID-19",
    "Art",
    "Privacy",
    "Russia",
    "Ukraine",
  ];

  const [itemDelete, setItemDelete] = useState("");
  const [itemAdd, setItemAdd] = useState("");

  const deleteInterestForUser = async (interestToDelete) => {
    let checkToken = await checkIfTokenIsValid();

    if (checkToken === "USER CAN PASS") {
      setItemDelete(interestToDelete);
      const deleteInterest = axios.post(
        "https://api.langregate.com/api/deleteInterestForUser",
        {
          interestToDelete: interestToDelete,
        }
      );
    }
  };

  const addInterestForUser = async (interestToAdd) => {
    let checkToken = await checkIfTokenIsValid();

    if (checkToken === "USER CAN PASS") {
      setItemAdd(interestToAdd);
      const addInterest = axios.post(
        "https://api.langregate.com/api/addInterestForUser",
        {
          interestToAdd: interestToAdd,
        }
      );
    }
  };

  const [arrInterests, setArrInterests] = useState(null);

  useEffect(() => {
    let count = 0;

    if (count === 0) {
      if (usersInfo && usersInfo.usersInterests) {
        setArrInterests(usersInfo.usersInterests[0].split(","));
        count++;
      }
    }
  }, [usersInfo]);

  const addItemToArr = (newInterest) => {
    setArrInterests((arrInterests) => [...arrInterests, newInterest]);
    const addTheItemTodb = await addInterestForUser(newInterest)
  };

  const deleteInterestFromArrInterests = async (itemToDelete) => {
    const modifiedArr = arrInterests.filter(item => item !== itemToDelete)
    setArrInterests(modifiedArr)
    const deleteFromDB = await deleteInterestForUser(itemToDelete)
  };


  const changeInterestsGrid = (
    <Grid container xs="12" direction="column" gap="20px">
      <Grid item>
        <Typography variant="textMdSemiBoldSemiImportant">
          Your interests are what we use to find articles pertaining to your
          interests as well as movies and series. They help us find content
          suited to you. Click on an interest in the current interests section
          to delete it. Click on an interest in the interests to add section to
          add it.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="titleText">Current Interests</Typography>
      </Grid>
      <Grid item sx={{ display: "flex", gap: "10px" }}>
        {arrInterests &&
          arrInterests.map((item) => {
            return (
              <div onClick={() => deleteInterestFromArrInterests(item)} key={item.id}>
                <InterestItem interest={item} />
              </div>
            );
          })}
          {arrInterests && arrInterests.length === 0 && "You need to select at least one interest."}
      </Grid>
      <Grid item>
        <Typography variant="titleText">Interests to Add</Typography>
      </Grid>
      <Grid
        item
        sx={{ display: "flex", gap: "10px", maxWidth: "70%", flexWrap: "wrap" }}
      >
        {potentialInterests.map((item) => {
          return (
            <div onClick={() => addItemToArr(item)} key={item}>
              <InterestItem interest={item} />
            </div>
          );
        })}
      </Grid>
    </Grid>
  );

  return changeInterestsGrid;
}

export default ChangeInterestsGrid;
