import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { TextField } from '@mui/material';
import { width } from '@mui/system';

export default function ConfirmDialog({open, setOpen}) {
  const {currentUser, deleteAccount, reauthenticateAccount} = useAuth()
  const [reauthToDelete, setReauthToDelete] = useState(false)
  const [currentPassToDelete, setCurrentPassToDelete] = useState({password: "", password_confirmed: ""})
  const navigate = useNavigate()
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const deleteAccountUser = (idUser) => {
        deleteAccount(idUser)
        .then(() => navigate('/'))
        .catch(err => {
          const errCode = err.code
          if(errCode === "auth/requires-recent-login"){
            setReauthToDelete(true)
          }
        })
    }

    const reauthentificateToDeleteAccount = (password) => {
      reauthenticateAccount(password)
      .then(() => {
        deleteAccount(currentUser[0].id)
        .then(() => {
          setOpen(false)
          navigate('/')
        })
      })
    }
  
    return (
      <div>
        <Dialog
          open={open}
        >
          <DialogTitle>
            Suppression du compte
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte <span style={{ fontWeight: "bold" }}>{currentUser?.[0]?.pseudo}</span>. Etes-vous sûr de vouloir continuer ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div style={{display: "flex", width: "100%", flexDirection: "column"}}>
            {
              reauthToDelete &&
              <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
            <TextField
                      id="password"
                      label={"mot de passe actuel"}
                      variant="filled"
                      type={"password"}
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}
                      value={currentPassToDelete.password}
                      onChange={(e) =>
                        setCurrentPassToDelete({
                          ...currentPassToDelete,
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
                        autoComplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}
                      value={currentPassToDelete.password_confirmed}
                      onChange={(e) =>
                        setCurrentPassToDelete({
                          ...currentPassToDelete,
                          password_confirmed: e.target.value,
                        })
                      }
                    />
            </div>}
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "100%"}}>
              {
                !reauthToDelete ?
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", width: "45%"}}>
                <Button variant='contained' autoFocus onClick={handleClose}>
                  Annuler
                </Button>
                <Button variant='contained' onClick={() => deleteAccountUser(currentUser[0].id)}>Confirmer</Button>
              </div>
              :
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "100%"}}>
                <Button variant='contained' disabled={currentPassToDelete.password.length >= 8 && currentPassToDelete.password === currentPassToDelete.password_confirmed ? false : true} onClick={() => reauthentificateToDeleteAccount(currentPassToDelete.password)}>Valider</Button>
              </div>
              }
            </div>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }