import { Typography, Button } from "@mui/material";
import React from "react";
import data from "../../Data/APIcredits";
import Title from "../Title";

function LandingSectionFour() {
  return (
    <>
      <Title
        mainHeading="API Credits"
        secondHeading={"Langregate wouldn't be possible without these APIs"}
      />
      <div className="apiCreditContainer">
        {data.map(({ apiName, text, btn }) => {
          return (
            <div className="apiCreditBox">
              <Typography variant="titleText">{apiName}</Typography>
              <Typography variant="textMdSemiBoldSemiImportant" className="apiCreditText">
                {text}
              </Typography>
              <Button variant="ctaMain" sx={{width: "200px"}}>
                <a href={btn} target="_blank" rel="noopener noreferrer" style={{color: "#fff", textDecoration: "none"}}>
                  Check Them Out
                </a>
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default LandingSectionFour;
