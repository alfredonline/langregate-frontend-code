import { Container } from "@mui/material";
import React from "react";

function CenterWrapper({ children }) {
  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection:"column", gap: "80px" }}>
      {children}
    </Container>
  );
}

export default CenterWrapper;
