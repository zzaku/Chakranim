import { NavLink, Nav, Bars, NavMenu } from "./NavbarElements";
import { FcSearch } from 'react-icons/fc';
import { TiThList } from 'react-icons/ti';
import { useContext, useEffect, useRef, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import { epContext } from "../../App";
import './style/Nav.css'
import { Button, TextField } from "@mui/material";

const Navbar = ({notAtHome, setNotAtHome}) => {

  const open = useContext(epContext)
  const [appearNav, setAppearNav] = useState(true)
  const nav = useRef()
  const navigate = useNavigate();
  
  useEffect(() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(nav.current){
      if(scrollTop === 0){
        nav.current.style.background = "transparent"
      }
    }
  }, [open.search])

    window.addEventListener('scroll',function(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      console.log(scrollTop)
      if(nav.current){
        if(scrollTop === 0){
          nav.current.style.background = "transparent"
        }
        else{
          nav.current.style.background = "#000"
        }
      }
      
    });

    return(
        <> {!open.search ? <> {appearNav ? 
          <Nav ref={nav} className="Navigation">
              {notAtHome ?
                <NavLink to={"/"}>
                  <div className="goBack" onClick={() => setNotAtHome(false)}>
                    <KeyboardBackspaceIcon fontSize="large" />
                  </div>
                </NavLink>
                :
                <NavLink to={"/"}>
                    <h1>Chakranime</h1>
                </NavLink>}
                <NavMenu style={{justifyContent: "space-around", width: "50%"}}>
                  <NavLink to={"/list/animes"}>
                    <h2>Touts les animes</h2>
                  </NavLink>
                </NavMenu>
                
                <Bars />
                <NavMenu style={{justifyContent: "space-around", width: "50%"}}>
                      <FcSearch size={"40px"} cursor="pointer" onClick={() => open.setSearch(true)}/>
                </NavMenu>
            </Nav>
            :
            null}
            </>
            :
            <> {appearNav ? 
              <Nav ref={nav} className="Navigation">
                    <div className="backToMainMenu" onClick={() => open.setSearch(false)}>
                      <Button onClick={() => open.setStartSearching(false) + navigate("/")}  style={{display: "flex", height: "auto", width: "30%", background: "transparent", border: "2px cyan solid", borderRadius: "200px 200px 200px 200px", boxShadow: "2.8px 5.6px 5.6px hsl(0deg 0% 85%)"}}><KeyboardBackspaceIcon style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}} fontSize="large" /></Button>
                    </div>
                    <div className="search-button" style={{height: "100%", width: "50%"}}>
                          <Button onClick={() => open.setSearch(true)} style={{display: "flex", height: "auto", width: "11%", background: "transparent", border: "2px cyan solid", borderRadius: "200px 200px 200px 200px", boxShadow: "2.8px 5.6px 5.6px hsl(0deg 0% 85%)"}} ><FcSearch style={{display: "flex", justifyContent: "center", alignItems: "center"}} size={"40px"} cursor="pointer" /></Button>
                          <div className="search-input">
                            <TextField onChange={(val) => open.setStartSearching(true) + open.setAnimeToFind(val.target.value) + navigate("/Search/Animes")} autoComplete="off" className="text-field" style={{background: "white", color: "black", borderRadius: "200px 200px 200px 200px"}} id="standard" label="Recherche ton anime" variant="standard" />
                          </div>
                    </div>
                </Nav>
                :
                null}
            </>}
        </> 
    )
}

export default Navbar