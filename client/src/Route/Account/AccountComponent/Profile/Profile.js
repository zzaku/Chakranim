import "./style/Profile.css";
import banniere from "../assets/backgroundProfile.jpg";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";

const Profile = () => {
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
              "&:hover": {
                backgroundColor: "main",
                opacity: [0.9, 0.8, 0.7],
              },
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
                <div className="info-user">
                  <div className="paper-container-content">
                    <h3>Nom d'utilisateur </h3>
                  </div>
                  <div className="paper-container-content">
                    <h3>Email </h3>
                  </div>
                  <div className="paper-container-content">
                    <h3>Numéro </h3>
                  </div>
                </div>
                <div className="info-bio">
                  <div className="paper-container-content">
                    <h3>Bio</h3>
                  </div>
                </div>
                <div className="info-password">
                  <div className="paper-container-content">
                    <h3>Modifier le thème</h3>
                  </div>
                  <div className="paper-container-content">
                    <h3>Changer de mot de passe</h3>
                  </div>
                  <div className="paper-container-content">
                    <h3>Supprimer le compte</h3>
                  </div>
                </div>
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
