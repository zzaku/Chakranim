import Grid from '@mui/material/Grid';
import NavigateNextTwoToneIcon from '@mui/icons-material/NavigateNextTwoTone';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ContentAnime from '../../Anime/ContentAnime';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import ParallaxHover from './Card/Card';
import "./style/List.css"

const List = ({genre, setGenre, animeFiltered, setAnimeFiltered, genres, page, setPage}) =>{

    let withoutDoublon = [{}] 
    const wrapperRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [anime, setAnime] = useState(null);
    const [descriptionSuite, setDescriptionSuite] = useState(anime ? anime.desc.split("Acteur")[0].length < 200 ? true : false : null)

    let categorie = genres.includes("é") ? genres.replace("é", "e")
        : genres.includes("è") ? genres.replaceAll("è", "e")
        : genres.includes(" ") ? genres.replaceAll(" ", "_") 
        : genres.includes("-") ? genres.replaceAll("-", "_") 
        : genres

    let DisplayAllCategory =  categorie.includes("_") ? categorie.replaceAll("_", " ") 
    : categorie.includes("-") ? categorie.replaceAll("-", " ") 
    : categorie

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

    const filterDoublonAnime = () => {
        let newArray = [];
        let uniqueObject = {};

        if(genre[0][genres]){

            for (let anime in genre[0][genres]) {
      
                // Extract the name
                let animeName = genre[0][genres][anime]['name'];
      
                // Use the name as the index
                uniqueObject[animeName] = genre[0][genres][anime];
            }

            for (let anime in uniqueObject){
                newArray.push(uniqueObject[anime])
            }
        }
        return newArray 
    }
    withoutDoublon = [{[genres]: filterDoublonAnime()}]

    const nextPageByCategory = (cat) => {
        if(cat === genres){
            setPage({...page, [categorie]: page[categorie]+1})
        }
    }

    const previousPageByCategory = (cat) => {
        if(cat === genres){
            setPage({...page, [categorie]: page[categorie]-1})
        }
    }

    const displayPreviousButton = (cat) => {
        if(cat === genres){
            return page[categorie] > 1 ? <Button onClick={() => previousPageByCategory(genres)} style={{position: "absolute", height: "38%", left: 0, backgroundColor: "black", zIndex: 2, marginLeft: "15px", opacity: 0.7}} variant='text'><ArrowBackIosNewTwoToneIcon /></Button> : null
        }
    }

    const handleClose = () => {
        setOpen(false);
        setDescriptionSuite(false)
      };

      const handleToggle = (myAnime) => {
        setAnime(myAnime)
        setOpen(!open);
      };

    const displayNextButton = (cat) => {
        if(cat === genres){
            if(genre[0][Object.keys(genre[0])[0]]){
                if(genre[0][Object.keys(genre[0])[0]].length < 9){
            
                } else {
                    return <Button onClick={() => nextPageByCategory(genres)} style={{position: "absolute", height: "38%", right: 0, backgroundColor: "black", zIndex: 2, marginRight: "15px", opacity: 0.7}} variant='text'><NavigateNextTwoToneIcon /></Button>
                }
            }
        }
    }

    
    
    console.log(anime)

    return (
      <div className="card">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
          open={open}
          
        >
          {anime ? <ContentAnime wrapperRef={wrapperRef} anime={anime} descriptionSuite={descriptionSuite} setDescriptionSuite={setDescriptionSuite} /> : (
            <CircularProgress color="inherit" />
          )}
        </Backdrop>
        <Grid width={"100%"} height={"100%"}>
          <div className="grid-container" >
            <h1>{DisplayAllCategory}</h1>
            <div className="list-card">
              {displayPreviousButton(genres)}
              {withoutDoublon[0][genres]
                ? withoutDoublon[0][genres].map((genre) => (
                    <div
                      className="card-container"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleToggle(genre)}
                    >
                      <ParallaxHover width={"700"} height={"700"}>
                        <img
                          alt={"carde-anime: " + genre.name}
                          className="posters"
                          style={{ height: "100%", width: "100%" }}
                          src={genre.image}
                        />
                      </ParallaxHover>
                    </div>
                  ))
                : genre.map((genre) => (
                    <div
                      className="card-container"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleToggle(genre)}
                    >
                      <ParallaxHover width={"700"} height={"700"}>
                        <img
                          alt={"carde-anime: " + genre.name}
                          className="posters"
                          style={{ height: "100%", width: "100%" }}
                          src={genre.image}
                        />
                      </ParallaxHover>
                    </div>
                  ))}
              {displayNextButton(genres)}
            </div>
          </div>
        </Grid>
      </div>
    );
}

export default List