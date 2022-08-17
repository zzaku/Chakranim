import "./style/Profile.css";
import banniere from "../assets/backgroundProfile.jpg";
import { Box } from "@mui/system";
import { Button, Paper, TextareaAutosize } from "@mui/material";
import { useAuth } from "../../../../Component/Context/AuthContext";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { HexColorPicker } from "powerful-color-picker";
import PaletteIcon from '@mui/icons-material/Palette';

const Profile = () => {
  const { currentUser, setBio, updateMail, getResume } = useAuth();
  const [user, setUser] = useState({
    bio: "",
    mail: "",
    phone: "",
    pseudo: "",
  });
  const [color, setColor] = useState("#aabbcc");
  const [newColor, setNewColor] = useState(false);
  const patternPhone = "^s*-?[0-9]{1,10}s*$";

  useEffect(() => {
    setUser({...user, bio: currentUser?.[0]?.bio ? currentUser[0].bio : "" });
  }, [currentUser]);

  const setNewBio = () => {
    if (user.mail) {
      updateMail(user.mail).then(() =>
        getResume().then(() => window.location.reload())
      );
    }
    setBio(
      user.mail && user.phone && user.pseudo
        ? {
            bio: user.bio,
            mail: user.mail,
            phone: user.phone,
            pseudo: user.pseudo,
          }
        : !user.mail && user.phone && user.pseudo
        ? { bio: user.bio, phone: user.phone, pseudo: user.pseudo }
        : user.mail && !user.phone && user.pseudo
        ? { bio: user.bio, mail: user.mail, pseudo: user.pseudo }
        : user.mail && user.phone && !user.pseudo
        ? { bio: user.bio, mail: user.mail, phone: user.phone }
        : !user.mail && !user.phone && user.pseudo
        ? { bio: user.bio, pseudo: user.pseudo }
        : user.mail && !user.phone && !user.pseudo
        ? { bio: user.bio, mail: user.mail }
        : !user.mail && user.phone && !user.pseudo
        ? { bio: user.bio, phone: user.phone }
        : !user.mail && !user.phone && !user.pseudo && { bio: user.bio },
      currentUser[0].id
    );
  };
  console.log(user);

  return (
    <div className="profile-container">
      <div className="bannière-container">
        <img style={{ height: "100%", width: "100%" }} src={banniere} />
      </div>
      <div className="content-container">
        <div className="content">
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              backgroundColor: "blue",
            }}
          >
            <Paper
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="paper-container">
                <div
                  className="info-container"
                  style={{ alignItems: "center" }}
                >
                  <div className="paper-container-content">
                    <h3>Nom d'utilisateur</h3>
                    <TextField
                      id="standard-basic"
                      label={currentUser[0]?.pseudo}
                      variant="filled"
                      value={user.pseudo}
                      onChange={(e) =>
                        setUser({ ...user, pseudo: e.target.value })
                      }
                    />
                  </div>
                  <div className="paper-container-content">
                    <h3>Email</h3>
                    <TextField
                      id="standard-basic"
                      label={currentUser[0]?.mail}
                      variant="filled"
                      value={user.mail}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          mail: e.target.value.toLocaleLowerCase(),
                        })
                      }
                    />
                  </div>
                  <div className="paper-container-content">
                    <h3>Numéro</h3>
                    <TextField
                      id="standard-basic"
                      label={currentUser[0]?.phone}
                      variant="filled"
                      value={user.phone}
                      onChange={(e) =>
                        console.log(e.target.value.match(patternPhone)) +
                        setUser({
                          ...user,
                          phone: e.target.value.match(patternPhone)
                            ? e.target.value
                            : user.phone,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="info-container">
                  <div className="paper-container-content">
                    <div className="bio-container">
                      <div className="title-container-bio">
                        <h3>Bio</h3>
                      </div>
                      <div className="content-bio">
                        <TextareaAutosize
                          maxRows={6}
                          aria-label="maximum height"
                          style={{
                            width: "80%",
                            height: "100%",
                            border: "2px solid black",
                            borderRadius: "15px",
                            fontSize: "15px",
                            padding: "5px",
                          }}
                          value={user.bio}
                          onChange={(e) =>
                            setUser({ ...user, bio: e.target.value })
                          }
                          maxLength="244"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="paper-container-content" style={{flexDirection: newColor ? "row" : "column"}}>
                    <div className="title-modify-color-palette">
                      <h3>Modifier le thème</h3>
                    </div>
                    <div className="color-palette">
                      {newColor ? <HexColorPicker color={color} onChange={setColor} /> : <Button onClick={() => setNewColor(!newColor)}><PaletteIcon /></Button>}
                    </div>
                  </div>
                </div>
                <div
                  className="info-container"
                  style={{ alignItems: "center" }}
                >
                  <div className="paper-container-content">
                    <h3>Changer de mot de passe</h3>
                  </div>
                  <div className="paper-container-content">
                    <h3>Supprimer le compte</h3>
                  </div>
                </div>
                {user.mail.length === 0 &&
                user.bio === currentUser?.[0]?.bio &&
                user.pseudo.length === 0 &&
                user.phone.length === 0 ? null : user.mail.length === 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" onClick={() => setNewBio()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 ? (
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" onClick={() => setNewBio()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" onClick={() => setNewBio()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" onClick={() => setNewBio()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 ? (
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" onClick={() => setNewBio()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" onClick={() => setNewBio()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : (
                  user.mail.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 && (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        onClick={() => setNewBio()}
                        type="submit"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  )
                )}
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
