import { useState } from "react";
import SignUp from "./signUp/signUp";
import SignIn from "./signIn/signIn";
import { useAuth } from "../../Component/Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function Identification({ connected, setConnected, setNeedToConnect, wrapperRefLogin, propsChild }) {
  const [register, setRegister] = useState(false);
  const { currentUserId } = useAuth();
  const location = useLocation();
  const pathLocation = location.pathname;
  const mobile = useMediaQuery("(max-width:968px)");

  return currentUserId ? (
    <Navigate to="/" />
  ) : (
    <div
      className="login-container"
      ref={wrapperRefLogin}
      style={{
        display: "flex",
        height: pathLocation === "/connexion " ? "100%" : pathLocation === "/list/preferences" && !register && !mobile ? "75%" : pathLocation === "/list/preferences" && register && !mobile ? "100%" : pathLocation === "/list/preferences" && register && mobile ? "90%" : pathLocation === "/list/preferences" && !register && mobile ? "60%" : mobile && register ? "60%" : mobile && !register ? "30%" : !mobile && register ? "65%" : !mobile && !register && "40%",
        width: pathLocation === "/connexion" ? "100%" : pathLocation === "/list/preferences" && !register && !mobile ? "60%" : pathLocation === "/list/preferences" && register && !mobile ? "50%" : pathLocation === "/list/preferences" && register && mobile ? "95%" : pathLocation === "/list/preferences" && !register && mobile ? "100%" : mobile && register ? "75%" : mobile && !register ? "95%" : !mobile && register ? "40%" : !mobile && !register && "45%",
        borderRadius: pathLocation === "/connexion" ? "none" : "25px",
        backgroundColor: pathLocation === "/connexion" ? "black" : "#101116",
        boxShadow: pathLocation === "/connexion" ? "none" : "blue 0px 25px 48px, white 0px 15px 22px",
        justifyContent: "center",
        marginTop: pathLocation === "/connexion" && mobile ? "40%" : pathLocation === "/connexion" && !mobile && register && "5%",
        alignItems: "center"
      }}
    >
        {
        pathLocation === "/connexion" || pathLocation === "/list/preferences" ?
        null 
        : 
        <div className="close-login-container-btn" style={{top: mobile && "0%", right: mobile && "5%"}}>
              {!register && <Button onClick={() => setNeedToConnect(false)} style={{borderRadius: "25px", color: "black", height: "40px"}}><h4>Fermer</h4></Button>}
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
          mobile={mobile}
        />
      ) : (
        <SignUp setRegister={setRegister} pathLocation={pathLocation} setNeedToConnect={setNeedToConnect} mobile={mobile} />
      )}
    </div>
  );
}

export default Identification;
