import React from "react";
import Paper from "@mui/material/Paper";

function UserSavedContentMedia({ bgImage }) {
  return <Paper style={{ backgroundImage: "url(" + bgImage + ")" }} className="bgImage" sx={{height: "250px"}}></Paper>;
}

export default UserSavedContentMedia;
