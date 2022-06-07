import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../ContextUser";
import { checkIfTokenIsValid } from "../SmallFunctions/CheckIfTokenIsValid";

function LogoutUserPage() {
  const navigate = useNavigate();

  const { usersSignInStatus, signUserInOut, setUsersName } =
    useContext(ContextUser);

  const sendToLandingPage = () => {
    navigate("/");
  };

  if (usersSignInStatus) {
    sendToLandingPage();
  }

  useEffect(() => {
    async function logout() {
      localStorage.clear();
      let checkToken = await checkIfTokenIsValid();
      if (checkToken === "USER CAN PASS") {
        const data = await axios.get("https://api.langregate.com/api/logout");
        if (data.data == "LOG USER OUT") {
          sendToLandingPage();
          signUserInOut(false);
        }
      }
    }
    logout();
  }, []);

  return <div>Logging you out. Please wait a moment to be redirected.</div>;
}

export default LogoutUserPage;
