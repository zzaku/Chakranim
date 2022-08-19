import "./style/Privacy.css";
import banniere from "../assets/backgroundProfile.jpg";
import { Box } from "@mui/system";
import { Alert, Button, Fab, IconButton, Paper, TextareaAutosize } from "@mui/material";
import { useAuth } from "../../../../Component/Context/AuthContext";
import useClickOutside from "../../../../Component/Hooks/useClickOutside/useClickOutside";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useRef, useCallback } from "react";
import { HexColorPicker, RgbaColorPicker } from "powerful-color-picker";
import PaletteIcon from "@mui/icons-material/Palette";
import AddIcon from '@mui/icons-material/Add';
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ConfirmDialog from "../../../../Component/ConfirmDialog/ConfirmDialog";

const Privacy = () => {
  const { currentUser, setInfo, updateMail, updatePass, getResume } =
    useAuth();
  const [user, setUser] = useState({
    bio: "",
    mail: "",
    password: "",
    phone: "",
    pseudo: "",
  });
  const [color, setColor] = useState(currentUser?.[0]?.theme? {r: currentUser[0].theme.r, g: currentUser[0].theme.g, b: currentUser[0].theme.b, a: currentUser[0].theme.a} : {r: 80, g: 80, b: 80, a: 1});
  const [newColor, setNewColor] = useState(false);
  const [themeChecked, setThemeChecked] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const popover = useRef();
  const close = useCallback(() => setNewColor(false), []);
  useClickOutside(popover, close);

  const patternPhone = "^s*-?[0-9]{1,10}s*$";

  useEffect(() => {
    setUser({ ...user, bio: currentUser?.[0]?.bio ? currentUser[0].bio : "" });
  }, [currentUser]);

  const setNewInfo = async () => {
    if (user.mail && !user.password) {
      updateMail(user.mail).then(() =>
        getResume().then(() => window.location.reload())
      );
    } else if(!user.mail && user.password) {
      await updatePass(user.password).then(() => {
        setUser({
          ...user,
          mail: "",
          password: "",
          phone: "",
          pseudo: "",
        });
        setPasswordUpdated(true)
        setTimeout(() => {
          setPasswordUpdated(false)
        }, 1000);
      })
      
    } else if(user.mail && user.password) {
      updatePass(user.password)
      .then(() => {
        updateMail(user.mail).then(() =>
          getResume().then(() => window.location.reload())
        );
        setPasswordUpdated(true)
        setTimeout(() => {
          setPasswordUpdated(false)
        }, 1000);
        setUser({
          ...user,
          mail: "",
          password: "",
          phone: "",
          pseudo: "",
        });
      });
    } 

    if(user.mail || user.phone || user.pseudo || user.bio){

      setInfo(
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
      ).then(() => setUser({
        bio: currentUser[0].bio,
        mail: "",
        password: "",
        phone: "",
        pseudo: "",
      }));
    }
  };

  const setNewTheme = () => {
    setThemeChecked(true);

    setTimeout(
      () =>
        setInfo(
          {
            theme: {r: color.r, g: color.g, b: color.b, a: color.a}
          },
          currentUser[0].id
        ).then(() => setNewColor(false) + setThemeChecked(false)),
      267
    );
  };

  return (
    <div className="profile-container">
      <div className="bannière-container">
        <img style={{ height: "100%", width: "100%" }} src={banniere} />
      </div>
      <div
        className="content-container"
        style={{
          backgroundColor: currentUser?.[0]?.theme
            ? newColor
              ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
              : `rgba(${currentUser[0].theme.r}, ${currentUser[0].theme.g}, ${currentUser[0].theme.b}, ${currentUser[0].theme.a})`
            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        }}
      >
        <div className="content">
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <Paper
              sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: newColor ? "rgba(80, 80, 80, 1)" : "#ababab",
              }}
            >
              <div className="paper-container">
                <ConfirmDialog
                  handle="#draggable-dialog-title"
                  cancel={'[class*="MuiDialogContent-root"]'}
                  open={open}
                  setOpen={setOpen}
                >
                  <Paper />
                </ConfirmDialog>
                <div
                  className="info-container"
                  style={{ alignItems: "center" }}
                >
                  <div className="paper-container-content">
                    <h3>Nom d'utilisateur</h3>
                    <TextField
                      id="pseudo"
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
                      id="mail"
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
                      id="phone"
                      label={currentUser[0]?.phone}
                      variant="filled"
                      value={user.phone}
                      onChange={(e) =>
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
                            background: newColor
                              ? "rgba(80, 80, 80, 1)"
                              : "#e3e3e3",
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
                  <div
                    className="paper-container-content"
                    style={{ flexDirection: newColor ? "row" : "column" }}
                  >
                    <div className="color-palette">
                      {newColor ? (
                        <section
                          className="custom-layout example"
                          ref={popover}
                        >
                          <RgbaColorPicker color={color} prefix="true"  onChange={(e) => setColor(e)} />
                          {`rgba(${currentUser?.[0]?.theme?.r}, ${currentUser?.[0]?.theme?.g}, ${currentUser?.[0]?.theme?.b}, ${currentUser?.[0]?.theme?.a})` ===
                          `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` ? null : (
                            <div
                              style={{
                                position: "absolute",
                                display: "flex",
                                height: "35px",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "40px",
                                borderRadius: "25px",
                                background: "#dfdfdf",
                                right: "0",
                                top: "40%",
                              }}
                            >
                              {themeChecked ? (
                                <div style={{ display: "flex", height: "100%",width: "100%", alignItems: "center", justifyContent: "center", color: "white", backgroundColor: "#161b30", borderRadius: "25px" }} ><PublishedWithChangesIcon /></div>
                              ) : (
                                <Fab size="small" aria-label="add" style={{ color: "white", backgroundColor: "#161b30", borderRadius: "18px"}} onClick={() => setNewTheme()}>
                                  <AddIcon />
                                </Fab>
                              )}
                            </div>
                          )}
                        </section>
                      ) : (
                        <div style={{
                          display: "flex",
                          height: "auto",
                          width: "100%",
                          justifyContent: "space-around",
                          color: "black",
                          }}>
                          <Button variant="contained" onClick={() => setNewColor(!newColor)}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}><h3>Modifier le thème</h3><PaletteIcon /></div>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="info-container"
                  style={{ alignItems: "center" }}
                >
                  <div className="paper-container-content">
                    <div><h3>Changer de mot de passe</h3></div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                    <TextField
                      id="password"
                      label={"password"}
                      variant="filled"
                      type={"password"}
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}
                      value={user.password}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          password: e.target.value,
                        })
                      }
                    />
                    {!passwordUpdated ? null :
                    <Alert severity="success" color="info">
                      Mot de passe modifié!
                    </Alert>}
                    </div>
                  </div>
                  <div className="paper-container-content">
                    <Button variant="contained" disabled={newColor? true: false} color="error" onClick={() => setOpen(true)}><h3>Supprimer le compte</h3></Button>
                  </div>
                </div>
                {user.mail.length === 0 &&
                user.password.length === 0 &&
                user.bio === currentUser?.[0]?.bio &&
                user.pseudo.length === 0 &&
                user.phone.length === 0 ? null : user.mail.length === 0 &&
                  user.password.length === 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" disabled={newColor? true: false} onClick={() => setNewInfo()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length === 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 ? (
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length === 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" disabled={newColor? true: false} onClick={() => setNewInfo()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 ? (
                  user.password.length > 0 ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" disabled={newColor? true: false} onClick={() => setNewInfo()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length === 0 &&
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
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length === 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" disabled={newColor? true: false} onClick={() => setNewInfo()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length === 0 &&
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
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 ? (
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.password.length > 0 ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.password.length > 0 ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  user.password.length > 0 ||
                  user.phone !== currentUser?.[0]?.phone ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length === 0 &&
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
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.password.length > 0 ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.password.length > 0 ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.password.length > 0 ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length > 0 &&
                  user.bio === currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.password.length > 0 ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" disabled={newColor? true: false} onClick={() => setNewInfo()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 ? (
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" disabled={newColor? true: false} onClick={() => setNewInfo()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 ? (
                  user.password.length > 0 ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" disabled={newColor? true: false} onClick={() => setNewInfo()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length === 0 &&
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
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button variant="contained" disabled={newColor? true: false} onClick={() => setNewInfo()}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length === 0 &&
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
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 ? (
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.password.length > 0 ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.password.length > 0 ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  user.password.length > 0 ||
                  user.phone !== currentUser?.[0]?.phone ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length === 0 &&
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
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length === 0 &&
                  user.password.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.password.length > 0 ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.password.length > 0 ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length === 0 ? (
                  user.password.length > 0 ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : user.mail.length > 0 &&
                  user.password.length > 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length > 0 &&
                  user.phone.length > 0 ? (
                  (user.phone !== currentUser?.[0]?.phone &&
                    user.phone.length === 10) ||
                  user.password.length > 0 ||
                  user.mail.toLowerCase() !==
                    currentUser?.[0]?.mail.toLowerCase() ||
                  user.pseudo !== currentUser?.[0]?.pseudo ||
                  user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null
                ) : (
                  user.mail.length === 0 &&
                  user.password.length === 0 &&
                  user.bio !== currentUser?.[0]?.bio &&
                  user.pseudo.length === 0 &&
                  user.phone.length === 0 &&
                  (user.bio !== currentUser?.[0]?.bio ? (
                    <div className="save-changes">
                      <Button
                        variant="contained"
                        disabled={newColor? true: false} onClick={() => setNewInfo()}
                      >
                        Enregistrer
                      </Button>
                    </div>
                  ) : null)
                )}
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Privacy;