import { NavLink, Nav, Bars, NavMenu } from "./NavbarElements";
import { FcSearch } from 'react-icons/fc';
import { useContext, useEffect, useRef, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import { epContext } from "../../App";
import './style/Nav.css'
import { Button, TextField, useMediaQuery } from "@mui/material";
import MobileNavbar from "./Mobile Navbar/MobileNavbar"

const Navbar = ({notAtHome, setNotAtHome}) => {

  const open = useContext(epContext)
  const [appearNav] = useState(true)
  const [onMobile, setOnMobile] = useState(false)
  const mobile = useMediaQuery('(max-width:968px)');
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
      
      if(nav.current){
        if(scrollTop === 0){
          nav.current.style.background = "transparent"
        }
        else{
          nav.current.style.background = "#000"
        }
      }
      
    });

    const launchSearching = (e, animeToFind) => {
      e.preventDefault()
      open.setLoading(true)
      fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/allSeason?name=${encodeURIComponent((animeToFind).trim())}`)
      .then(res => res.json())
      .then(data => open.setAnimeFound(data) + open.setLoading(false))
      navigate("/Search/Animes")
    }

    const [state, setState] = useState({right: false});

    const seeAllAnimes =  <NavLink to={"/list/animes"}>
                            <h2>Touts les animes</h2>
                          </NavLink>

    const search =  <NavMenu style={{justifyContent: "space-around", width: "50%"}}>
                      <FcSearch size={"40px"} cursor="pointer" onClick={() => open.setSearch(true)}/>
                    </NavMenu>

    return (
      <>
        {" "}
        {!open.search ? (
          <>
            {" "}
            {appearNav ? (
              <>
                {onMobile ? 
                  <MobileNavbar
                    state={state}
                    setState={setState}
                    seeAllAnimes={seeAllAnimes}
                    search={search}
                    setSearch={open.setSearch}
                    setOnMobile={setOnMobile}
                  />
                :
                <Nav ref={nav} className="Navigation">
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
                    <NavLink to={"/"}>
                      <h1>Chakranime</h1>
                    </NavLink>
                  )}
                  <NavMenu
                    style={{ justifyContent: "space-around", width: "50%" }}
                  >
                    {seeAllAnimes}
                  </NavMenu>
                  {!onMobile ? <Bars
                    onClick={() =>
                      setOnMobile(true) + setState({ right: true })
                    }
                  />
                  :
                  null}
                  {search}
                </Nav>}
              </>
            ) : null}
          </>
        ) : (
          <>
            {" "}
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
                          height: "auto",
                          width: "auto",
                          background: "transparent",
                          border: "2px cyan solid",
                          justifyContent: "flex-start",
                          borderRadius: "200px 200px 200px 200px",
                          boxShadow: "2.8px 5.6px 5.6px hsl(0deg 0% 85%)",
                        }}
                      >
                        <div style={{display: "flex", width: "100%", height: "100%", borderRadius: "15px", fontSize: "6.5px", marginLeft: "0"}}>
                          <h4>rechercher</h4>
                        </div>
                      </Button>
                      <form className="search-input" onSubmit={(e) => launchSearching(e, open.animeToFind)}>
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
                          height: "auto",
                          width: "11%",
                          background: "transparent",
                          border: "2px cyan solid",
                          borderRadius: "200px 200px 200px 200px",
                          boxShadow: "2.8px 5.6px 5.6px hsl(0deg 0% 85%)",
                        }}
                      >
                        <h4>rechercher</h4>
                      </Button>
                      <form className="search-input" onSubmit={(e) => launchSearching(e, open.animeToFind)}>
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
      </>
    );
}

export default Navbar