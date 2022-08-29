import { NavLink, Nav, Bars, NavMenu } from "./NavbarElements";
import { FcSearch } from 'react-icons/fc';
import { useContext, useEffect, useRef, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from "react-router-dom";
import { epContext } from "../../App";
import './style/Nav.css'
import { Button, TextField, useMediaQuery } from "@mui/material";
import MobileNavbar from "./Mobile Navbar/MobileNavbar"
import { useAuth } from "../Context/AuthContext";
import { grey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({notAtHome, setNotAtHome}) => {

  const open = useContext(epContext)
  const [appearNav] = useState(true)
  const [onMobile, setOnMobile] = useState(false)
  const [newFont, setNewFont] = useState(false)
  const mobile = useMediaQuery('(max-width:968px)');
  const nav = useRef()
  const {currentUserID, setCurrentUserID, setCurrentUser, signout, getPref} = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const pathLocation = location.pathname;
  
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
      
      if(nav.current){
        if(scrollTop === 0){
          nav.current.style.background = "transparent"
          setNewFont(false)
        }
        else{
          nav.current.style.background = "#323d6c"
          nav.current.style.borderRadius = "5px"
          setNewFont(true)
        }
      }
      
    });

    const logOut = async () => {
      await signout()
    }

    const launchSearching = (e, animeToFind) => {
      e.preventDefault()
      open.setLoading(true)
      fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/allSeason?name=${encodeURIComponent((animeToFind).trim())}`)
      .then(res => res.json())
      .then(data => open.setAnimeFound(data) + open.setLoading(false))
      navigate("/Search/Animes")
    }

    const [state, setState] = useState({right: false});

    const home = <NavLink to={"/"} style={{height: "auto", marginTop: mobile ? "0" : "5%"}}>
                    <div className={newFont ? "link-container" : ""}><h1 id="nav">Accueil</h1></div>
                  </NavLink>

    const seeAllAnimes =  <NavLink to={"/list/animes"} style={{height: "auto", marginTop: "5%"}}>
                            <div className={newFont ? "link-container" : ""}><h1>Touts les animes</h1></div>
                          </NavLink>
    const seePreferences =  <NavLink to={"/list/preferences"} style={{height: "auto", marginTop: "5%"}}>
                            <div className={newFont ? "link-container" : ""}><h1>Mes préférences</h1></div>
                          </NavLink>
    const liveAnime =  <NavLink to={"/live-anime"} style={{height: "auto", marginTop: "5%"}}>
                            <div className={newFont ? "link-container" : ""}><h1>live Anime</h1></div>
                          </NavLink>

    const login = currentUserID ?
                      <>
                    <NavLink to={"/account"} style={{height: "auto", marginTop: "5%"}}>
                    <div className={newFont ? "link-container" : ""} style={{borderRadius: "25px", height: "50px", width: "auto"}}>{/*<Avatar
                                                                            sx={{ bgcolor: grey[500] }}
                                                                            alt="demy Sharp"
                                                                            src="/broken-image.jpg"
                                                                          />*/}<h1>Profile</h1></div>
                    </NavLink>
                    <div style={{height: "auto", marginTop: "5%"}}>
                      <div className={newFont ? "link-container" : ""}>
                        <Button style={{ borderRadius: "20px" }} onClick={() => logOut()} >Me déconnecter</Button>
                      </div>
                    </div>
                    
                    </>
                    :
                    <NavLink to={"/connexion"} style={{height: "auto", marginTop: "5%"}}>
                      <div className={newFont ? "link-container" : ""}><h1>Se connecer</h1></div>
                    </NavLink>

    const search =  <NavMenu style={{justifyContent: "space-around", width: "10%"}}>
                  <div style={{height: "auto", marginTop: "5%"}}>
                      <div ><FcSearch size={"40px"} cursor="pointer" onClick={() => open.setSearch(true)}/></div>
                  </div>
                    </NavMenu>

    return (
      pathLocation === "/live-anime" ?
      null 
      :
      (
      <>
        {!open.search ? (
          <>
            {appearNav ? (
              <>
                {onMobile ? (
                  <MobileNavbar
                    state={state}
                    setState={setState}
                    seeAllAnimes={seeAllAnimes}
                    search={search}
                    setSearch={open.setSearch}
                    setOnMobile={setOnMobile}
                  />
                ) : (
                  <Nav ref={nav} className="Navigation" style={{ justifyContent: "space-around" }}>
                    {notAtHome ? (
                      <NavLink to={"/"}>
                        <div
                          className="goBack"
                          onClick={() => setNotAtHome(false)}
                        >
                          <KeyboardBackspaceIcon fontSize="large" />
                        </div>
                      </NavLink>
                    ) : (
                      <NavMenu style={{ display: "flex", justifyContent: "center", alignItems: mobile ? "center" : "flex-start", width: "auto", height: "100%" }}>
                        {home}
                      </NavMenu>
                    )}
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", width: "45%"}}>
                      <NavMenu
                      style={{ justifyContent: "space-around", alignItems: "flex-start", width: "auto", height: "100%" }}
                    >
                      {seeAllAnimes}
                    </NavMenu>
                    <NavMenu style={{ justifyContent: "space-around", alignItems: "flex-start", width: "auto", height: "100%" }}>
                      {seePreferences}
                    </NavMenu>
                    <NavMenu style={{ justifyContent: "space-around", alignItems: "flex-start", width: "auto", height: "100%" }}>
                      {liveAnime}
                    </NavMenu>
                    </div>
                    
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", width: "30%"}}>
                    <NavMenu
                      style={{ justifyContent: "space-around", alignItems: "flex-start", width: "auto", height: "100%" }}
                    >
                      {login}
                    </NavMenu>
                    </div>
                    {!onMobile ? (
                      <Bars
                        onClick={() =>
                          setOnMobile(true) + setState({ right: true })
                        }
                      />
                    ) : null}
                    {search}
                  </Nav>
                )}
              </>
            ) : null}
          </>
        ) : (
          <>
            {appearNav ? (
              <Nav ref={nav} className="Navigation">
                {mobile ? (
                  <div className="mobile-search">
                    <div
                      className="backToMainMenu"
                      onClick={() => open.setSearch(false)}
                    >
                      <Button
                        onClick={() => open.setStartSearching(true)}
                        style={{
                          display: "flex",
                          height: "auto",
                          width: "30%",
                          background: "transparent",
                          border: "2px cyan solid",
                          borderRadius: "200px 200px 200px 200px",
                          boxShadow: "2.8px 5.6px 5.6px hsl(0deg 0% 85%)",
                        }}
                      >
                        <KeyboardBackspaceIcon
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                          }}
                          fontSize="large"
                        />
                      </Button>
                    </div>
                    <div
                      className="search-button"
                      style={{ height: "100%", width: "50%" }}
                    >
                      <Button
                        className="search-btn"
                        onClick={() => launchSearching(open.animeToFind)}
                        style={{
                          display: "flex",
                          height: "80%",
                          width: "auto",
                          background: "transparent",
                          border: "2px cyan solid",
                          justifyContent: "center",
                          borderRadius: "200px 200px 200px 200px",
                          boxShadow: "2.8px 5.6px 5.6px hsl(0deg 0% 85%)",
                        }}
                      >
                          <FcSearch size="60%" />
                      </Button>
                      <form
                        className="search-input"
                        onSubmit={(e) => launchSearching(e, open.animeToFind)}
                      >
                        <div className="search-input-container">
                          <TextField
                            onChange={(val) =>
                              open.setStartSearching(true) +
                              open.setAnimeToFind(val.target.value)
                            }
                            autoComplete="off"
                            className="text-field"
                            style={{
                              background: "white",
                              color: "black",
                              borderRadius: "200px 200px 200px 200px",
                            }}
                            id="standard"
                            label="Recherche ton anime"
                            variant="standard"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="backToMainMenu"
                      onClick={() => open.setSearch(false)}
                    >
                      <Button
                        onClick={() => open.setStartSearching(true)}
                        style={{
                          display: "flex",
                          height: "auto",
                          width: "30%",
                          background: "transparent",
                          border: "2px cyan solid",
                          borderRadius: "200px 200px 200px 200px",
                          boxShadow: "2.8px 5.6px 5.6px hsl(0deg 0% 85%)",
                        }}
                      >
                        <KeyboardBackspaceIcon
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                          }}
                          fontSize="large"
                        />
                      </Button>
                    </div>
                    <div
                      className="search-button"
                      style={{ height: "100%", width: "50%" }}
                    >
                      <Button
                        onClick={() => launchSearching(open.animeToFind)}
                        style={{
                          display: "flex",
                          height: "100%",
                          width: "11%",
                          background: "transparent",
                          border: "2px cyan solid",
                          justifyContent: "center",
                          borderRadius: "200px 200px 200px 200px",
                          boxShadow: "2.8px 5.6px 5.6px hsl(0deg 0% 85%)",
                        }}
                      >
                        <FcSearch size="60%" />
                      </Button>
                      <form
                        className="search-input"
                        onSubmit={(e) => launchSearching(e, open.animeToFind)}
                      >
                        <div className="search-input">
                          <TextField
                            onChange={(val) =>
                              open.setStartSearching(true) +
                              open.setAnimeToFind(val.target.value)
                            }
                            autoComplete="off"
                            className="text-field"
                            style={{
                              background: "white",
                              color: "black",
                              borderRadius: "200px 200px 200px 200px",
                            }}
                            id="standard"
                            label="Recherche ton anime"
                            variant="standard"
                          />
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </Nav>
            ) : null}
          </>
        )}
      </>)
    );
}

export default Navbar