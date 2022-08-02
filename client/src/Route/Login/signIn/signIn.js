import { useContext } from "react";
import { useState } from "react";
import { useAuth } from "../../../Component/Context/AuthContext";
import { auth } from "../../../Component/Firebase/Firebase";
import { epContext } from "../../../App";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

function Connexion({
  setRegister,
  pathLocation,
  setNeedToConnect,
  propsChild,
  mobile
}) {
  const load = useContext(epContext);
  const { signin, getPref } = useAuth();
  const [error, setError] = useState("");
  const [userConnect, setUserConnect] = useState({});
  const navigate = useNavigate();
  const [connexion, setConnexion] = useState({});

  function onChangeUserConnected(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserConnect({ ...userConnect, [name]: value });
  }

  async function submitConnect(e) {
    e.preventDefault();
    try {
      load.setLoading(true);
      setError("");
      await signin(auth, userConnect.pseudo, userConnect.mdp)
        .then((res) => {
          setConnexion({ successConnexion: "Connexion reussis !" });
          getPref()
          if (pathLocation === "/connexion") {
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else if(pathLocation === "/list/preferences"){
            window.location.reload(false);
          } else {
            setTimeout(() => {
              setNeedToConnect(false);
            }, 1000);
          }
        })
        await getPref()
        .catch((error) => {
          setConnexion({ successConnexion: "" });
          const errorMessage = error.message;
          setError(
            errorMessage === "Firebase: Error (auth/user-not-found)."
              ? "Cette adresse mail n'est liée à aucun compte !"
              : errorMessage === "Firebase: Error (auth/wrong-password)." &&
                  "Adresse mail ou mot de passe incorrect !"
          );
        });
    } catch {
      setError("Connexion échoué !");
    }

    load.setLoading(false);
  }

  return (
    <div
      className="login"
      style={{
        marginTop: pathLocation === "/connexion" ? "15%" : "0",
        width: pathLocation === "/connexion" ? "100%" : "100%",
        backgroundColor: pathLocation === "/connexion" ? "60%" : "#101116",
        borderRadius: pathLocation === "/connexion" ? "none" : "25px",
        border: pathLocation === "/connexion" ? "none" : "2px solid #9b9bff",
        fontSize: mobile && "10px" 
      }}
    >
      <div className="needtolog">{propsChild && propsChild}</div>
      <div className="heading">
        {/*submitted && childConnected.connected ? <div><ToastApprouved/></div>  : submitted && !childConnected.connected ? <div><Toast/></div> : null*/}
        {error && (
          <div
            className="error-container"
            style={{ display: "flex", height: "auto", width: "auto" }}
          >
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        {connexion.successConnexion && (
          <div
            className="success-container"
            style={{ display: "flex", height: "auto", width: "auto" }}
          >
            <Alert severity="success">{connexion.successConnexion}</Alert>
          </div>
        )}
        <h2>Connexion</h2>
        <div className="form" style={{ height: "auto" }}>
          <form onSubmit={submitConnect}>
            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="adresse mail"
                name="pseudo"
                onChange={onChangeUserConnected}
                autoComplete="off"
              />
            </div>

            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Mot de passe"
                name="mdp"
                onChange={onChangeUserConnected}
                autoComplete="off"
              />
            </div>

            <button type="submit" className="float" name="">
              Se connecter
            </button>
          </form>
        </div>

        <div
          className="container-asking"
          style={{ width: pathLocation === "/connexion" ? "75%" : "100%" }}
        >
          <a
            href={null}
            onClick={() => setRegister(true)}
            className="ask-registering"
            style={{ color: "white" }}
          >
            Toujours pas inscrit ?
          </a>
          <a
            href={null}
            className="ask-forget-password"
            style={{ color: "white" }}
          >
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
