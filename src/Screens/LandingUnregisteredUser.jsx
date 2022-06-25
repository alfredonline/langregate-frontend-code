import React from "react";
import LandingSectionOne from "../Components/LandingSections/LandingSectionOne";
import CenterWrapper from "../Components/CenterWrapper";
import LandingSectionTwo from "../Components/LandingSections/LandingSectionTwo";
import LandingSectionThree from "../Components/LandingSections/LandingSectionThree";
import LandingSectionFour from "../Components/LandingSections/LandingSectionFour";
import TrendingMovies from "../Components/LandingSections/TrendingMovies";

function LandingUnregisteredUser() {
  const arrOfComponents = [
    <LandingSectionOne />,
    <LandingSectionTwo />,
    <TrendingMovies region="ES" country="Spain" lang="Spanish" />,
    <TrendingMovies region="PT" country="Portugal" lang="Portuguese" />,
    <LandingSectionThree />,
    <LandingSectionFour />,
  ];
  return (
    <>
      <CenterWrapper children={arrOfComponents} />
    </>
  );
}

export default LandingUnregisteredUser;
