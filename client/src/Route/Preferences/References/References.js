import { useMediaQuery } from "@mui/material";
import { useEffect, useState, useRef, useContext } from "react";
import { useAuth } from "../../../Component/Context/AuthContext";
import ParallaxHover from "../../../Component/Home/List/Card/Card";
import Backdrop from "@mui/material/Backdrop";
import { epContext } from "../../../App";
import ContentAnime from "../../../Component/Anime/ContentAnime";
import CircularProgress from "@mui/material/CircularProgress";
import {Button} from "@mui/material";
import styled from "styled-components";
import Login from "../../Login/Login"
import "../style/Preferences.css";

  const References = ({ selected, setNotAtHome }) => {
  const { currentUser, currentUserID, getPref } = useAuth();
  const [animesPref, setAnimesPref] = useState([]);
  const mobile = useMediaQuery("(max-width:968px)");
  const [open, setOpen] = useState(false)
  const [anime, setAnime] = useState(null);
  const wrapperRef = useRef(null);
  const [descriptionSuite, setDescriptionSuite] = useState(false);
  const [animeBySeason, setAnimeBySeason] = useState([]);
  const cardContainerRef = useRef();
  const cardListRef = useRef(null);
  const [needToConnect, setNeedToConnect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrevious, setDisablePrevious] = useState(null);
  const loader = useContext(epContext);
  
    const BootstrapButton = styled(Button)({
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      borderRadius: "360px",
      lineHeight: 1.5,
      backgroundColor: 'red',
      borderColor: '#0063cc',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    });

  const getPreferencesReferences = async (tab) => {
    let tempPref = [];

    let ids = tab
      .filter((pref, i) =>
        selected === "fav"
          ? pref.favorite
          : selected === "to_watch_later" && pref.to_watch_later
      )
      .map((pref) => pref.animeId);
    if (ids.length > 0) {
      await fetch(
        `https://chakranimes.herokuapp.com/VOD/list/animes?animeId=${ids}`
      )
        .then((res) => res.json())
        .then((data) => tempPref.push(data));
    }

    return tempPref;
  };

  useEffect(() => {

    setLoading(true)
    
    if (currentUser) {
      if (currentUser.Preferences) {
        if (currentUser.Preferences.length > 0) {
          getPreferencesReferences(currentUser.Preferences).then((res) =>
          {
            setAnimesPref(res)
            setLoading(false)
          });
        } else {
          setLoading(false)
        }
      }
    } else {
      setAnimesPref(null)
    }
  }, [currentUser, currentUserID, selected]);

  useEffect(() => {
    getPref();
  }, [currentUserID, selected])
  
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleClose = () => {
    setOpen(false);
    setDescriptionSuite(false);
    setAnimeBySeason([]);
    setAnime(null);
  };

  const handleToggle = (myAnime) => {
    let firstPartToCheck = myAnime.name.split(" ")[0];
    let secondPartToCheck =
      myAnime.name.split(" ").length > 1 ? myAnime.name.split(" ")[1] : "";
    let thirdPartToCheck =
      myAnime.name.split(" ").length > 2 ? myAnime.name.split(" ")[2] : "";
   
    setAnime(myAnime);
    fetch(
      `${
        process.env.REACT_APP_API_ANIME
      }/VOD/animes/allSeason?name=${encodeURIComponent(
        (firstPartToCheck + " " + secondPartToCheck + " " + thirdPartToCheck).trim()
      )}`
    )
      .then((res) => res.json())
      .then((data) => setAnimeBySeason(data) + loader.setLoading(false));
    setOpen(true);
  };

  const [finalPositionScroll, setFinalPositionScroll] = useState({
    start: true,
    end: false,
  });
  const [currentPose, setCurrentPose] = useState(0);

  const scrollX = (val) => {
    let currentScrollPosition = cardListRef.current.scrollLeft;

    let scrollAmount =
      cardContainerRef.current && cardContainerRef.current.scrollWidth * 9;
    let maxScroll = cardListRef.current
      ? cardListRef.current.scrollWidth
      : null;

    currentScrollPosition += val * scrollAmount;
    console.log(val)

    if (currentScrollPosition >= maxScroll - scrollAmount) {
      currentScrollPosition = maxScroll;
      setDisableNext(true)
      setDisablePrevious(false)
      setFinalPositionScroll({ start: false, end: true });
    } 
    else if (currentScrollPosition <= 0) {
      currentScrollPosition = 0;
      setDisableNext(false)
      setDisablePrevious(true)
      setFinalPositionScroll({ start: true, end: false });
    } 
    else {
      setDisableNext(false)
      setDisablePrevious(false)
      setFinalPositionScroll({ start: false, end: false });
    }
    cardListRef.current.scrollLeft = currentScrollPosition;
  };

  return (
    <div className="list-anime-container">
      <div className="list-anime">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={open}
      >
        {anime ? (
          <ContentAnime
            wrapperRef={wrapperRef}
            anime={anime}
            setAnime={setAnime}
            animeBySeason={animeBySeason}
            descriptionSuite={descriptionSuite}
            setDescriptionSuite={setDescriptionSuite}
            setOpen={setOpen}
            setNotAtHome={setNotAtHome}
          />
        ) : (
          <CircularProgress color="inherit" />
        )}
      </Backdrop>
        {
        currentUserID ?
        
      <div className="list-card-item">
          {
            !loading ? currentUser?.Preferences && animesPref[0] ?
            <div className="card-list-item-container" ref={cardListRef} style={{justifyContent: mobile || !animesPref || !animesPref[0] || animesPref[0].length <= 9 ? "center" : "flex-start"}}>
               {animesPref[0].map((anime, i) => (
                <div
                    key={anime._id + i}
                    className="card-item-container"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleToggle(anime)}
                    ref={cardContainerRef}
                  >
                    {anime.newAnime && (
                      <div
                        className="new-anime-mobile"
                        style={{ display: mobile ? "" : "none" }}
                      >
                        <h2>Nouveauté</h2>
                      </div>
                    )}
                    {anime.nouveau_Episode && (
                      <div
                        className="new-ep-mobile"
                        style={{ display: mobile ? "" : "none" }}
                      >
                        <h2>Nouveaux episodes</h2>
                      </div>
                    )}
                    <ParallaxHover width={"700"} height={"700"} yRotate={500}>
                      <div
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        {anime.newAnime && (
                          <div
                            className="new-anime"
                            style={{ display: mobile ? "none" : "" }}
                          >
                            <h2>Nouveauté</h2>
                          </div>
                        )}
                        {anime.nouveau_Episode && (
                          <div
                            className="new-ep"
                            style={{ display: mobile ? "none" : "" }}
                          >
                            <h2>Nouveaux episodes</h2>
                          </div>
                        )}
                        <img
                          alt={"carde-anime: " + anime.name}
                          className="posters"
                          style={{ height: "100%", width: "100%" }}
                          src={anime.image && anime.image}
                        />
                      </div>
                    </ParallaxHover>
                  </div>
                ))}
                    
                </div>
                :
              <div className="no-resulte">
                <h2>Aucun animé ajouté à votre liste.</h2>
              </div>
              :
              <div className="no-resulte">
                <CircularProgress />
              </div>
              }
        {
        mobile || !animesPref || !animesPref[0] || animesPref[0].length <= 9 ?
        null
        :
          <div className="list-btn">
        <div className="previous-btn">
          <BootstrapButton disabled={disablePrevious === null ? true : disablePrevious} style={{borderRadius: "360px"}} variant="contained" disableRipple onClick={() => scrollX(-1)}>
            précédant
          </BootstrapButton>
        </div>
        <div className="next-btn">
          <BootstrapButton disabled={disableNext} style={{borderRadius: "360px"}} variant="contained" disableRipple onClick={() => scrollX(1)}>
            suivant
          </BootstrapButton>
        </div>
      </div>
        }
      </div>
      :
      <div className="asking-login-container">
        <Login setNeedToConnect={setNeedToConnect} propsChild={<h2>Connectez-vous pour visualiser la liste de vos préférences.</h2>}></Login>
      </div>
        }
      </div>
    </div>
  );
};

export default References;
