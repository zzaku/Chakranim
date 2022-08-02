import { Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { epContext } from "../../../App";
import { useAuth } from "../../../Component/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import { auth } from "../../../Component/Firebase/Firebase";

function Inscription({ setRegister, pathLocation, setNeedToConnect, mobile }) {
  const load = useContext(epContext);
  const [user, setUser] = useState({});
  const [inscription, setInscription] = useState({});
  const [error, setError] = useState("");
  const { signup, addInfosUser } = useAuth();
  const navigate = useNavigate();
  const patternMail = "[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z]{2,10}";
  const patternPhone = "[0-9]{10}";

  function onChangeUser(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  async function submitInscription(e) {
    e.preventDefault();
    try {
      load.setLoading(true);
      setError("");
      signup(auth, user.mail, user.password)
        .then((res) => {
          setInscription({ successInscription: "inscription reussis !" });
          addInfosUser({
            prenom: user.prenom,
            nom: user.nom,
            pseudo: user.pseudo,
            mail: user.mail.toLowerCase(),
            phone: user.tel,
            adresse: user.adresse,
          });
          if(pathLocation === "/connexion" || pathLocation === "/list/preferences"){
            setTimeout(() => {
                navigate('/')
            }, 1000) 
        } else {
            setTimeout(() => {
                setNeedToConnect(false)
            }, 1000) 
        }
        })
        .catch((error) => {
          setInscription({ successInscription: "" });
          const errorMessage = error.message;
          setError(
            errorMessage === "Firebase: Error (auth/email-already-in-use)." &&
              "Adresse mail déja utilisé !"
          );
        });
    } catch {
      setError("failed to create an account");
    }

    load.setLoading(false);
  }

  return (
    <div
      className="login"
      style={{
        width: pathLocation === "/connexion" ? "100%" : "100%",
        backgroundColor: pathLocation === "/connexion" ? "60%" : "#101116",
        borderRadius: pathLocation === "/connexion" ? "none" : "25px",
        border: pathLocation === "/connexion" ? "none" : "2px solid #9b9bff",
        fontSize: mobile && "10px" 
      }}
    >
      <div className="heading">
        {inscription.pseudoExisting && <div>pseudo existe déja !</div>}
        {inscription.successInscription && (
          <div style={{ display: "flex", height: "auto", width: "auto" }}>
            <Alert severity="success">{inscription.successInscription}</Alert>
          </div>
        )}
        {error && (
          <div
            className="error-container"
            style={{ display: "flex", height: "auto", width: "auto" }}
          >
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        <h2>Inscription</h2>
        <div className="form" style={{ height: "100%" }}>
          <form action="">
            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Prénom"
                name="prenom"
                onChange={onChangeUser}
                autoComplete="off"
              />
            </div>

            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Nom"
                name="nom"
                onChange={onChangeUser}
                autoComplete="off"
                required
              />
            </div>

            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Nom d'utilisateur"
                name="pseudo"
                onChange={onChangeUser}
                autoComplete="off"
                required
              />
            </div>

            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Adresse mail"
                pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10}"
                name="mail"
                onChange={onChangeUser}
                autoComplete="off"
                required
              />
            </div>

            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="tel"
                className="form-control"
                placeholder="Numéro de téléphone"
                pattern="[0-9]{10}"
                name="tel"
                onChange={onChangeUser}
                autoComplete="off"
                required
              />
            </div>

            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Adresse"
                name="adresse"
                onChange={onChangeUser}
                autoComplete="off"
                required
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
                minLength="8"
                name="password"
                onChange={onChangeUser}
                autoComplete="off"
                required
              />
            </div>

            <div className="input-group input-group-lg">
              <span className="input-group-addon">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Confirmer le mot de passe"
                minLength="8"
                name="passwordcheck"
                onChange={onChangeUser}
                autoComplete="off"
                required
              />
            </div>

            <button
              disabled={
                user.password &&
                user.mail &&
                user.tel &&
                user.prenom &&
                user.nom &&
                user.pseudo &&
                user.adresse
                  ? user.password === user.passwordcheck &&
                    user.password.length >= 8 &&
                    user.mail.match(patternMail) &&
                    user.tel.match(patternPhone)
                    ? false
                    : true
                  : true
              }
              className="float"
              name=""
              onClick={(e) => submitInscription(e)}
            >
              S'inscrire
            </button>
          </form>
        </div>

        <div className="container-asking">
          <a
            href={null}
            onClick={() => setRegister(false)}
            className="ask-registering"
            style={{ color: "white" }}
          >
            Se connecter
          </a>
        </div>
      </div>
    </div>
  );
}

export default Inscription;
