import "./style/Privacy.css";
import banniere from "../assets/backgroundProfile.jpg";
import { Box } from "@mui/system";
import { Alert, Button, Fab, Paper, TextareaAutosize } from "@mui/material";
import { useAuth } from "../../../../Component/Context/AuthContext";
import useClickOutside from "../../../../Component/Hooks/useClickOutside/useClickOutside";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useRef, useCallback } from "react";
import { RgbaColorPicker } from "powerful-color-picker";
import PaletteIcon from "@mui/icons-material/Palette";
import AddIcon from "@mui/icons-material/Add";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ConfirmDialog from "../../../../Component/ConfirmDialog/ConfirmDialog";
import ImageCropper from "../../../../Component/ImageCropper/ImageCropper";

const Privacy = () => {
  const {
    currentUser,
    setInfo,
    updateMail,
    updatePass,
    getResume,
    reauthenticateAccount,
  } = useAuth();
  const [user, setUser] = useState({
    bio: "",
    mail: "",
    password: "",
    phone: "",
    pseudo: "",
  });
  const [currentPass, setCurrentPass] = useState({
    password: "",
    password_confirmed: "",
  });
  const [color, setColor] = useState(
    currentUser?.[0]?.theme
      ? {
          r: currentUser[0].theme.r,
          g: currentUser[0].theme.g,
          b: currentUser[0].theme.b,
          a: currentUser[0].theme.a,
        }
      : { r: 80, g: 80, b: 80, a: 1 }
  );
  const [newColor, setNewColor] = useState(false);
  const [themeChecked, setThemeChecked] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const [needToReauthentificate, setNeedToReauthentificate] = useState(false);
  const [needToReauthentificateEmail, setNeedToReauthentificateEmail] =
    useState(false);
  const [errMessage, setErrMessage] = useState("");
  const popover = useRef();
  const close = useCallback(() => setNewColor(false), []);
  useClickOutside(popover, close);

  const patternPhone = "^s*-?[0-9]{1,10}s*$";

  useEffect(() => {
    setUser({ ...user, bio: currentUser?.[0]?.bio ? currentUser[0].bio : "" });
  }, [currentUser]);

  const setNewInfo = async () => {
    if (user.mail && !user.password) {
      updateMail(user.mail)
        .then(() => {
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
          ).then(() => {
            getResume().then(() => window.location.reload());
            setUser({
              bio: currentUser[0].bio,
              mail: "",
              password: "",
              phone: "",
              pseudo: "",
            });
          });
        })
        .catch((err) => {
          const errCode = err.code;
          if (errCode === "auth/requires-recent-login") {
            setNeedToReauthentificateEmail(true);
          } else if (errCode === "auth/email-already-in-use") {
            setErrMessage("Adresse mail déja utilisé!");
          }
        });
    } else if (!user.mail && user.password) {
      await updatePass(user.password)
        .then(() => {
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
          ).then(() =>
            setUser({
              bio: currentUser[0].bio,
              mail: "",
              password: "",
              phone: "",
              pseudo: "",
            })
          );
          setPasswordUpdated(true);
          setTimeout(() => {
            setPasswordUpdated(false);
          }, 1000);
        })
        .catch((err) => {
          const oldSessionError = err.code;
          if (oldSessionError === "auth/requires-recent-login") {
            setNeedToReauthentificate(true);
          }
        });
    } else if (user.mail && user.password) {
      updatePass(user.password)
        .then(() => {
          updateMail(user.mail).then(() => {
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
                : !user.mail &&
                  !user.phone &&
                  !user.pseudo && { bio: user.bio },
              currentUser[0].id
            ).then(() => {
              getResume().then(() => window.location.reload());
              setUser({
                bio: currentUser[0].bio,
                mail: "",
                password: "",
                phone: "",
                pseudo: "",
              });
            });
          });
          setPasswordUpdated(true);
          setTimeout(() => {
            setPasswordUpdated(false);
          }, 1000);
          setUser({
            ...user,
            mail: "",
            password: "",
            phone: "",
            pseudo: "",
          });
        })
        .catch((err) => {
          const errCode = err.code;
          if (errCode === "auth/email-already-in-use") {
            setErrMessage("Adresse mail déja utilisé!");
          } else if (errCode === "auth/requires-recent-login") {
            setNeedToReauthentificate(true);
          }
        });
    }

    if (!user.mail && !user.password) {
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
      ).then(() =>
        setUser({
          bio: currentUser[0].bio,
          mail: "",
          password: "",
          phone: "",
          pseudo: "",
        })
      );
    }
  };

  const reauthetificateUser = (password) => {
    reauthenticateAccount(password)
      .then(() => {
        setNeedToReauthentificate(false);
        setNeedToReauthentificateEmail(false);
        if (user.mail && !user.password) {
          updateMail(user.mail)
            .then(() => {
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
                  : !user.mail &&
                    !user.phone &&
                    !user.pseudo && { bio: user.bio },
                currentUser[0].id
              ).then(() => {
                getResume().then(() => window.location.reload());
                setUser({
                  bio: currentUser[0].bio,
                  mail: "",
                  password: "",
                  phone: "",
                  pseudo: "",
                });
              });
            })
            .catch((err) => {
              const errCode = err.code;
              if (errCode === "auth/email-already-in-use") {
                setErrMessage("Adresse mail déja utilisé!");
              }
            });
        } else if (!user.mail && user.password) {
          updatePass(user.password).then(() => {
            setUser({
              ...user,
              mail: "",
              password: "",
              phone: "",
              pseudo: "",
            });
            setPasswordUpdated(true);
            setTimeout(() => {
              setPasswordUpdated(false);
            }, 1000);
          });
        } else if (user.mail && user.password) {
          updatePass(user.password).then(() => {
            updateMail(user.mail)
              .then(() => {
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
                    : !user.mail &&
                      !user.phone &&
                      !user.pseudo && { bio: user.bio },
                  currentUser[0].id
                ).then(() => {
                  getResume().then(() => window.location.reload());
                  setUser({
                    bio: currentUser[0].bio,
                    mail: "",
                    password: "",
                    phone: "",
                    pseudo: "",
                  });
                });
              })
              .catch((err) => {
                const errCode = err.code;
                if (errCode === "auth/email-already-in-use") {
                  setErrMessage("Adresse mail déja utilisé!");
                }
              });
            setPasswordUpdated(true);
            setTimeout(() => {
              setPasswordUpdated(false);
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
      })
      .catch((err) => {
        const errCode = err.code;
        if (errCode === "auth/wrong-password") {
          setErrMessage("Mot de pass incorrect");
          setCurrentPass({ password: "", password_confirmed: "" });
        }
      });
  };

  const setNewTheme = () => {
    setThemeChecked(true);

    setTimeout(
      () =>
        setInfo(
          {
            theme: { r: color.r, g: color.g, b: color.b, a: color.a },
          },
          currentUser[0].id
        ).then(() => setNewColor(false) + setThemeChecked(false)),
      267
    );
  };

  return (
    <div className="profile-container">
      <div className="bannière-container">
        {!currentUser?.[0]?.background ? (
          <div className="bannière-container-profile-container"></div>
        ) : (
          <ImageCropper
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "100%",
              background: "grey",
            }}
            format={"Background"}
            imageDestination={
              currentUser?.[0]?.background && currentUser[0].background
            }
            previewImage={true}
            imageElement={null}
          />
        )}
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
                backgroundColor:
                  open || newColor ? "rgba(80, 80, 80, 1)" : "#ababab",
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
                    {needToReauthentificateEmail ? (
                      <>
                        {errMessage && (
                          <Alert variant="outlined" severity="info">
                            {errMessage}
                          </Alert>
                        )}
                        <TextField
                          id="password"
                          label={"mot de passe actuel"}
                          variant="filled"
                          type={"password"}
                          inputProps={{
                            autoComplete: "new-password",
                            form: {
                              autocomplete: "off",
                            },
                          }}
                          value={currentPass.password}
                          onChange={(e) =>
                            setCurrentPass({
                              ...currentPass,
                              password: e.target.value,
                            })
                          }
                        />
                        <TextField
                          id="password2"
                          label={"confirmation du mot de passe actuel"}
                          variant="filled"
                          type={"password"}
                          inputProps={{
                            autoComplete: "new-password",
                            form: {
                              autocomplete: "off",
                            },
                          }}
                          value={currentPass.password_confirmed}
                          onChange={(e) =>
                            setCurrentPass({
                              ...currentPass,
                              password_confirmed: e.target.value,
                            })
                          }
                        />
                        <Button
                          variant="contained"
                          disabled={
                            currentPass.password.length >= 8 &&
                            currentPass.password ===
                              currentPass.password_confirmed
                              ? false
                              : true
                          }
                          onClick={() =>
                            reauthetificateUser(currentPass.password)
                          }
                        >
                          Modifier le mot de passe
                        </Button>
                      </>
                    ) : (
                      <>
                        {errMessage && (
                          <Alert variant="outlined" severity="info">
                            {errMessage}
                          </Alert>
                        )}
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
                      </>
                    )}
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
                          <RgbaColorPicker
                            color={color}
                            prefix="true"
                            onChange={(e) => setColor(e)}
                          />
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
                                <div
                                  style={{
                                    display: "flex",
                                    height: "100%",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    backgroundColor: "#161b30",
                                    borderRadius: "25px",
                                  }}
                                >
                                  <PublishedWithChangesIcon />
                                </div>
                              ) : (
                                <Fab
                                  size="small"
                                  aria-label="add"
                                  style={{
                                    color: "white",
                                    backgroundColor: "#161b30",
                                    borderRadius: "18px",
                                  }}
                                  onClick={() => setNewTheme()}
                                >
                                  <AddIcon />
                                </Fab>
                              )}
                            </div>
                          )}
                        </section>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            height: "auto",
                            width: "100%",
                            justifyContent: "space-around",
                            color: "black",
                          }}
                        >
                          <Button
                            variant="contained"
                            disabled={open}
                            onClick={() => setNewColor(!newColor)}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <h3>Modifier le thème</h3>
                              <PaletteIcon />
                            </div>
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
                  <div
                    className="paper-container-content"
                    style={{ height: "70%" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h3>Changer de mot de passe</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      {needToReauthentificate ? (
                        <>
                          {errMessage && (
                            <Alert variant="outlined" severity="info">
                              {errMessage}
                            </Alert>
                          )}
                          <TextField
                            id="password"
                            label={"mot de passe actuel"}
                            variant="filled"
                            type={"password"}
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            value={currentPass.password}
                            onChange={(e) =>
                              setCurrentPass({
                                ...currentPass,
                                password: e.target.value,
                              })
                            }
                          />
                          <TextField
                            id="password2"
                            label={"confirmation du mot de passe actuel"}
                            variant="filled"
                            type={"password"}
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autocomplete: "off",
                              },
                            }}
                            value={currentPass.password_confirmed}
                            onChange={(e) =>
                              setCurrentPass({
                                ...currentPass,
                                password_confirmed: e.target.value,
                              })
                            }
                          />
                          <Button
                            variant="contained"
                            disabled={
                              currentPass.password.length >= 8 &&
                              currentPass.password ===
                                currentPass.password_confirmed
                                ? false
                                : true
                            }
                            onClick={() =>
                              reauthetificateUser(currentPass.password)
                            }
                          >
                            Modifier le mot de passe
                          </Button>
                        </>
                      ) : (
                        <>
                          <TextField
                            id="password"
                            label={"password"}
                            variant="filled"
                            type={"password"}
                            inputProps={{
                              autoComplete: "new-password",
                              form: {
                                autocomplete: "off",
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
                          {!passwordUpdated ? null : (
                            <Alert severity="success" color="info">
                              Mot de passe modifié!
                            </Alert>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="paper-container-content">
                    <Button
                      variant="contained"
                      disabled={open || newColor ? true : false}
                      color="error"
                      onClick={() => setOpen(true)}
                    >
                      <h3>Supprimer le compte</h3>
                    </Button>
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
                      <Button
                        variant="contained"
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
                      >
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                      <Button
                        variant="contained"
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
                      >
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
                      <Button
                        variant="contained"
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
                      >
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                      <Button
                        variant="contained"
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
                      >
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                      <Button
                        variant="contained"
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
                      >
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                      <Button
                        variant="contained"
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
                      >
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
                      <Button
                        variant="contained"
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
                      >
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                      <Button
                        variant="contained"
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
                      >
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
                        disabled={
                          open ||
                          newColor ||
                          needToReauthentificate ||
                          needToReauthentificateEmail
                            ? true
                            : false
                        }
                        onClick={() => setNewInfo()}
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
