import { Button, ButtonGroup, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "../App.css";
import { ContextUser } from "../ContextUser";
import { useContext, useState } from "react";
import { useTransition } from "react-spring";
import { animated } from "react-spring";
import MenuIcon from "@mui/icons-material/Menu";
import CenterWrapper from "./CenterWrapper";
import ArticleIcon from "@mui/icons-material/Article";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import StorageIcon from "@mui/icons-material/Storage";
import TranslateIcon from "@mui/icons-material/Translate";
import { Box } from "@mui/system";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";

function Nav() {
  const { usersSignedInStatus, signUserInOut } = useContext(ContextUser);

  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [fade, setFade] = useState(false);

  const animateMenu = useTransition(menu, {
    from: { x: -1000, y: 0, opacity: 100 },
    enter: { x: 0, y: 0, opacity: 100 },
    leave: { x: -1000, y: 0, opacity: 100 },
  });

  const updateStates = () => {
    setMenu(!menu);
    setFade(!fade);
  };

  const matches = useMediaQuery("(max-width:600px)");

  const navItems = [
    {
      link: "/Discover-Articles",
      text: "Articles",
      icon: <ArticleIcon />,
    },
    {
      link: "/Discover-Movies",
      text: "Movies",
      icon: <MovieCreationIcon />,
    },
    {
      link: "/Discover-Series",
      text: "Series",
      icon: <LiveTvIcon />,
    },
    {
      link: "/my-lists",
      text: "My Saved Content",
      icon: <StorageIcon />,
    },
    {
      link: "/my-vocab",
      text: "Vocabulary",
      icon: <TranslateIcon />,
    },
    {
      link: "/about",
      text: "About Langregate",
      icon: <InfoIcon />,
    },
    {
      link: "/signup/new",
      text: "Create Account",
      icon: <AddIcon />,
    },
    {
      link: usersSignedInStatus ? "logoutUser" : "Signin",
      text: usersSignedInStatus ? "Log out" : "Log In",
      icon: usersSignedInStatus ? <LogoutIcon /> : <LoginIcon />,
    },
    {
      link: "/settings",
      text: "Account Settings",
      icon: <SettingsIcon />,
    },
  ];

  const redirectToLogout = () => {
    navigate("/logoutUser");
  };

  const NavSide = (
    <Grid
      container
      sx={{ padding: "24px", overflowY: "scroll" }}
      direction="column"
      spacing="20px"
    >
      <Grid item sx={{ fontWeight: "700", fontSize: "26px", color: "#222" }}>
        <Link to="/" className="removeUnderline" onClick={() => updateStates()}>
          Langregate
        </Link>
      </Grid>
      {navItems.map((item) => {
        return (
          <Grid item lg="12">
            <Link to={`${item.link}`} onClick={() => updateStates()}>
              <Button
                startIcon={item.icon}
                sx={{ fontSize: "16px", fontWeight: "500", color: "#222" }}
              >
                <Box sx={{ marginLeft: "10px" }}>{item.text}</Box>
              </Button>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );

  function returnNavBar() {
    return (
      <Grid
        container
        sx={{
          height: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid
          item
          sx={{
            fontWeight: "700",
            color: "#222",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          <Link to="/" className="removeUnderline">
            Langregate
          </Link>
        </Grid>
        <Grid
          item
          sx={{
            marginTop: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {!usersSignedInStatus && (
            <Button
              variant="ctaMain"
              sx={{ height: "40px", display: matches ? "none" : "flex" }}
            >
              <Link to={`/signup/new`} className="removeUnderlineNotAffectText">
                Create Account
              </Link>
            </Button>
          )}
          <Button
            variant="ctaSub"
            sx={{ display: matches ? "none" : "flex" }}
            startIcon={usersSignedInStatus ? <LogoutIcon /> : <LoginIcon />}
            onClick={
              usersSignedInStatus
                ? () => redirectToLogout()
                : () => navigate("/signin")
            }
          >
            {usersSignedInStatus ? "Sign Out" : "Sign In"}
          </Button>
          <MenuIcon onClick={() => updateStates()} />
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      {fade && (
        <div className="menuFilter" onClick={() => updateStates()}></div>
      )}
      {animateMenu((style, item) =>
        item ? (
          <animated.div style={style} className="sideBarStyles">
            {NavSide}
          </animated.div>
        ) : (
          ""
        )
      )}

      <CenterWrapper>{returnNavBar()}</CenterWrapper>
    </>
  );
}

export default Nav;
