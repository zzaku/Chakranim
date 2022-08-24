import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Stack,
  Pagination,
  Button,
  Backdrop,
  FormControlLabel,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewTwoTone from "@mui/icons-material/ArrowBackIosNewTwoTone";
import ContentAnime from "../../Component/Anime/ContentAnime";
import { useState, useRef, useEffect, useMemo, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import customFetcher from "../../Component/Hooks/useFetch/Fetch/FetchInstance";
import { useMediaQuery } from "@mui/material";
import "./style/AllAnimes.css";
import { epContext } from "../../App";
import ParallaxHover from "../../Component/Home/List/Card/Card";

const AllAnimes = ({ instance, allAnimes, setNotAtHome }) => {
  let withoutDoublon = [{}];
  const [nextPage, setNextPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [animes, setAnimes] = useState([]);
  const [anime, setAnime] = useState([]);
  const [checked, setChecked] = useState(false);
  const [animeBySeason, setAnimeBySeason] = useState([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const loader = useContext(epContext);
  const [descriptionSuite, setDescriptionSuite] = useState(false);
  const [getGenres, setGetGenres] = useState([]);
  const genres = useMemo(
    () => [
      "S-F",
      "Action",
      "Aventure",
      "Comédie",
      "Tranche de vie",
      "Drame",
      "Fantasy",
      "Surnaturel",
      "Mystère",
      "Shonen",
      "Psychologique",
      "Romance",
    ],
    []
  );
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const mobile = useMediaQuery("(max-width:968px)");

  let getAll15Animes = `${process.env.REACT_APP_API_ANIME}/VOD/allanimes?page=${nextPage}`;

  const getParam = (parameter) => {
    let params = "";
    for (let i = 0; i < 12; i++) {
      if (parameter[0][i]) {
        params += `&genre${i + 1}=${parameter[0][i]}`;
      } else {
        params += `&genre${i + 1}=${parameter[0][0]}`;
      }
    }
    return params;
  };

  useEffect(() => {
    if (anime?.desc) {
      setDescriptionSuite(
        anime.desc.split("Acteur")[0].length < 400 ? false : true
      );
    }
  }, [anime]);

  let getByGenre = async () => {
    fetch(
      `${
        process.env.REACT_APP_API_ANIME
      }/VOD/Allanimes/genres?page=${nextPage}${getParam(getGenres)}`
    )
      .then((res) => res.json())
      .then((data) => setAnimes(data));
  };

  let getFilmByGenre = async () => {
    fetch(
      `${
        process.env.REACT_APP_API_ANIME
      }/VOD/animes/type/filmByGenre?page=${nextPage}${getParam(getGenres)}`
    )
      .then((res) => res.json())
      .then((data) => setAnimes(data));
  };

  let getFilm = async () => {
    fetch(
      `${
        process.env.REACT_APP_API_ANIME
      }/VOD/animes/type/film?page=${nextPage}`
    )
      .then((res) => res.json())
      .then((data) => setAnimes(data));
  };

  let getAllByPagination = async () => {
    fetch(getAll15Animes)
      .then((res) => res.json())
      .then((data) => setAnimes(data));
  };

  const getAnimesByFilter = () => {
    if (getGenres[0] && getGenres[0].length > 0 && !checked) {
      getByGenre();          
      fetch(`${
        process.env.REACT_APP_API_ANIME
      }/VOD/Allanimes/genres/count?${getParam(getGenres)}`
      )
      .then((res) => res.json())
      .then((data) => {
        setMaxPage((data/12) > parseInt((data/12).toString().split('.')[0]) ? parseInt((data/12).toString().split('.')[0]) + 1 : parseInt((data/12).toString().split('.')[0]))
      });

    } else if((!getGenres[0] && !checked) || (getGenres?.[0]?.length === 0 && !checked)) {
      getAllByPagination();
            
    fetch(`${
      process.env.REACT_APP_API_ANIME
    }/VOD/Allanimes/count`
    )
    .then((res) => res.json())
    .then((data) => setMaxPage((data/12) > parseInt((data/12).toString().split('.')[0]) ? parseInt((data/12).toString().split('.')[0]) + 1 : parseInt((data/12).toString().split('.')[0])));

    } else if(getGenres[0] && getGenres[0].length > 0 && checked) {
      getFilmByGenre();
            
      fetch(`${
        process.env.REACT_APP_API_ANIME
      }/VOD/animes/type/filmByGenre/count?${getParam(getGenres)}`
      )
      .then((res) => res.json())
      .then((data) => setMaxPage((data/12) > parseInt((data/12).toString().split('.')[0]) ? parseInt((data/12).toString().split('.')[0]) + 1 : parseInt((data/12).toString().split('.')[0])));
    } else if((!getGenres[0] && checked) || (getGenres?.[0]?.length === 0 && checked)) {
      getFilm();
      
      fetch(`${
        process.env.REACT_APP_API_ANIME
      }/VOD/animes/type/film/count`
      )
      .then((res) => res.json())
      .then((data) => setMaxPage((data/12) > parseInt((data/12).toString().split('.')[0]) ? parseInt((data/12).toString().split('.')[0]) + 1 : parseInt((data/12).toString().split('.')[0])));
    }
  } 

  useEffect(() => {
    getAnimesByFilter();
  }, [nextPage, getGenres, getAll15Animes, checked]);

  useEffect(() => {
    if (getGenres[0] && getGenres[0].length > 0) {
      setNextPage(1);
    } else {
      setNextPage(1);
    }
  }, [getGenres, checked]);

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
    setAnimeBySeason([]);
    setAnime([]);
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
        (firstPartToCheck + " " + secondPartToCheck).trim()
      )}`
    )
      .then((res) => res.json())
      .then((data) => setAnimeBySeason(data) + loader.setLoading(false));
    setOpen(!open);
  };

  const filterDoublonAnime = () => {
    let newArray = [];
    let uniqueObject = {};

    if (animes) {
      for (let anime in animes) {
        // Extract the name
        let animeName =
          animes[anime]["name"].includes("-") &&
          !animes[anime]["name"].includes("Saison") &&
          !animes[anime]["name"].includes(".")
            ? animes[anime]["name"]
                .split("OAV")[0]
                .replaceAll("-", " ")
                .toUpperCase()
            : animes[anime]["name"].includes("-") &&
              animes[anime]["name"].includes("Saison") &&
              !animes[anime]["name"].includes(".")
            ? animes[anime]["name"]
                .split("Saison")[0]
                .replaceAll(".", " ")
                .replaceAll("-", " ")
                .toUpperCase()
            : animes[anime]["name"].includes("OAV") &&
              !animes[anime]["name"].includes(".")
            ? animes[anime]["name"].split("OAV")[0].toUpperCase()
            : animes[anime]["name"].includes("OAV") &&
              animes[anime]["name"].includes(".")
            ? animes[anime]["name"]
                .split("OAV")[0]
                .replaceAll(".", " ")
                .toUpperCase()
            : animes[anime]["name"].includes("Saison") &&
              !animes[anime]["name"].includes(".")
            ? animes[anime]["name"].split("Saison")[0].toUpperCase()
            : animes[anime]["name"].includes("Saison") &&
              animes[anime]["name"].includes(".")
            ? animes[anime]["name"]
                .split("Saison")[0]
                .replaceAll(".", " ")
                .toUpperCase()
            : animes[anime]["name"].includes(".")
            ? animes[anime]["name"].replace(".", " ").toUpperCase()
            : animes[anime]["name"].includes("!")
            ? animes[anime]["name"].replace("!", "").toUpperCase()
            : animes[anime]["name"].includes("×")
            ? animes[anime]["name"].replace("×", "X").toUpperCase()
            : animes[anime]["name"].toUpperCase();

        // Use the name as the index
        uniqueObject[animeName] = animes[anime];
      }

      for (let anime in uniqueObject) {
        newArray.push(uniqueObject[anime]);
      }
    }
    return newArray;
  };
  withoutDoublon = filterDoublonAnime();

  return (
    <div className="animes-list">
      <div className="list-container-anime">
        <div className="layout-container">
          <div className="pagination-content">
            <div className="pagination">
              <Stack spacing={10}>
                <Pagination
                  value={nextPage}
                  count={maxPage}
                  onChange={(e, value) => setNextPage(value)}
                  variant="outlined"
                  style={{ backgroundColor: "white", borderRadius: "15px" }}
                />
              </Stack>
            </div>

            <div className="filters">
              <Autocomplete
                className="filter-bar"
                multiple
                id="Genres-tags"
                options={genres}
                value={getGenres[0]}
                selectOnFocus
                clearOnBlur
                onChange={(event, newValue) => setGetGenres([newValue])}
                disableCloseOnSelect={false}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Genres"
                    placeholder="Favorites"
                  />
                )}
              />
              <div className="filter-film">
              <FormControlLabel
                                style={{color: "black", backgroundColor: "transparent", borderRadius: "12px", paddingLeft: "10px", border: `2px black solid`}}
                                value="mode cinéma"
                                control={<Checkbox checked={checked} />}
                                label="FILM"
                                labelPlacement="start"
                                onChange={() => setChecked(checked === true ? false : true)}
                                />
              </div>
              <div className="filter-page">
                <h3 style={{ display: "flex", height: "100%" }}>
                  Page : {nextPage}
                </h3>
              </div>
            </div>
          </div>

          <div className="grid-container">
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 100,
              }}
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
            {nextPage === 1 ? null : (
              <div className="previouspage">
                <Button
                  style={{ color: "black" }}
                  onClick={() => setNextPage(nextPage - 1)}
                >
                  <ArrowBackIosNewTwoTone
                    style={{ backgroundColor: "white", borderRadius: "15px" }}
                  />
                </Button>
              </div>
            )}

            <Grid className="grid-list" container spacing={2} padding="2%">
              {withoutDoublon.map((anime, i) => {
                return (
                  <div
                    className="card-content"
                    onClick={() => handleToggle(anime)}
                    key={anime._id + i}
                  >
                    <ParallaxHover width={"700"} height={"700"} yRotate={360}>
                      <div
                        style={{
                          display: "flex",
                          height: "100%",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {anime.newAnime && (
                          <div
                            className="new-anime2"
                            style={{
                              fontSize: mobile ? "7px" : "",
                              opacity: mobile ? "0.8" : "",
                            }}
                          >
                            <h2 style={{ color: "red" }}>Nouveauté</h2>
                          </div>
                        )}
                        {anime.nouveau_Episode && (
                          <div
                            className="new-ep2"
                            style={{
                              fontSize: mobile ? "7px" : "",
                              opacity: mobile ? "0.8" : "",
                            }}
                          >
                            <h2>Nouveaux episodes</h2>
                          </div>
                        )}
                        <Card
                          sx={{ maxWidth: "auto" }}
                          style={{
                            width: "100%",
                            borderRadius: "25px",
                            border: "3px solid black",
                            boxShadow:
                              "2px 3px 3px 0px rgb(255 255 255 / 88%), 6px 1px 22px 3px black, 4px 0px 150px 10px rgb(24 67 98 / 98%)",
                          }}
                        >
                          <CardActionArea
                            style={{
                              height: "100%",
                              width: "100%",
                              borderRadius: "25px",
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="100%"
                              width="100%"
                              image={anime.image}
                              style={{ borderRadius: "25px" }}
                              alt="green iguana"
                            />
                          </CardActionArea>
                        </Card>
                      </div>
                    </ParallaxHover>
                  </div>
                );
              })}
            </Grid>
            {nextPage === maxPage ? null : (
              <div className="nextpage">
                <Button
                  style={{ color: "black" }}
                  onClick={() => setNextPage(nextPage + 1)}
                >
                  <ArrowForwardIosIcon
                    style={{ backgroundColor: "white", borderRadius: "15px" }}
                  />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAnimes;
