import { Grid, Card, CardActionArea, CardMedia, Stack, Pagination, Button, Backdrop } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewTwoTone from "@mui/icons-material/ArrowBackIosNewTwoTone";
import ContentAnime from "../../Component/Anime/ContentAnime";
import { useState, useRef, useEffect, useMemo } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import "./style/AllAnimes.css"


const AllAnimes = ({setNotAtHome}) => {

    const [nextPage, setNextPage] = useState(1)
    const [animes, setAnimes] = useState([])
    const [allAnimes, setAllAnimes] = useState([])
    const [anime, setAnime] = useState([]);
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef(null);

    const [getGenres, setGetGenres] = useState([])
    const genres = useMemo(() => ["S-F", "Action", "Aventure", "Comédie", "Tranche de vie", "Drame", "Fantasy", "Surnaturel", "Mystère", "Shonen", "Psychologique", "Romance"], [])
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    let descriptionSuite = anime.desc ? anime.desc.split("Acteur")[0].length < 400 ? false : true : null

    let getAll15Animes = `http://localhost:4000/VOD/allanimes?page=${nextPage}`
    let getAllAnimes = `http://localhost:4000/VOD/allanimes/check`

    useEffect(() => {
        fetch(getAllAnimes)
        .then(res => res.json())
        .then(data => setAllAnimes(data))
    }, [])
    
    useEffect(() => {
        fetch(getAll15Animes)
        .then(res => res.json())
        .then(data => setAnimes(data))
    }, [nextPage])

    const handleClose = () => {
        setOpen(false);
        descriptionSuite = false
      };

      const handleToggle = (myAnime) => {
        setAnime(myAnime)
        setOpen(!open);
      };

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

      useEffect( () => {
        if(getGenres[0] && getGenres[0].length > 0){
            fetch(`http://localhost:4000/VOD/animes/Allgenres?${getParam(getGenres)}`)
            .then(res => res.json())
            .then(datas => setAnimes(datas))
        } else {
            fetch(getAll15Animes)
            .then(res => res.json())
            .then(data => setAnimes(data))
        }
        
    }, [getGenres])


    let lastPage = Math.trunc(allAnimes/15)


    let taille = anime.desc && anime.desc.split("Acteur")[0].length
    let descr = anime.desc && anime.desc.split("Acteur")[0]

    console.log(getGenres)
    
    return (
        <div className='animes-list'>
            <div className='list-container-anime'>
                <div className="layout-coontainer">
                <div className="pagination-content">
                    <div className="pagination">
                        <Stack spacing={10}>
                            {allAnimes.length/15 === Math.trunc(allAnimes.length/15) ? <Pagination value={nextPage} count={lastPage} onChange={(e, value) => setNextPage(value)} variant="outlined" color="primary" /> : <Pagination count={Math.trunc(allAnimes.length/15) + 1} onChange={(e, value) => setNextPage(value)} variant="outlined" color="primary" />}
                        </Stack>
                    </div>
                        <div className="filters">
                            <Autocomplete
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
                        </div> 
                    </div>
                    
                    <div className="grid-container">
                        <Grid container spacing={4} padding="2%">
                            <div className="previouspage">
                                <Button style={{color: "black"}} onClick={() => setNextPage(nextPage-1)}><ArrowBackIosNewTwoTone /></Button>
                            </div>
                            <Backdrop
                                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
                                open={open} 
                                >
                                {anime ? <ContentAnime wrapperRef={wrapperRef} anime={anime} descriptionSuite={descriptionSuite} setOpen={setOpen} setNotAtHome={setNotAtHome} /> : <CircularProgress color="inherit" />}
                            </Backdrop>
                            {animes.map(anime => {
                                return(
                                    <>
                                        <Grid item xs={3} md={2.4} onClick={() => handleToggle(anime)}>
                                            <Card sx={{ maxWidth: "auto"}}>
                                                <CardActionArea >
                                                    <CardMedia
                                                        component="img"
                                                        height="410"
                                                        image={anime.image}
                                                        alt="green iguana"
                                                    />
                                                    
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </>
                                    )
                                })   
                            }    
                            <div className="nextpage">
                                <Button style={{color: "black"}} onClick={() => setNextPage(nextPage+1)}><ArrowForwardIosIcon /></Button>
                            </div>
                        </Grid>
                    </div>
                    <div className="pagination">
                        <Stack spacing={10}>
                            {allAnimes.length/15 === Math.trunc(allAnimes.length/15) ? <Pagination count={lastPage} onChange={(e, value) => setNextPage(value)} variant="outlined" color="primary" /> : <Pagination count={Math.trunc(allAnimes.length/15) + 1} onChange={(e, value) => setNextPage(value)} variant="outlined" color="primary" />}
                        </Stack>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default AllAnimes