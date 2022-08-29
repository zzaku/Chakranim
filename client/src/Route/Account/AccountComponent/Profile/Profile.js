import { useAuth } from "../../../../Component/Context/AuthContext";
import banniere from "../assets/backgroundProfile.jpg";
import unnamed from "../assets/unnamed.png";
import { Box } from "@mui/system";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./style/Profile.css";
import { Button, IconButton, TextareaAutosize } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useEffect, useRef, useState } from "react";
import { uuidv4 } from "@firebase/util";
import ImageCropper from "../../../../Component/ImageCropper/ImageCropper";

const Profile = () => {
  const {
    currentUser,
    setDisplayInfosUser,
    uploadAvatar,
    getBackImage,
    uploadBackground,
    getBackBackground,
    setAvatarPath,
    setBackgroundPath,
  } = useAuth();
  const [addAvatar, setAddAvatar] = useState(false);
  const [addBackground, setAddBackground] = useState(false);
  const [witchFormat, setWitchFormat] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageBackgroundUpload, setImageBackgroundUpload] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [imageDestination, setImageDestination] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const buttonIcon = useRef();
  const imageElement = useRef();

  const setBackgroundIcon = () => {
    buttonIcon.current.style.backgroundColor = "black";
  };

  const uploadImage = async () => {
    const uuid = uuidv4();

    if (imageDestination) {
      if (witchFormat === "avatar") {
        uploadAvatar(imageDestination, imageName, uuid).then(() => {
          getBackImage(currentUser?.[0]?.avatar_path, imageName, uuid).then(
            (res) => {
              setAvatar(res);
              setAvatarPath({ avatar: res }, currentUser[0].id);
              setImageUpload(null);
              setAddAvatar(false);
              setWitchFormat("");
            }
          );
        });
      } else if (witchFormat === "background") {
        uploadBackground(imageDestination, imageName, uuid).then(() => {
          getBackBackground(currentUser[0].avatar_path, imageName, uuid).then(
            (res) => {
              setBackground(res);
              setBackgroundPath({ background: res }, currentUser[0].id);
              setImageBackgroundUpload(null);
              setAddBackground(false);
              setWitchFormat("");
            }
          );
        });
      }
    }
  };

  const setUrlImage = (e) => {
    console.log(witchFormat);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener(
      "load",
      () => {
        if (witchFormat === "avatar") {
          setImageUpload(reader.result);
        } else if (witchFormat === "background") {
          setImageBackgroundUpload(reader.result);
        }
        setImageName(e.target.files[0].name);
      },
      false
    );

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const setDisplayInfoUser = (mail, phone) => {
    setDisplayInfosUser(
      {
        display: {
          mail: currentUser?.[0]?.display
            ? currentUser?.[0]?.display.mail
              ? mail
                ? !currentUser[0].display.mail
                : currentUser[0].display.mail
              : mail
              ? !currentUser[0].display.mail
              : currentUser[0].display.mail
            : mail
            ? mail
            : mail,
          phone: currentUser?.[0]?.display
            ? currentUser?.[0]?.display.phone
              ? phone
                ? !currentUser[0].display.phone
                : currentUser[0].display.phone
              : phone
              ? !currentUser[0].display.phone
              : currentUser[0].display.phone
            : phone
            ? phone
            : phone,
        },
      },
      currentUser[0].id
    );
  };

  return (
    <div className="profile-container">
      <div
        className="bannière-container-profile"
        onMouseOver={() =>
          setAddBackground(imageBackgroundUpload || imageUpload ? false : true)
        }
        onMouseOut={() => setAddBackground(false)}
      >
        {!background && !currentUser?.[0]?.background ? (
          <div className="bannière-container-profile-container"></div>
        ) : (
          <ImageCropper
            style={{ height: "100%", width: "100%" }}
            setImageDestination={setImageDestination}
            format={"Background"}
            imageDestination={
              background
                ? background
                : currentUser?.[0]?.background && currentUser[0].background
            }
            previewImage={true}
            imageElement={imageElement}
          />
        )}
        {addBackground && (
          <div className="add-background">
            <IconButton
              ref={buttonIcon}
              aria-label="upload picture"
              sx={{
                display: "flex",
                position: "relative",
                backgroundColor: "black",
                height: "100%",
                width: "100%",
                color: "white",
              }}
              onMouseOver={() => setBackgroundIcon()}
            >
              <input
                className="input-file"
                accept="image/*"
                multiple
                type="file"
                onClick={() => setWitchFormat("background")}
                onChange={(e) => setUrlImage(e)}
              />
              <AddPhotoAlternateIcon sx={{ height: "25%", width: "25%" }} />
            </IconButton>
          </div>
        )}
      </div>
      <div
        className="content-container-infos"
        style={{
          backgroundColor: currentUser?.[0]?.theme
            ? `rgba(${currentUser[0].theme.r}, ${currentUser[0].theme.g}, ${currentUser[0].theme.b}, ${currentUser[0].theme.a})`
            : `rgba(80, 80, 80, 1)`,
          flexDirection: "column",
        }}
      >
        <div className="avatar-container">
          <div
            className="content-avatar-container"
            onMouseOver={() =>
              setAddAvatar(imageBackgroundUpload || imageUpload ? false : true)
            }
            onMouseOut={() => setAddAvatar(false)}
          >
            {!avatar && !currentUser?.[0]?.avatar ? (
              <div
                className="avatar-image-profile-container"
                style={{
                  fontSize: currentUser?.[0]?.avatar ? null : "40px",
                  fontFamily: "jojo4",
                }}
              >
                <h1>{currentUser?.[0]?.pseudo[0].toUpperCase()}</h1>
              </div>
            ) : (
              <ImageCropper
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "100%",
                  background: "grey",
                }}
                setImageDestination={setImageDestination}
                imageDestination={
                  avatar
                    ? avatar
                    : currentUser?.[0]?.avatar && currentUser[0].avatar
                }
                format={"avatar"}
                previewImage={true}
                imageElement={imageElement}
              />
            )}
            {addAvatar && (
              <div className="add-avatar">
                <IconButton
                  ref={buttonIcon}
                  aria-label="upload picture"
                  sx={{
                    display: "flex",
                    position: "relative",
                    backgroundColor: "black",
                    height: "100%",
                    width: "100%",
                    color: "white",
                  }}
                  onMouseOver={() => setBackgroundIcon()}
                >
                  <input
                    className="input-file"
                    accept="image/*"
                    multiple
                    type="file"
                    onClick={() => setWitchFormat("avatar")}
                    onChange={(e) => setUrlImage(e)}
                  />
                  <AddPhotoAlternateIcon sx={{ height: "25%", width: "25%" }} />
                </IconButton>
              </div>
            )}
          </div>
        </div>

        {imageUpload ? (
          <div className="container-cropping-image">
            <div className="preview-image-container">
              <div className="cancel-img-btn">
                <Button
                  variant="contained"
                  onClick={() =>
                    setImageUpload(null) +
                    setAddAvatar(false) +
                    setWitchFormat("")
                  }
                >
                  Annuler
                </Button>
              </div>
              <div className="preview-image-profile">
                <ImageCropper
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "100%",
                    background: "grey",
                  }}
                  setImageDestination={setImageDestination}
                  imageDestination={imageDestination}
                  format={"avatar"}
                  previewImage={true}
                  imageElement={imageElement}
                />
              </div>
              <div className="save-img-btn">
                <Button variant="contained" onClick={() => uploadImage()}>
                  Enregistrer
                </Button>
              </div>
            </div>
            <div className="cropper-image">
              <div className="cropper-image-content">
                <ImageCropper
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "100%",
                    background: "grey",
                  }}
                  setImageDestination={setImageDestination}
                  imageDestination={imageDestination}
                  previewImage={false}
                  imageElement={imageElement}
                  imageSRC={imageUpload}
                />
              </div>
            </div>
          </div>
        ) : imageBackgroundUpload ? (
          <div
            className="container-cropping-image"
            style={{ width: "80%", height: "60%" }}
          >
            <div className="preview-image-container" style={{ height: "35%" }}>
              <div className="cancel-img-btn">
                <Button
                  variant="contained"
                  onClick={() =>
                    setImageBackgroundUpload(null) +
                    setAddBackground(false) +
                    setWitchFormat("")
                  }
                >
                  Annuler
                </Button>
              </div>
              <div className="preview-image-profile-background">
                <ImageCropper
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: witchFormat === "avatar" ? "100%" : "0%",
                    background: "grey",
                  }}
                  setImageDestination={setImageDestination}
                  imageDestination={imageDestination}
                  format={"background"}
                  previewImage={true}
                  imageElement={imageElement}
                />
              </div>
              <div className="save-img-btn">
                <Button variant="contained" onClick={() => uploadImage()}>
                  Enregistrer
                </Button>
              </div>
            </div>
            <div className="cropper-image" style={{ height: "55%" }}>
              <div className="cropper-image-content">
                <ImageCropper
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "100%",
                    background: "grey",
                  }}
                  setImageDestination={setImageDestination}
                  imageDestination={imageDestination}
                  previewImage={false}
                  imageElement={imageElement}
                  imageSRC={imageBackgroundUpload}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="content-infos">
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <div className="paper-container">
                <div className="info-container-profile">
                  <div className="paper-container-content">
                    <div className="pseudo">
                      <h3>{currentUser?.[0]?.pseudo}</h3>
                    </div>
                  </div>
                  <div className="paper-container-content">
                    {currentUser?.[0]?.display?.mail ? (
                      <div style={{ fontSize: "15px" }}>
                        <h3>
                          {currentUser[0].mail}{" "}
                          <Button
                            variant="outained"
                            onClick={() => setDisplayInfoUser(true, false)}
                          >
                            <FaEyeSlash />
                          </Button>
                        </h3>
                      </div>
                    ) : (
                      <Button
                        variant="outained"
                        onClick={() => setDisplayInfoUser(true, false)}
                      >
                        <h4>
                          Afficher votre mail <FaEye />
                        </h4>
                      </Button>
                    )}
                  </div>
                  <div className="paper-container-content">
                    {currentUser?.[0]?.display?.phone ? (
                      <div style={{ fontSize: "17px" }}>
                        <h4>
                          {currentUser[0].phone}{" "}
                          <Button
                            variant="outained"
                            onClick={() => setDisplayInfoUser(false, true)}
                          >
                            <FaEyeSlash />
                          </Button>
                        </h4>
                      </div>
                    ) : (
                      <Button
                        variant="outained"
                        onClick={() => setDisplayInfoUser(false, true)}
                      >
                        <h4>
                          Afficher votre numéo de téléphone <FaEye />
                        </h4>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="info-bio-container">
                  <div className="paper-container-content">
                    <div className="bio-container">
                      <div className="content-bio">
                        <div className="content-bio-container">
                          <TextareaAutosize
                            maxRows={6}
                            aria-label="maximum height"
                            value={
                              currentUser?.[0]?.bio
                                ? currentUser[0].bio
                                : "Ajouter une description via l'onglet Confidentialité et Sécurité"
                            }
                            style={{
                              resize: "none",
                              width: "50%",
                              height: "50%",
                              border: "0",
                              fontSize: "15px",
                              padding: "5px",
                              background: "transparent",
                              color: "white",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-top-animes">
                  <div className="paper-container-content"></div>
                  <div className="paper-container-content"></div>
                </div>
              </div>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
