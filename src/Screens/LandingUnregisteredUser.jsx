import { ButtonGroup, Grid, Typography } from "@mui/material";
import React from "react";
import LandingSectionOne from "../Components/LandingSections/LandingSectionOne";
import CenterWrapper from "../Components/CenterWrapper";
import LandingSectionTwo from "../Components/LandingSections/LandingSectionTwo";
import LandingSectionThree from "../Components/LandingSections/LandingSectionThree";
import LandingSectionFour from "../Components/LandingSections/LandingSectionFour";

function LandingUnregisteredUser() {
  const arrOfComponents = [<LandingSectionOne />, <LandingSectionTwo />, <LandingSectionThree />, <LandingSectionFour />];
  return (
    <>
      <CenterWrapper children={arrOfComponents} />
    </>
  );
}

export default LandingUnregisteredUser;
