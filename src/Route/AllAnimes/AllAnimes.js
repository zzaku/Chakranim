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

    let withoutDoublon = [{}] 
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
            fetch(`http://localhost:4000/VOD/Allanimes/genres?${getParam(getGenres)}`)
            .then(res => res.json())
            .then(datas => setAnimes(datas))
        } else {
            fetch(getAll15Animes)
            .then(res => res.json())
            .then(data => setAnimes(data))
        }
        
    }, [getGenres])

    const filterDoublonAnime = () => {
        let newArray = [];
        let uniqueObject = {};

        if(animes){

            for (let anime in animes) {
      
                // Extract the name
                let animeName = animes[anime]['name'].includes("×") ? animes[anime]['name'].replace("×", "X").toUpperCase() : animes[anime]['name'].toUpperCase();

                // Use the name as the index
                uniqueObject[animeName] = animes[anime];
            }

            for (let anime in uniqueObject){
                newArray.push(uniqueObject[anime])
            }
        }
        return newArray 
    }
    withoutDoublon = filterDoublonAnime()


    let lastPage = Math.trunc(allAnimes/15)


    let taille = anime.desc && anime.desc.split("Acteur")[0].length
    let descr = anime.desc && anime.desc.split("Acteur")[0]

    console.log(animes)
    
    return (
        <div className='animes-list'>
            <div className='list-container-anime'>
                <div className="layout-coontainer">
                <div className="pagination-content">
                {!getGenres[0] || getGenres[0].length < 1 ? 
                    <div className="pagination">
                        <Stack spacing={10}>
                            {allAnimes.length/15 === Math.trunc(allAnimes.length/15) ? <Pagination value={nextPage} count={lastPage} onChange={(e, value) => setNextPage(value)} variant="outlined" style={{backgroundColor:"white", borderRadius: "15px"}} /> : <Pagination count={Math.trunc(allAnimes.length/15) + 1} onChange={(e, value) => setNextPage(value)} variant="outlined" style={{backgroundColor:"white", borderRadius: "15px"}} />}
                        </Stack>
                    </div>
                    : 
                     null}
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
                        {!getGenres[0] || getGenres[0].length < 1 ?
                            <div className="previouspage">
                                <Button style={{color: "black"}} onClick={() => setNextPage(nextPage-1)}><ArrowBackIosNewTwoTone style={{backgroundColor:"white", borderRadius: "15px"}} /></Button>
                            </div>
                        :
                        null}
                            <Backdrop
                                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
                                open={open} 
                                >
                                {anime ? <ContentAnime wrapperRef={wrapperRef} anime={anime} descriptionSuite={descriptionSuite} setOpen={setOpen} setNotAtHome={setNotAtHome} /> : <CircularProgress color="inherit" />}
                            </Backdrop>
                            {getGenres[0] && getGenres[0].length > 0 ?
                                <div className="container-layout">
                                    {withoutDoublon.map(anime => {
                                        return(
                                                <div className="card-content" onClick={() => handleToggle(anime)}>
                                                    <img style={{height: "100%", width: "100%"}} src={anime.image} alt={anime.name}/>
                                                </div>
                                            )
                                        })
                                    } 
                                </div>
                            :
                            <Grid className="grid" container spacing={2} padding="2%">
                            {withoutDoublon.map(anime => {
                                return(
                                    <>
                                        <Grid item xs={4} md={2} onClick={() => handleToggle(anime)}>
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
                                    </>
                                    )
                                }) 
                            } 
                                </Grid> 
                            }
                            {!getGenres[0] || getGenres[0].length < 1 ?
                            <div className="nextpage">
                                <Button style={{color: "black"}} onClick={() => setNextPage(nextPage+1)}><ArrowForwardIosIcon style={{backgroundColor:"white", borderRadius: "15px"}}/></Button>
                            </div>
                            :
                            null}
                    </div>
                    {getGenres[0] && getGenres[0].length <= 0 ?
                    <div className="pagination">
                        <Stack spacing={10}>
                             {allAnimes.length/15 === Math.trunc(allAnimes.length/15) ? <Pagination count={lastPage} onChange={(e, value) => setNextPage(value)} variant="outlined" style={{backgroundColor:"white", borderRadius: "15px"}} /> : <Pagination count={Math.trunc(allAnimes.length/15) + 1} onChange={(e, value) => setNextPage(value)} variant="outlined" style={{backgroundColor:"white", borderRadius: "15px"}} />} 
                        </Stack>
                    </div> 
                    : 
                    null}
                </div>
            </div>
        </div>
    )
}

export default AllAnimes