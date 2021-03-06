import Container from "@mui/material/Container";

import React from "react";

function WrapperContainer({ children }) {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 12 }}>
      {children}
    </Container>
  );
}

export default WrapperContainer;
