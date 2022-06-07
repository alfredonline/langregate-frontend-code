import { Button } from "@mui/material";
import styled from "@emotion/styled";

const UtilityBtn = styled(Button)(({ width, height, bgColor, colorpassed }) => ({
  width: width,
  height: height,
  backgroundColor: bgColor ? bgColor : "white",
  color: colorpassed ? colorpassed : "#222",
  fontWeight: "200",
  fontSize: "14px",
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  padding: "12px",
}));

export default UtilityBtn;
