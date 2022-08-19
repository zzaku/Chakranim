import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ContentAnime from "../../Anime/ContentAnime";
import { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@mui/material";
import ParallaxHover from "./Card/Card";
import goku from "./Neon/assets/kamea.gif";
import jiren from "./Neon/assets/jiren.gif";
import tpGoku from "./Neon/assets/tpGoku.gif";
import songoku from "./Neon/assets/songoku.gif";
import { parseGIF, decompressFrames } from "gifuct-js";
import { useMediaQuery } from "@mui/material";
import "./style/List.css";
import { epContext } from "../../../App";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const List = ({ genre, genres, setNotAtHome }) => {
  let withoutDoublon = [{}];
  const wrapperRef = useRef(null);
  const cardListRef = useRef(null);
  const scrollRightRef = useRef(null);
  const scrollLeftRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [anime, setAnime] = useState(null);
  const [descriptionSuite, setDescriptionSuite] = useState(false);
  const [animeBySeason, setAnimeBySeason] = useState([]);
  const loader = useContext(epContext);
  const ep = useContext(epContext);
  const refCard = useRef();
  const cardContainerRef = useRef();
  const neonContainerRef = useRef();
  const gokuRef = useRef();
  const jirenRef = useRef();
  const mobile = useMediaQuery("(max-width:968px)");
  const { currentUserID, currentUser, getPref, getResume } = useAuth();

  let categorie = genres.includes("é")
    ? genres.replace("é", "e")
    : genres.includes("è")
    ? genres.replaceAll("è", "e")
    : genres.includes(" ")
    ? genres.replaceAll(" ", "_")
    : genres.includes("-")
    ? genres.replaceAll("-", "_")
    : genres;

  let DisplayAllCategory = genres;

  useEffect(() => {
    if (anime) {
      setDescriptionSuite(
        anime.desc.split("Acteur")[0].length < 400 ? false : true
      );
    }
  }, [anime]);

  useEffect(() => {
    let sumDelay1;
    let sumDelay2;

    fetch(goku)
      .then((res) => res.arrayBuffer())
      .then((buff) => parseGIF(buff))
      .then((gif) => {
        sumDelay1 = displayGifOneTime(decompressFrames(gif, true));
        if (sumDelay1 > 0) {
          setTimeout(() => {
            fetch(tpGoku)
              .then((res) => res.arrayBuffer())
              .then((buff) => parseGIF(buff))
              .then((gif) => {
                sumDelay2 = displayGifOneTime(decompressFrames(gif, true));
                if (sumDelay2 > 0 && gokuRef.current) {
                  gokuRef.current.src = tpGoku;
                  gokuRef.current.style.height = "auto";
                  gokuRef.current.style.width = "auto";
                  setTimeout(() => {
                    if (gokuRef.current) {
                      gokuRef.current.src = songoku;
                    }
                  }, sumDelay2 - 100);
                }
              });
          }, sumDelay1);
        }
      });
  }, [gokuRef]);

  const displayGifOneTime = (array) => {
    if (array[0]) {
      let sumDelay = array.map((frame) => frame.delay).reduce((a, b) => a + b);
      return sumDelay;
    }
  };

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

  const filterDoublonAnime = () => {
    let newArray = [];
    let uniqueObject = {};
    if (genre[0][genres]) {
      for (let anime in genre[0][genres]) {
        // Extract the name
        let animeName = genre[0][genres][anime]["name"].includes("×")
          ? genre[0][genres][anime]["name"].replace("×", "X").toUpperCase()
          : genre[0][genres][anime]["name"].toUpperCase();

        // Use the name as the index
        uniqueObject[animeName] = genre[0][genres][anime];
      }

      for (let anime in uniqueObject) {
        newArray.push(uniqueObject[anime]);
      }
    }
    return newArray;
  };
  withoutDoublon = [{ [genres]: filterDoublonAnime() }];

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
    loader.setLoading(true);
    setAnime(myAnime);
    fetch(
      `${
        process.env.REACT_APP_API_ANIME
      }/VOD/animes/allSeason?name=${encodeURIComponent(
        (
          firstPartToCheck +
          " " +
          secondPartToCheck +
          " " +
          thirdPartToCheck
        ).trim()
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
    let currentScrollPosition = 0;

    let scrollAmount =
      cardContainerRef.current && cardContainerRef.current.scrollWidth * 7;
    let maxScroll = cardListRef.current
      ? cardListRef.current.scrollWidth
      : null;

    currentScrollPosition =
      finalPositionScroll.start && !finalPositionScroll.end ? 0 : currentPose;
    currentScrollPosition += val * scrollAmount;

    setCurrentPose(currentScrollPosition);

    if (currentScrollPosition >= maxScroll - scrollAmount) {
      currentScrollPosition = maxScroll;
      setFinalPositionScroll({ start: false, end: true });
    } else if (currentScrollPosition <= 0) {
      currentScrollPosition = 0;
      setFinalPositionScroll({ start: true, end: false });
    } else {
      setFinalPositionScroll({ start: false, end: false });
    }
    cardListRef.current.scrollLeft = currentScrollPosition;
  };

  useEffect(() => {
    getPref();
    getResume();
  }, [currentUserID]);

  const setLecteurEpisode = (tab, episode) => {
    return tab.filter((elem) => elem[0].episode === episode);
  };

  const getCurrentEp = (
    AnimeId,
    name,
    langue,
    saison,
    image,
    links,
    nextLink
  ) => {
    const currentEp =
      currentUser &&
      currentUser.Resume &&
      currentUser.Resume.filter((elem) => elem.animeId === AnimeId);
    const allLinks = [links, nextLink];
    console.log(allLinks);
    ep.setEp({
      current_episode: setLecteurEpisode(allLinks[0], currentEp[0].currentEp),
      all_episode: allLinks[0],
      id: AnimeId,
      name: name,
      langue: langue,
      saison: saison,
      image: image,
    });
  };

  return (
    <div className="card">
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
      <div className="grid-container">
        <div ref={neonContainerRef} className="grid-list-container">
          {mobile && (
            <div className="genre-title">
              <h1>{DisplayAllCategory}</h1>
            </div>
          )}
          <div className="animation">
            <div className="animation-gif">
              <img
                alt="goku"
                ref={gokuRef}
                style={{ display: "flex", height: "auto", width: "auto" }}
                src={goku}
              />
              <div className="genre-title">
                <h1>
                  {genres === "Reprendre"
                    ? withoutDoublon[0][genres].length > 1
                      ? "Reprendre les animés en cours"
                      : "Reprendre l'animé en cours"
                    : DisplayAllCategory}
                </h1>
              </div>
              <img
                alt="jiren"
                ref={jirenRef}
                style={{
                  display: "flex",
                  height: "auto",
                  width: "auto",
                  WebkitTransform: "scaleX(-1)",
                }}
                src={jiren}
              />
            </div>
          </div>
          <div
            className="list-card"
            ref={cardListRef}
            style={{
              padding: mobile
                ? null
                : genres === "Les plus regardes"
                ? "8rem 3rem 0 1rem"
                : "8rem 3rem 0 3rem",
              justifyContent:
                genres === "Reprendre" && withoutDoublon[0][genres].length < 8
                  ? "center"
                  : null,
            }}
          >
            {!finalPositionScroll.start ? (
              <Button
                className="scroll-btn"
                ref={scrollLeftRef}
                onClick={() => scrollX(-1)}
                style={{
                  left: "3.2rem",
                  boxShadow:
                    "rgba(255,255,255, 0.4) -5px 5px, rgba(255,255,255, 0.3) -10px 10px, rgba(255,255,255, 0.2) -15px 15px, rgba(255,255,255, 0.1) -20px 20px, rgba(255,255,255, 0.05) -25px 25px",
                  marginLeft: "2%",
                }}
                variant="text"
              >
                <ArrowBackIosNewTwoToneIcon sx={{ fontSize: 60 }} />
              </Button>
            ) : null}
            {withoutDoublon[0][genres]
              ? withoutDoublon[0][genres].map((genre, i) =>
                  genres === "Reprendre" ? (
                    <Link
                      to={`/watch/${genre.name
                        .replaceAll(" ", "-")
                        .replaceAll(".", "")
                        .replaceAll(",", "")
                        .replaceAll("#", "")}/Resume`}
                      style={{ textDecoration: "none" }}
                      key={genre._id + i}
                    >
                      {" "}
                      <div
                        ref={cardContainerRef}
                        className="card-container"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleToggle(genre) +
                          (genres === "Reprendre" &&
                            getCurrentEp(
                              genre._id,
                              genre.name,
                              genre.langue,
                              genre.saison,
                              genre.image,
                              genre.links,
                              genre.nextLinks
                            ))
                        }
                      >
                        {genre.newAnime && (
                          <div
                            className="new-anime-mobile"
                            style={{ display: "none" }}
                          >
                            <h2>Nouveauté</h2>
                          </div>
                        )}
                        {genre.nouveau_Episode && (
                          <div
                            className="new-ep-mobile"
                            style={{ display: "none" }}
                          >
                            <h2>Nouveaux episodes</h2>
                          </div>
                        )}
                        <ParallaxHover
                          width={"700"}
                          height={"700"}
                          yRotate={genres === "Les plus regardés" ? 360 : 500}
                          refCard={refCard}
                        >
                          <div
                            style={{
                              position: "relative",
                              height: "100%",
                              width: mobile ? "100%" : "210px",
                              boxShadow: "rgb(0 0 0) 0px 20px 30px -10px",
                              borderRadius: "25px",
                            }}
                          >
                            {genre.newAnime && (
                              <div
                                className="new-anime"
                                style={{ display: "none" }}
                              >
                                <h2>Nouveauté</h2>
                              </div>
                            )}
                            {genre.nouveau_Episode && (
                              <div
                                className="new-ep"
                                style={{ display: "none" }}
                              >
                                <h2>Nouveaux episodes</h2>
                              </div>
                            )}
                            {genres === "Les plus regardés" && (
                              <div className="mostWatched">
                                <h1>{i + 1}</h1>
                              </div>
                            )}
                            <img
                              alt={"carde-anime: " + genre.name}
                              className="posters"
                              style={{
                                height: "100%",
                                width: mobile ? "100%" : "210px",
                              }}
                              src={genre.image && genre.image}
                            />
                            <div style={{position: "absolute", display: "flex", borderRadius: "25px", zIndex: "100", top: "0", background: "black", opacity: "0.6", height: "100%", width: "100%", alignItems: "center", justifyContent: "center"}}>
                              <PlayCircleIcon sx={{height: "70%", width: "70%", color: "white"}}/>
                            </div>
                          </div>
                        </ParallaxHover>
                      </div>
                    </Link>
                  ) : (
                    <div
                      ref={cardContainerRef}
                      key={genre._id + i}
                      className="card-container"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleToggle(genre) +
                        (genres === "Reprendre" &&
                          getCurrentEp(genre._id, genre.links, genre.nextLinks))
                      }
                    >
                      {genre.newAnime && (
                        <div
                          className="new-anime-mobile"
                          style={{ display: mobile ? "" : "none" }}
                        >
                          <h2>Nouveauté</h2>
                        </div>
                      )}
                      {genre.nouveau_Episode && (
                        <div
                          className="new-ep-mobile"
                          style={{ display: mobile ? "" : "none" }}
                        >
                          <h2>Nouveaux episodes</h2>
                        </div>
                      )}
                      <ParallaxHover
                        width={"700"}
                        height={"700"}
                        yRotate={genres === "Les plus regardés" ? 360 : 500}
                        refCard={refCard}
                      >
                        <div
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: mobile ? "100%" : "210px",
                            boxShadow: "rgb(0 0 0) 0px 20px 30px -10px",
                            borderRadius: "25px",
                          }}
                        >
                          {genre.newAnime && (
                            <div
                              className="new-anime"
                              style={{ display: mobile ? "none" : "" }}
                            >
                              <h2>Nouveauté</h2>
                            </div>
                          )}
                          {genre.nouveau_Episode && (
                            <div
                              className="new-ep"
                              style={{ display: mobile ? "none" : "" }}
                            >
                              <h2>Nouveaux episodes</h2>
                            </div>
                          )}
                          {genres === "Les plus regardés" && (
                            <div className="mostWatched">
                              <h1>{i + 1}</h1>
                            </div>
                          )}
                          <img
                            alt={"carde-anime: " + genre.name}
                            className="posters"
                            style={{
                              height: "100%",
                              width: mobile ? "100%" : "210px",
                            }}
                            src={genre.image && genre.image}
                          />
                        </div>
                      </ParallaxHover>
                    </div>
                  )
                )
              : null}
            {!finalPositionScroll.end &&
            withoutDoublon[0][genres].length > 8 ? (
              <Button
                className="scroll-btn"
                ref={scrollRightRef}
                onClick={() => scrollX(1)}
                style={{
                  right: "0",
                  boxShadow:
                    "rgba(255,255,255, 0.4) 5px -5px, rgba(255,255,255, 0.3) 10px -10px, rgba(255,255,255, 0.2) 15px -15px, rgba(255,255,255, 0.1) 20px -20px, rgba(255,255,255, 0.05) 25px -25px",
                  marginRight: genres === "Les plus regardes" ? "28px" : "14px",
                }}
                variant="none"
              >
                <ArrowForwardIosIcon sx={{ fontSize: 60 }} />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
