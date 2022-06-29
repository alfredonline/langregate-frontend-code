import React, { useContext } from "react";
import { ContextUser } from "../ContextUser";
import { Link } from "react-router-dom";

function IsNotSignedInModal() {
  const { setShowCreateSignInModal } = useContext(ContextUser);

  return (
    <div
      style={{
        position: "absolute",
      }}
    >
      <div
        style={{
          position: "fixed",
          backgroundColor: "#7c7c7cae",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}
        onClick={() => setShowCreateSignInModal(false)}
      >
        {" "}
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: "40%",
            transform: "translate('-50%', '-50%')",
            textAlign: "center",
            width: "300px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "40%",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "6px",
            }}
          >
            Uh Oh! Performing that action requires that you be a registered
            user. You can create an account{" "}
            <Link
              to="/signup/new"
              onClick={() => setShowCreateSignInModal(false)}
            >
              here
            </Link>{" "}
            or sign into an existing account{" "}
            <Link to="/signin" onClick={() => setShowCreateSignInModal(false)}>
              {" "}
              Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsNotSignedInModal;
