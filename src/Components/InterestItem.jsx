import { Paper } from "@mui/material";
import React, { useState } from "react";

function InterestItem({ interest }) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Paper
      sx={{
        padding: "12px",
        cursor: "Pointer",
        backgroundColor: isSelected ? "#f2f2f2" : "#fff",
        border: "1px solid #e7e7e7",
        boxShadow: "none"
      }}
      onClick={() => setIsSelected(true)}
    >
      {interest}
    </Paper>
  );
}

export default InterestItem;
