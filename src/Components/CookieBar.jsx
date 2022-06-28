import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";

function CookieBar() {
  const [showBar, setShowBar] = useState(true);
  const matches = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const checkForCookie = localStorage.getItem("hasAcceptedCookies");
    if (checkForCookie) {
      setShowBar(false);
    }
  }, []);

  const updateLsAndState = () => {
    setShowBar(false);
    localStorage.setItem("hasAcceptedCookies", true);
  };

  if (showBar) {
    return (
      <div className="CookieBar">
        <span>
          Langregate uses cookies purely for the process of logging in and for
          features exclusive to users who have an account with Langregate. By
          continuing to use the site, you are giving Langregate permission to
          store cookies. No data whatsoever is collected by Langregate.
        </span>
        <Button
          variant="ctaMain"
          style={{
            width: matches ? "80%" : "20%",
            margin: "0 auto",
            marginTop: "20px",
          }}
          onClick={() => updateLsAndState()}
        >
          I understand
        </Button>
      </div>
    );
  } else {
    return;
  }
}

export default CookieBar;
