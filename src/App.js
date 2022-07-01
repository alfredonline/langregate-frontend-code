import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiscoveryScreen from "./Screens/DiscoveryScreen";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nav from "./Components/Nav";
import DiscoverMedia from "./Screens/DiscoverMedia";
import IndividualContent from "./Screens/IndividualContent";
import { Outlet } from "react-router-dom";
import SignInScreen from "./Screens/SignInScreen";
import UserLists from "./Screens/UserLists";
import { ContextUser } from "./ContextUser";
import React, { useState, useMemo, useEffect } from "react";
import LandingRegisteredUser from "./Screens/LandingRegisteredUser";
import LandingUnregisteredUser from "./Screens/LandingUnregisteredUser";
import UserSavedVocab from "./Screens/UserSavedVocab";
import Footer from "./Components/Footer";
import SettingsScreen from "./Screens/SettingsScreen";
import LogoutUserPage from "./Screens/LogoutUserPage";
import AboutPage from "./Screens/AboutPage";
import RegisterScreen from "./Screens/RegisterScreen";
import ErrorPage from "./Screens/ErrorPage";
import CookieBar from "./Components/CookieBar";
import IsNotSignedInModal from "./Components/IsNotSignedInModal";

const ctaColour = "#4615b2";

const theme = createTheme({
  palette: {
    primary: {
      main: ctaColour,
    },
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "ctaMain" },
          style: {
            backgroundColor: "#222",
            color: "#fff",
            textTransform: "None",
            fontSize: "18px",
            borderRadius: "6px",
            ":hover": {
              backgroundColor: "#222",
            },
          },
        },
        {
          props: { variant: "ctaSub" },
          style: {
            backgroundColor: "transparent",
          },
        },
      ],
    },
  },

  typography: {
    h4: {
      padding: "0px",
    },

    smallTitle: {
      fontWeight: 600,
      fontSize: "20px",
      color: "#222",
    },

    errorText: {
      fontSize: "22px",
      color: "red",
      fontWeight: "600",
    },

    textLgBoldImportant: {
      fontSize: "42px",
      color: "#222222",
      fontWeight: "800",
      lineHeight: "1.4",
    },
    titleText: {
      fontSize: "22px",
      color: "#222222",
      fontWeight: "600",
      lineHeight: "1.4",
    },
    textMdSemiBoldSemiImportant: {
      fontSize: "18px",
      color: "rgba(34, 34, 34, 0.614)",
      fontWeight: "500",
      lineHeight: "1.4",
      padding: "0px",
    },
  },
});

function App() {
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);
  const [usersName, setUsersName] = useState("");
  const isLoggedIn = localStorage.getItem("USERISLOGGEDIN");
  const [showCreateSignInModal, setShowCreateSignInModal] = useState(false);

  function Layout() {
    return (
      <div>
        <Nav />
        <div className="container">
          <>
            <Outlet />
            {showCreateSignInModal && <IsNotSignedInModal />}
          </>
        </div>
        <Footer />
      </div>
    );
  }

  useEffect(() => {
    if (isLoggedIn) {
      setUserIsSignedIn(true);
      setShowCreateSignInModal(false);
    }
  }, []);

  const ProtectedRoutes = () => {
    return isLoggedIn ? <Outlet /> : <SignInScreen />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ContextUser.Provider
          value={{
            usersSignedInStatus: userIsSignedIn,
            signUserInOut: setUserIsSignedIn,
            setUsersName: setUsersName,
            usersName: usersName,
            showCreateSignInModal: showCreateSignInModal,
            setShowCreateSignInModal: setShowCreateSignInModal,
          }}
        >
          <Routes>
            <Route path="/logoutUser" element={<LogoutUserPage />} />
            <Route path="/" element={[<Layout />]}>
              <Route
                path="/"
                element={
                  userIsSignedIn ? (
                    <>
                      <LandingRegisteredUser />
                      <CookieBar />
                    </>
                  ) : (
                    <>
                      <LandingUnregisteredUser />
                      <CookieBar />
                    </>
                  )
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/Discover-Articles" element={<DiscoveryScreen />} />
              <Route
                path="/Discover-Movies"
                element={
                  <DiscoverMedia typeOfMedia={"Movies"} searchQuery={"movie"} />
                }
              />
              <Route
                path="/Discover-Series"
                element={
                  <DiscoverMedia typeOfMedia={"tv"} searchQuery="series" />
                }
              />

              <Route path="/Settings" element={<SettingsScreen />} />
              <Route
                path="/movies/:id"
                element={<IndividualContent typeOfContent={"movie"} />}
              />
              <Route
                path="/tv/:id"
                element={<IndividualContent typeOfContent={"tv"} />}
              />
              <Route element={<ProtectedRoutes />}>
                <Route path="/my-lists" element={<UserLists />} />
                <Route path="/my-vocab" element={<UserSavedVocab />} />
                <Route path="/settings/:id" element={<SettingsScreen />} />
              </Route>
            </Route>
            <Route path="/signup/new" element={<RegisterScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ContextUser.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
