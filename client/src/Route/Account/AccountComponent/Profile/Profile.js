import { useAuth } from "../../../../Component/Context/AuthContext";
import banniere from "../assets/backgroundProfile.jpg";
import { Box } from "@mui/system";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./style/Profile.css";
import { Button, IconButton, TextareaAutosize } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useEffect, useRef, useState } from "react";
import { uuidv4 } from "@firebase/util";

const Profile = () => {
  const { currentUser, setDisplayInfosUser, uploadAvatar, getBackImage, setAvatarPath } = useAuth();
  const [addAvatar, setAddAvatar] = useState(false)
  const [imageUpload, setImageUpload] = useState(null)
  const [avatar, setAvatar] = useState("")
  const buttonIcon = useRef()

  const setBackgroundIcon = () => {
    buttonIcon.current.style.backgroundColor = "black"
  } 
console.log(imageUpload)
  const uploadImage = async () => {
    
    const uuid = uuidv4()

    if(imageUpload){
      uploadAvatar(imageUpload, imageUpload.name, uuid)
      .then(() => {
        getBackImage(currentUser[0].avatar_path, imageUpload.name, uuid).then(res => {
          setAvatar(res)
          setAvatarPath({avatar: res}, currentUser[0].id)
        })
      })
    }

  }

  useEffect(() => {
    uploadImage()
  }, [imageUpload])
  
  const setDisplayInfoUser = (mail, phone) => {
    setDisplayInfosUser(
      {
        display: {
          mail: currentUser?.[0]?.display?
          (currentUser?.[0]?.display.mail? (mail
              ? !currentUser[0].display.mail
              : currentUser[0].display.mail)
            : (mail
            ? !currentUser[0].display.mail
            : currentUser[0].display.mail))
            :(mail ? mail : mail),
          phone: currentUser?.[0]?.display?
          (currentUser?.[0]?.display.phone? (phone
              ? !currentUser[0].display.phone
              : currentUser[0].display.phone)
            : (phone
            ? !currentUser[0].display.phone
            : currentUser[0].display.phone))
            :
            (phone ? phone : phone)
        },
      },
      currentUser[0].id
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
            ? `rgba(${currentUser[0].theme.r}, ${currentUser[0].theme.g}, ${currentUser[0].theme.b}, ${currentUser[0].theme.a})`
            : `rgba(80, 80, 80, 1)`,
            flexDirection: "column"
        }}
      >
        <div className="avatar-container">
          <div className="content-avatar-container" onMouseOver={() => setAddAvatar(true)} onMouseOut={() => setAddAvatar(false)}>
            {!avatar && !currentUser?.[0]?.avatar ? <div className="avatar-image-profile-container" style={{ fontSize: currentUser?.[0]?.avatar ? null : "40px", fontFamily: "jojo4" }}>
              <h1>{currentUser?.[0]?.pseudo[0].toUpperCase()}</h1>
            </div> 
            :
            <img style={{ height: "100%", width: "100%", borderRadius: "100%", background: "grey"}} src={avatar ? (avatar) : (currentUser?.[0]?.avatar ? currentUser[0].avatar : null)} />
            }
            {addAvatar && 
              <div className="add-avatar">
                <IconButton ref={buttonIcon} aria-label="upload picture" sx={{display: "flex", position: "relative", backgroundColor: "black", height: "100%", width: "100%", color:"white"}} onMouseOver={() => setBackgroundIcon()}>
                  <input className="input-file" accept="image/*" multiple type="file" onChange={(e) =>  setImageUpload(e.target.files[0])} />
                  <AddPhotoAlternateIcon sx={{ height: "25%", width: "25%" }} />
                </IconButton>
              </div>}
          </div>
        </div>
        <div className="content" style={{ background: "transparent" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <div className="paper-container">
              <div className="info-container" style={{ alignItems: "center" }}>
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
              <div className="info-container" style={{ height: "37%" }}>
                <div className="paper-container-content">
                  <div className="bio-container">
                    <div className="content-bio">
                      <div className="content-bio-container">
                        <TextareaAutosize
                          maxRows={6}
                          aria-label="maximum height"
                          value={currentUser?.[0]?.bio ? currentUser[0].bio : "Ajouter une description via l'onglet Confidentialité et Sécurité"}
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
              <div className="info-container" style={{ alignItems: "center" }}>
                <div className="paper-container-content"></div>
                <div className="paper-container-content"></div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
