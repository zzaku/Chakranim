import { useState } from "react";
import SignUp from "./signUp/signUp";
import SignIn from "./signIn/signIn";
import { useAuth } from "../../Component/Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

function Identification({ connected, setConnected, setNeedToConnect, wrapperRefLogin, propsChild }) {
  const [register, setRegister] = useState(false);
  const { currentUserId } = useAuth();
  const location = useLocation();
  const pathLocation = location.pathname;

  return currentUserId ? (
    <Navigate to="/" />
  ) : (
    <div
      className="login-container"
      ref={wrapperRefLogin}
      style={{
        display: "flex",
        height: pathLocation === "connexion " ? "100%" : pathLocation === "/list/preferences" && !register ? "75%" : pathLocation === "/list/preferences" && register ? "100%" : register ? "75%" : "45%",
        width: pathLocation === "/connexion" ? "100%" : pathLocation === "/list/preferences" && !register ? "60%" : pathLocation === "/list/preferences" && register ? "50%" : "50%",
        borderRadius: pathLocation === "/connexion" ? "none" : "25px",
        backgroundColor: pathLocation === "/connexion" ? "black" : "#101116",
        boxShadow: pathLocation === "/connexion" ? "none" : "blue 0px 25px 48px, white 0px 15px 22px",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
        {
        pathLocation === "/connexion" || pathLocation === "/list/preferences" ?
        null 
        : 
        <div className="close-login-container-btn">
              <Button onClick={() => setNeedToConnect(false)} style={{borderRadius: "25px", color: "black", height: "40px"}}><h4>Fermer</h4></Button>
        </div>
        }
      {!register ? (
        <SignIn
          childConnected={connected}
          childSetConnected={setConnected}
          setRegister={setRegister}
          pathLocation={pathLocation}
          setNeedToConnect={setNeedToConnect}
          propsChild={propsChild}
        />
      ) : (
        <SignUp setRegister={setRegister} pathLocation={pathLocation} setNeedToConnect={setNeedToConnect} propsChild={propsChild} />
      )}
    </div>
  );
}

export default Identification;
