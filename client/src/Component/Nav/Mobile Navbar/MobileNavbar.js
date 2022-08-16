import { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { FcSearch } from 'react-icons/fc';
import List from '@mui/material/List';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BookIcon from '@mui/icons-material/Book';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './style/MobileNavbar.css'
import { Button } from '@mui/material';

export default function SwipeableTemporaryDrawer({state, setState, setSearch, setOnMobile}) {


  const {currentUserID, setCurrentUserID, setCurrentUser, signout} = useAuth()

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOnMobile(false)
    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signout().then(res => {
      setCurrentUser(null)
      setCurrentUserID(null)
    })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <List>
        {["Voir la liste complète", "Mes préférences", "rechercher", "login", "logout"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              {text === "Voir la liste complète" ? (
                <NavLink to={"/list/animes"} style={{ textDecoration: "none" }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <VideoLibraryIcon
                        color="primary"
                        size={"40px"}
                        cursor="pointer"
                      />
                    </ListItemIcon>
                    <ListItemText primary={text} style={{ width: "50%" }} />
                  </ListItemButton>
                </NavLink>
              ) : text === "Mes préférences" ? (
                <NavLink to={"/list/preferences"} style={{ textDecoration: "none" }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <BookIcon
                        color="primary"
                        size={"40px"}
                        cursor="pointer"
                      />
                    </ListItemIcon>
                    <ListItemText primary={text} style={{ width: "50%" }} />
                  </ListItemButton>
                </NavLink>
              ) :text === "rechercher" ? (
                <ListItemButton onClick={() => setSearch(true)}>
                  <ListItemIcon>
                    <FcSearch size={"40px"} cursor="pointer" />
                  </ListItemIcon>
                  <ListItemText primary={text} style={{ width: "50%" }} />
                </ListItemButton>
              ) : currentUserID ? (
                text === "login" ? (
                  <NavLink to={"/account"} style={{ textDecoration: "none" }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <PersonIcon
                          color="primary"
                          size={"40px"}
                          cursor="pointer"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Mon compte"}
                        style={{ width: "50%" }}
                      />
                    </ListItemButton>
                  </NavLink>
                ) : (
                  text === "logout" && (
                    <ListItemButton onClick={() => logOut()}>
                      <ListItemIcon>
                        <LogoutIcon
                          color="primary"
                          size={"40px"}
                          cursor="pointer"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Me Déconnecter"}
                        style={{ width: "50%" }}
                      />
                    </ListItemButton>
                  )
                )
              ) : (
                currentUserID ||
                (text === "login" && (
                  <NavLink to={"/connexion"} style={{ textDecoration: "none" }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <LoginIcon
                          color="primary"
                          size={"40px"}
                          cursor="pointer"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Me connecter"}
                        style={{ width: "50%" }}
                      />
                    </ListItemButton>
                  </NavLink>
                ))
              )}
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
          <SwipeableDrawer
            className='swiper'
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
  );
}
