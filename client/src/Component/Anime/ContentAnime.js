import "./style/ContentAnime.css";
import Overlay from "./Overlay/Overlay";
import { Link } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Circles } from "react-loader-spinner";
import { epContext } from "../../App";
import { useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { Backdrop, Button, useMediaQuery } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import AddToQueueTwoToneIcon from "@mui/icons-material/AddToQueueTwoTone";
import { useAuth } from "../Context/AuthContext";
import Popover from "@mui/material/Popover";
import styled from "styled-components";
import Login from "../../Route/Login/Login"

const ContentAnime = ({
  anime,
  setAnime,
  animeBySeason,
  wrapperRef,
  descriptionSuite,
  setDescriptionSuite,
  setOpen,
  setNotAtHome,
}) => {
  let withoutDoublon = [{}];
  const setEp = useContext(epContext);
  const openSearch = useContext(epContext);
  let distributionTemp = anime.desc ? anime.desc.split("Acteur") : null;
  let description = anime.desc ? anime.desc.split("Acteur")[0] : null;
  let distribution = anime.desc
    ? "Acteur" +
      anime.desc
        .split("Acteur")
        [distributionTemp.length - 1].replaceAll("\n", "")
    : null;
  let LastPartdescriptionTemp = anime.desc
    ? anime.desc.split("Acteur")[0].split(".").join(".").split(".")
    : null;
  if (LastPartdescriptionTemp) {
    if (LastPartdescriptionTemp[LastPartdescriptionTemp.length - 1] === "") {
      LastPartdescriptionTemp.pop();
    }
  }
  let middleDesc =
    LastPartdescriptionTemp &&
    Math.trunc((LastPartdescriptionTemp.length - 1) / 2) + 1;
  let LastPartdescription =
    anime.desc &&
    anime.desc.split("Acteur")[0].split(".").splice(0, middleDesc).join(". ") +
      "...";
  //const [lecteur, setLecteur] = useState({Lecteur: sibnet})
  const allLinks = useMemo(() => [anime.links, anime.nextLinks], [anime]);
  const seasonRef = useRef();
  const mobile = useMediaQuery("(max-width:968px)");
  const [needToConnect, setNeedToConnect] = useState(false);
  const {
    addPreferences,
    setPreferences,
    currentUserID,
    currentUser,
    getPref,
    addResume,
    setResume
  } = useAuth();

  const wrapperRefLogin = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const openPopper = Boolean(anchorEl);
  const openPopper2 = Boolean(anchorEl2);
  const OptionPopover = styled(Popover)`
  > .MuiPopover-paper {    
    background-color: transparent;
    box-shadow: none;
  };
  `

  const filterDoublonAnime = () => {
    let newArray = [];
    let uniqueObject = {};

    if (anime.links) {
      for (let anime in allLinks[0]) {
        // Extract the name
        let animeName = allLinks[0][anime][0]["episode"];

        // Use the name as the index
        uniqueObject[animeName] = allLinks[0][anime];
      }

      for (let anime in uniqueObject) {
        newArray.push(uniqueObject[anime]);
      }
    }
    return newArray;
  };

  withoutDoublon = [{ episode: filterDoublonAnime() }];

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRefLogin.current && !wrapperRefLogin.current.contains(event.target)) {
        handleClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRefLogin]);

  const handleClose = () => {
    setNeedToConnect(false)
  };

  const [seasonSelected, setSeasonSelected] = useState(false);
  const [langueSelected, setLangueSelected] = useState(false);

  useEffect(() => {
    setSeasonSelected(false);
    setLangueSelected(false);
  }, [anime]);

  const setLecteurEpisode = (tab, episode) => {
    return tab.filter((elem) => elem[0].episode === episode);
  };

  const getNbrOfSeason = () => {
    let otherSeason = animeBySeason.filter(
      (elem) => elem.saison !== anime.saison
    );
    let newArray = [];
    let uniqueObject = {};

    if (otherSeason) {
      for (let anime in otherSeason) {
        // Extract the name
        let animeName = otherSeason[anime]["saison"];

        // Use the name as the index
        uniqueObject[animeName] = otherSeason[anime];
      }

      for (let anime in uniqueObject) {
        newArray.push(uniqueObject[anime]);
      }
    }
    return newArray;
  };

  let nbrSeason = getNbrOfSeason();
  let seasonChanged = (otherSeason, langue) => {
    let testSeason = animeBySeason.filter(
      (elem) =>
        (elem.saison === otherSeason.saison && elem.langue === langue) ||
        elem.saison === otherSeason.saison
    )[0];
    if (testSeason) {
      setAnime(testSeason);
    }
  };

  let testLangue = animeBySeason.filter(
    (elem) =>
      elem.saison === anime.saison &&
      elem.langue === (anime.langue === "VF" ? "VOSTFR" : "VF")
  )[0];
  const onLangueChanged = () => {
    setAnime(testLangue);
  };

  useEffect(() => {
    getPref();
  }, []);
  
  const setFav = (animeId, nameAnime) => {
    const animePref =
    currentUser &&
    currentUser.Preferences &&
    currentUser.Preferences.filter((elem) => elem.animeId === animeId);

    if (currentUserID) {
      if (!currentUser.Preferences || animePref.length === 0) {
        addPreferences({
          animeId: animeId,
          name: nameAnime,
          favorite: true,
          to_watch_later: false,
        });
      } else if (animePref && animePref.length > 0) {
        setPreferences(
          {
            favorite: animePref[0].favorite ? false : true,
          },
          animePref[0].id
        );
      }
    } else {
      setNeedToConnect(true);
    }
  };

  const setToWatchLater = (animeId, nameAnime) => {
    const animePref =
      currentUser &&
      currentUser.Preferences &&
      currentUser.Preferences.filter((elem) => elem.animeId === animeId);
    if (currentUserID) {
      if (!currentUser.Preferences || animePref.length === 0) {
        addPreferences({
          animeId: animeId,
          name: nameAnime,
          favorite: false,
          to_watch_later: true,
        });
      } else if (animePref && animePref.length > 0) {
        setPreferences(
          {
            to_watch_later: animePref[0].to_watch_later ? false : true,
          },
          animePref[0].id
        );
      }
    } else {
      setNeedToConnect(true);
    }
  };

  const handlePopoverOpenFav = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverCloseFav = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpenToWatchLater = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverCloseToWatchLater = () => {
    setAnchorEl2(null);
  };

  
  const addToMostWatchedScore = async () => {
    let currentScore = 5
    currentScore += anime?.score_most_watched ? anime.score_most_watched : 0
    await fetch(`${process.env.REACT_APP_API_ANIME}/VOD/anime/score`, {
      method: "PATCH",
      headers: {"Content-type": "application/json;charset=UTF-8"},
      body: JSON.stringify({
        id: anime._id,
        score: currentScore
      })
    })
  }

  const addToResume = async (animeId, nameAnime, epAnime, saison, langue) => {
    if(currentUserID){
      const resume = currentUser && currentUser.Resume && currentUser.Resume.filter(elem => elem.animeId === animeId)
      if(!currentUser.Resume || resume.length === 0) {
        await addResume({
          animeId: animeId,
          name: nameAnime,
          currentEp: epAnime,
          saison: saison,
          langue: langue
        })
      } else if (resume && resume.length > 0) {
        await setResume({
          currentEp: epAnime
        }, resume[0].id)
      }
    } 
  }

  return (
    <div className="display-ep-anime" ref={wrapperRef}>
      <div className="container-display">
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 50 }}
        open={needToConnect}>
          <div className="login-container">
            <Login wrapperRefLogin={wrapperRefLogin} setNeedToConnect={setNeedToConnect} />
          </div>
      </Backdrop>
        {mobile && (
          <div className="back">
            <div className="back-container">
              <Button onClick={() => setOpen(false)}>
                <KeyboardDoubleArrowDownIcon fontSize="large" />
              </Button>
            </div>
          </div>
        )}
        <div className="container-title-anime">
          <div className="container-background-image-anime">
            <img
              alt={anime.name}
              width={"auto"}
              height={"auto"}
              src={anime.banniere}
            />
          </div>
          <div className="container-name-anime">
            <h1>{anime.name}</h1>
          </div>
        </div>
        <div className="info-anime">
          {!mobile ? (
            <div className="container-info-anime">
              <div className="container-desc-anime">
                {!descriptionSuite ? (
                  <h4> {description} </h4>
                ) : (
                  <h4>
                    {LastPartdescription}
                    <h4
                      style={{ color: "cyan", cursor: "pointer" }}
                      onClick={() => setDescriptionSuite(false)}
                    >
                      Afficher la suite
                    </h4>
                  </h4>
                )}
              </div>
              <div className="container-context-anime">
                <h4
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    marginBlockEnd: 0,
                    color: "white",
                  }}
                >
                  Distribution<br></br>
                  {distribution}
                </h4>
                <h4 style={{ width: "50%", color: "cyan" }}>
                  date : {anime.date}
                </h4>
              </div>
            </div>
          ) : (
            <div className="container-info-anime">
              <div className="container-desc-anime">
                {!descriptionSuite ? (
                  <span> {description} </span>
                ) : (
                  <span>
                    {LastPartdescription}
                    <span
                      style={{ color: "cyan", cursor: "pointer" }}
                      onClick={() => setDescriptionSuite(false)}
                    >
                      Afficher la suite
                    </span>
                  </span>
                )}
              </div>
              <div className="container-context-anime">
                <span
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    marginBlockEnd: 0,
                    color: "white",
                  }}
                >
                  Distribution<br></br>
                  {distribution}
                </span>
                <span style={{ width: "50%", color: "cyan" }}>
                  date : {anime.date}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="moreinfo-anime">
          <div className="container-moreinfo-anime">
            <div className="container-content-info-anime">
              <h3>genre: {anime.genre && anime.genre.slice(1).join(", ")}</h3>
              <h3 style={{ width: "30%" }}>
                durée: {anime.duree && anime.duree.replace(" ", "").trim()}
              </h3>
            </div>
            <div ref={seasonRef} className="container-current-saison-anime">
              {anime.saison === "Film" ? (
                <div className="container-saison-anime">
                  <h4 style={{ color: "cyan" }}>Film :</h4>
                </div>
              ) : (
                <div className="container-saison-anime">
                  <h4 style={{ color: "cyan" }}>
                    saison: {anime.saison && anime.saison}
                  </h4>
                </div>
              )}
              <div className="container-episode-nbr-anime">
                <h4>nombre d'épisode: {anime.nombre_episode_final}</h4>
              </div>
              <div ref={seasonRef} className="container-other-saison-anime">
                <h4 id="Saison"> Autre saison :</h4>
                {!openSearch.loading ? (
                  nbrSeason[0] ? (
                    <>
                      <div className="buttonGroup-saison">
                        {nbrSeason.map((elem, i) => {
                          return (
                            <div key={elem._id + i}>
                              <ButtonGroup
                                className="season-btn"
                                style={{ backgroundColor: "black" }}
                                size={mobile ? "small" : "large"}
                                aria-label="large button group"
                              >
                                {elem.saison === "00" ? null : (
                                  <Button
                                    onClick={() =>
                                      setSeasonSelected(true) +
                                      seasonChanged(elem, anime.langue)
                                    }
                                    value={"season"}
                                  >
                                    {elem.saison}
                                  </Button>
                                )}
                              </ButtonGroup>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <h4 id="Saison">indisponible</h4>
                  )
                ) : (
                  <Circles
                    style={{ alignItems: "center" }}
                    height="50"
                    width="100"
                    color="cyan"
                    ariaLabel="loading"
                  />
                )}
              </div>
            </div>
            <div className="langue-preferences-container">
              <div className="container-langue">
                <h4 style={{ color: "cyan" }}>langue : {anime.langue}</h4>
                {testLangue ? (
                  <Button
                    onClick={() =>
                      setLangueSelected(true) +
                      onLangueChanged(
                        anime.saison,
                        anime.langue === "VF" ? "VOSTFR" : "VF"
                      )
                    }
                  >
                    {anime.langue === "VF"
                      ? "regarder en VOSTFR"
                      : "regarder en VF"}
                  </Button>
                ) : null}
              </div>
              <div className="preferences-ref-container">
                <div
                  className={"fav"}
                  onClick={() => setFav(anime._id, anime.name)}
                >
                  <Button
                    aria-owns={openPopper ? "mouse-over-popover-fav" : undefined}
                    aria-haspopup="false"
                    onMouseEnter={handlePopoverOpenFav}
                    onMouseLeave={handlePopoverCloseFav}
                    onMouseOver={() => {
                    document.body.style.padding = 0;
                    document.body.style.overflowY = "scroll";
                  }}
                  >
                    {currentUserID &&
                    currentUser &&
                    currentUser.Preferences &&
                    currentUser.Preferences.filter(
                      (elem) => elem.animeId === anime._id
                    )[0] &&
                    currentUser.Preferences &&
                    currentUser.Preferences.filter(
                      (elem) => elem.animeId === anime._id
                    )[0].favorite ? (
                      <BookmarkIcon />
                    ) : (
                      <BookmarkBorderIcon className="faved" />
                    )}
                  </Button>
                  <OptionPopover
                    id="mouse-over-popover-fav"
                    sx={{
                      pointerEvents: "none",
                    }}
                    open={openPopper}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    onClose={handlePopoverCloseFav}
                    disableAutoFocus={true}
                    disableScrollLock={true}
                  >
                    <div style={{display: "flex", height: "100%", width: "100%", backgroundColor: "transparent", color: "white"}}>
                      <h5>Favori</h5>
                    </div>
                  </OptionPopover>
                </div>
                <div
                  className={"to-watch-later"}
                  onClick={() => setToWatchLater(anime._id, anime.name)}
                >
                  <Button
                     aria-owns={openPopper2 ? "mouse-over-popover-to_watch_later" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpenToWatchLater}
                    onMouseLeave={handlePopoverCloseToWatchLater}>
                    {currentUserID &&
                    currentUser &&
                    currentUser.Preferences &&
                    currentUser.Preferences.filter(
                      (elem) => elem.animeId === anime._id
                    )[0] &&
                    currentUser.Preferences &&
                    currentUser.Preferences.filter(
                      (elem) => elem.animeId === anime._id
                    )[0].to_watch_later ? (
                      <AddToQueueTwoToneIcon />
                    ) : (
                      <AddToQueueIcon className="faved" />
                    )}
                  </Button>
                  <OptionPopover
                    id="mouse-over-popover-to_watch_later"
                    sx={{
                      pointerEvents: "none",
                    }}
                    open={openPopper2}
                    anchorEl={anchorEl2}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    onClose={handlePopoverCloseToWatchLater}
                    disableAutoFocus={true}
                    disableScrollLock={true}
                  >
                    <div style={{display: "flex", height: "100%", width: "100%", backgroundColor: "transparent", color: "white"}}>
                      <h5>Regarder plus regarder</h5>
                    </div>
                  </OptionPopover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-vod-anime">
          {anime.saison === "Film" ? null : <h2>Liste des épisodes</h2>}
          {seasonSelected || langueSelected ? null : (
            <div className="container-episode-anime">
              {withoutDoublon[0].episode ? (
                withoutDoublon[0].episode.map((elem, i) => {
                  return (
                    <div className="vod-anime" key={anime._id + i}>
                      <Link
                        to={`/watch/${anime.name
                          .replaceAll(" ", "-")
                          .replaceAll(".", "")
                          .replaceAll(",", "")
                          .replaceAll("#", "")}/${elem[0].episode.replaceAll(
                          " ",
                          "-"
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          onClick={() =>
                            addToMostWatchedScore() +
                            addToResume(anime._id, anime.name, elem[0].episode, anime.saison, anime.langue) +
                            setNotAtHome(true) +
                            setOpen(false) +
                            setEp.setEp({
                              current_episode: setLecteurEpisode(
                                allLinks[0],
                                elem[0].episode
                              ),
                              all_episode: allLinks[0],
                              id: anime._id,
                              name: anime.name,
                              langue: anime.langue,
                              saison: anime.saison,
                              image: anime.image,
                            }) +
                            openSearch.setSearch(false)
                          }
                          className="vod-cards card-shadow"
                          style={{
                            display: "flex",
                            height: "auto",
                            width: "auto",
                            borderRadius: "15px",
                            cursor: "pointer",
                          }}
                        >
                          <Overlay
                            image={anime.image}
                            episode={elem[0].episode}
                            saison={anime.saison}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h2>Prochainement</h2>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentAnime;
