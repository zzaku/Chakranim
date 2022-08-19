import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function ConfirmDialog({open, setOpen}) {
  const {currentUser, deleteAccount} = useAuth()
  const navigate = useNavigate()

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const deleteAccountUser = (idUser) => {
        deleteAccount(idUser).then(() => navigate('/'))
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
            Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte <span style={{ fontWeight: "bold" }}>{currentUser[0].pseudo}</span>. Etes-vous sûr de vouloir continuer ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' autoFocus onClick={handleClose}>
              Annuler
            </Button>
            <Button variant='contained' onClick={() => deleteAccountUser(currentUser[0].id)}>Confirmer</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }