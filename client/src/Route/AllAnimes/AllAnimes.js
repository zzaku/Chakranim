import { Grid, Card, CardActionArea, CardMedia, Stack, Pagination, Button, Backdrop } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewTwoTone from "@mui/icons-material/ArrowBackIosNewTwoTone";
import ContentAnime from "../../Component/Anime/ContentAnime";
import { useState, useRef, useEffect, useMemo, useContext } from "react"
import { epContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import "./style/AllAnimes.css"


const AllAnimes = ({allAnimes, setNotAtHome}) => {

    let withoutDoublon = [{}] 
    const [nextPage, setNextPage] = useState(1)
    const [animes, setAnimes] = useState([])
    const [anime, setAnime] = useState([]);
    const [animeBySeason, setAnimeBySeason] = useState([])
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    const [descriptionSuite, setDescriptionSuite] = useState(false)
    const [getGenres, setGetGenres] = useState([])
    const genres = useMemo(() => ["S-F", "Action", "Aventure", "Comédie", "Tranche de vie", "Drame", "Fantasy", "Surnaturel", "Mystère", "Shonen", "Psychologique", "Romance"], [])
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    let getAll15Animes = `${process.env.REACT_APP_API_ANIME}/VOD/allanimes?page=${nextPage}`

    const getParam = (parameter) => {
      let params = ""
      for(let i = 0; i < 12; i++){
          if(parameter[0][i]){
              params += `&genre${i+1}=${parameter[0][i]}`
          } else {
              params += `&genre${i+1}=${parameter[0][0]}`
          }
      }
      return params
  }

    useEffect(() => {
        if(anime.desc){
        setDescriptionSuite(anime.desc.split("Acteur")[0].length < 400 ? false : true)
        }
    }, [anime])

    useEffect(() => {
      if(getGenres[0] && getGenres[0].length > 0){
          fetch(`${process.env.REACT_APP_API_ANIME}/VOD/Allanimes/genres?page=${nextPage}&${getParam(getGenres)}`)
          .then(res => res.json())
          .then(datas => setAnimes(datas))
      } else {
          fetch(getAll15Animes)
          .then(res => res.json())
          .then(data => setAnimes(data))
      }
    }, [nextPage, getGenres])

    useEffect(() => {
        if(getGenres[0] && getGenres[0].length > 0){
            setNextPage(1)
        } else {
            setNextPage(1)
        }
    }, [getGenres])

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            handleClose()
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
        setAnime([])
      };

      const handleToggle = (myAnime) => {
        setAnime(myAnime)
        setAnimeBySeason(allAnimes.filter(nameOfAnime => {
            let firstPart = nameOfAnime.name.split(" ")[0].replaceAll("-", " ").replaceAll(".", " ").toUpperCase().toUpperCase()
            let secondPart = nameOfAnime.name.split(" ").length > 1 ? nameOfAnime.name.split(" ")[1].replaceAll("-", " ").replaceAll(".", " ").toUpperCase().toUpperCase() : ""
            let thirdPart = nameOfAnime.name.split(" ").length > 2 ? nameOfAnime.name.split(" ")[2].replaceAll("-", " ").replaceAll(".", " ").toUpperCase().toUpperCase() : ""

            let firstPartToCheck = myAnime.name.split(" ")[0].replaceAll("-", " ").replaceAll(".", " ").toUpperCase().toUpperCase()
            let secondPartToCheck = myAnime.name.split(" ").length > 1 ? myAnime.name.split(" ")[1].replaceAll("-", " ").replaceAll(".", " ").toUpperCase().toUpperCase() : ""
            let thirdPartToCheck = myAnime.name.split(" ").length > 2 ? myAnime.name.split(" ")[2].replaceAll("-", " ").replaceAll(".", " ").toUpperCase().toUpperCase() : ""

            return firstPart + " " + secondPart + " " + thirdPart === firstPartToCheck + " " + secondPartToCheck + " " + thirdPartToCheck
        }))
        setOpen(!open);
      };

    const filterDoublonAnime = () => {
        let newArray = [];
        let uniqueObject = {};

        if(animes){

            for (let anime in animes) {
      
                // Extract the name
                let animeName =  animes[anime]['name'].includes("-") && !animes[anime]['name'].includes("Saison") && !animes[anime]['name'].includes(".") ?
                 animes[anime]['name'].split("OAV")[0].replaceAll("-", " ").toUpperCase() : 
                 animes[anime]['name'].includes("-") && animes[anime]['name'].includes("Saison") && !animes[anime]['name'].includes(".") ? 
                 animes[anime]['name'].split("Saison")[0].replaceAll(".", " ").replaceAll("-", " ").toUpperCase() : 
                 animes[anime]['name'].includes("OAV") && !animes[anime]['name'].includes(".") ? 
                 animes[anime]['name'].split("OAV")[0].toUpperCase() : 
                 animes[anime]['name'].includes("OAV") && animes[anime]['name'].includes(".") ? 
                 animes[anime]['name'].split("OAV")[0].replaceAll(".", " ").toUpperCase() : 
                 animes[anime]['name'].includes("Saison") && !animes[anime]['name'].includes(".") ? 
                 animes[anime]['name'].split("Saison")[0].toUpperCase() : 
                 animes[anime]['name'].includes("Saison") && animes[anime]['name'].includes(".") ? 
                 animes[anime]['name'].split("Saison")[0].replaceAll(".", " ").toUpperCase() : 
                 animes[anime]['name'].includes(".") ? 
                 animes[anime]['name'].replace(".", " ").toUpperCase() : 
                 animes[anime]['name'].includes("!") ? 
                 animes[anime]['name'].replace("!", "").toUpperCase() : 
                 animes[anime]['name'].includes("×") ? 
                 animes[anime]['name'].replace("×", "X").toUpperCase() : 
                 animes[anime]['name'].toUpperCase()

                // Use the name as the index
                uniqueObject[animeName] = animes[anime];
            }

            for (let anime in uniqueObject){
                newArray.push(uniqueObject[anime])
            }
        }
        return newArray 
    }
    withoutDoublon = useMemo(() => filterDoublonAnime(), [animes]) 
    
    return (
        <div className='animes-list'>
            <div className='list-container-anime'>
                <div className="layout-coontainer">
                <div className="pagination-content">
                    <div className="pagination">
                        <Stack spacing={10}>
                            <Pagination value={nextPage} count={68} onChange={(e, value) => setNextPage(value)} variant="outlined" style={{backgroundColor:"white", borderRadius: "15px"}} />
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
                                disableCloseOnSelect={true}
                                getOptionLabel={(option) => option}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props} >
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
                                    <TextField {...params} label="Genres" placeholder="Favorites" />
                                )}
                            />
                            <div className="filter-page">
                                <h3 style={{display: "flex", height: "100%"}}>Page : {nextPage}</h3>
                            </div>
                        </div> 
                    </div>
                    
                    <div className="grid-container">
                        {nextPage === 1 ? 
                        null 
                        : 
                        <div className="previouspage">
                            <Button style={{color: "black"}} onClick={() => setNextPage(nextPage-1)}><ArrowBackIosNewTwoTone style={{backgroundColor:"white", borderRadius: "15px"}} /></Button>
                        </div>
                        }
                            
                            <Backdrop
                                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
                                open={open} 
                                >
                                {anime ? <ContentAnime wrapperRef={wrapperRef} anime={anime} setAnime={setAnime} animeBySeason={animeBySeason} descriptionSuite={descriptionSuite} setDescriptionSuite={setDescriptionSuite} open={open} setOpen={setOpen} setNotAtHome={setNotAtHome} /> : <CircularProgress color="inherit" />}
                            </Backdrop>
                            
                               
                            <Grid className="grid" container spacing={2} padding="2%">
                            {getGenres[0] && getGenres[0].length > 0 ?
                            withoutDoublon.map((anime, i) => {
                                return(
                                        <Grid key={anime._id + i} item xs={4} md={2} onClick={() => handleToggle(anime)}>
                                            <div className="card-content">
                                                <Card sx={{ maxWidth: "auto"}}>
                                                    <CardActionArea >
                                                        <CardMedia
                                                            component="img"
                                                            height="auto"
                                                            image={anime.image}
                                                            alt="green iguana"
                                                        />
                                                    </CardActionArea>
                                                </Card>
                                            </div>         
                                        </Grid>
                                    )
                                })
                            :
                            withoutDoublon.map((anime, i) => {
                                return(
                                        <Grid key={anime._id + i} item xs={4} md={2} onClick={() => handleToggle(anime)}>
                                            <div className="card-content">
                                                <Card sx={{ maxWidth: "auto"}}>
                                                    <CardActionArea >
                                                        <CardMedia
                                                            component="img"
                                                            height="auto"
                                                            image={anime.image}
                                                            alt="green iguana"
                                                        />
                                                    </CardActionArea>
                                                </Card>
                                            </div>
                                        </Grid>
                                    )
                                }) 
                            }
                            </Grid> 
                            {nextPage === 68 ?
                            null
                            :
                            <div className="nextpage">
                                <Button style={{color: "black"}} onClick={() => setNextPage(nextPage+1)}><ArrowForwardIosIcon style={{backgroundColor:"white", borderRadius: "15px"}}/></Button>
                            </div>
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllAnimes