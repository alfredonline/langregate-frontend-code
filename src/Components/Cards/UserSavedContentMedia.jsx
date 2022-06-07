import React from "react";
import Paper from "@mui/material/Paper";

function UserSavedContentMedia({ bgImage, title, completeObj }) {
  return <Paper style={{ backgroundImage: "url(" + bgImage + ")" }} className="bgImage" sx={{height: "250px"}}></Paper>;
}

export default UserSavedContentMedia;
