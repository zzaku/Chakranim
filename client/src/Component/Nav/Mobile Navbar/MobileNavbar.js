import { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { FcSearch } from 'react-icons/fc';
import List from '@mui/material/List';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import './style/MobileNavbar.css'

export default function SwipeableTemporaryDrawer({state, setState, setSearch, setOnMobile}) {

    
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

  const list = (anchor) => (
        <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 200 }}
        role="presentation"
        onClick={toggleDrawer(anchor, true)}
        onKeyDown={toggleDrawer(anchor, true)}
        >
        <List>
            {["Voir la liste complète", "rechercher"].map((text, index) => (
            <ListItem key={text} disablePadding>
                {index === 0 ?
                    <NavLink to={"/list/animes"} style={{textDecoration: "none"}}>
                <ListItemButton>
                <ListItemIcon>
                    <VideoLibraryIcon color="primary" size={"40px"} cursor="pointer" />
                </ListItemIcon>
                        <ListItemText primary={text} style={{width: "50%"}}/>
                </ListItemButton>
                    </NavLink>
                    :
                    <ListItemButton onClick={() => setSearch(true)}>
                <ListItemIcon>
                    <FcSearch size={"40px"} cursor="pointer" />
                </ListItemIcon>
                        <ListItemText primary={text} style={{width: "50%"}}/>
                </ListItemButton>}
            </ListItem>
            ))}
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
