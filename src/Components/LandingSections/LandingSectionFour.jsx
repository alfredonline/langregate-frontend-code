import { Button, Grid, Typography } from "@mui/material";
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
      <Grid container gap="10px">
        {data.map((item) => {
          return (
            <Grid container lg="5" xs="12" sx={{ border: "1.5px solid #222" }} key={item.apiName}>
              <Grid
                xs="12"
                sx={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Typography variant="titleText">{item.apiName}</Typography>
                <Typography variant="textMdSemiBoldSemiImportant">
                  {item.text}
                </Typography>
                <Button>
                  <a
                    href={`${item.btn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {item.apiName}
                  </a>
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default LandingSectionFour;
