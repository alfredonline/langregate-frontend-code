import { Paper } from "@mui/material";
import React, { useState } from "react";

function InterestItem({ interest }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Paper
      sx={{ padding: "12px", cursor: "Pointer", backgroundColor: isSelected ? "#f2f2f2" : "#fff" }}
      onClick={() => setIsSelected(true)}
    >
      {interest}
    </Paper>
  );
}

export default InterestItem;
