import { Typography } from "@mui/material";
import React from "react";
import Title from "../Components/Title";
function SavedContentUserInfo({ nameOfUser, arrName }) {
  return <Title mainHeading={`Hi ${nameOfUser}`} secondHeading={`You're looking at your ${arrName}`}/>;
}

export default SavedContentUserInfo;
