import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import WrapperContainer from "../Components/WrapperContainer";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ChangePasswordGrid from "../Components/Grids/ChangePasswordGrid";
import ChangeNameGrid from "../Components/Grids/ChangeNameGrid";
import ChangeInterestsGrid from "../Components/Grids/ChangeInterestsGrid";
import ChangeTargetLanguageGrid from "../Components/Grids/ChangeTargetLanguageGrid";
import DeleteAccountGrid from "../Components/Grids/DeleteAccountGrid";
import { checkIfTokenIsValid } from "../Functions/CheckIfTokenIsValid";

function SettingsScreen() {
  const [userInfo, setUserInfo] = useState();
  const [newTargetLanguage, setNewTargetLanguage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function getAllData() {
      let checkToken = await checkIfTokenIsValid();
      if (checkToken === "USER CAN PASS") {
        const data = await axios.get("https://api.langregate.com/api/getAllInfoOfUser");
        if (data) {
          setUserInfo(data.data);
          setNewTargetLanguage(data.targetLanguage);
          console.log(data.data);
        }
      }
    }
    getAllData();
  }, []);

  const settingItems = [
    {
      item: "Change Password",
      link: "password",
      isActive: false,
    },
    {
      item: "Change Name",
      link: "name",
      isActive: false,
    },
    {
      item: "Change Interests",
      link: "interests",
      isActive: false,
    },
    {
      item: "Change Target Language",
      link: "language",
      isActive: false,
    },
    {
      item: "Delete Account",
      link: "account",
      isActive: false,
    },
  ];

  return (
    <WrapperContainer>
      <Grid container sx={{ width: "100%" }}>
        <Grid container gap="20px" xs="12">
          {settingItems.map((item) => {
            return (
              <Grid item key={item.item}>
                <Typography
                  variant="textMdSemiBoldSemiImportant"
                  className="cursorPointer"
                >
                  <Link
                    to={`/settings/${item.link}`}
                    className={
                      item.isActive
                        ? "isActiveClass removeUnderline"
                        : "removeUnderline"
                    }
                  >
                    {item.item}
                  </Link>
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          direction="column"
          gap="20px"
          xs="12"
          marginTop="20px"
          sx={{
            minHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {id === "password" && <ChangePasswordGrid />}
          {id === "name" && <ChangeNameGrid />}
          {id === "interests" && (
            <ChangeInterestsGrid usersInfo={userInfo && userInfo} />
          )}
          {id === "language" && (
            <ChangeTargetLanguageGrid
              tl={newTargetLanguage && newTargetLanguage}
            />
          )}
          {id === "account" && (
            <DeleteAccountGrid
              userInfoPassedInEmail={userInfo && userInfo.email}
            />
          )}
        </Grid>
      </Grid>
    </WrapperContainer>
  );
}

export default SettingsScreen;
