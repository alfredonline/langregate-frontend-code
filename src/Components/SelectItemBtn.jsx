import { Button } from "@mui/material";
import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";

function SelectItemBtn(props) {
  const [isClicked, setIsClicked] = useState(true);

  const triggerParentFunction = () => {
    setIsClicked(!isClicked);
    props.triggerFunc();
  };

  return (
    <Button
      startIcon={<FilterListIcon />}
      onClick={() => triggerParentFunction()}
      sx={{
        border: "1px solid #e7e7e7",
        borderRadius: "6px",
        height: "60px",
        color: "#222",
        padding: "12px",
        ":hover": {
          backgroundColor: "#e7e7e7",
        },
      }}
    >
      {isClicked ? "Hide" : "Show"} other {props.typeOfContent}
    </Button>
  );
}

export default SelectItemBtn;
