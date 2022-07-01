import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ContentAnime from '../../Anime/ContentAnime';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import ParallaxHover from './Card/Card';
import "./style/List.css"


const List = ({allAnimes, genre, genres, setNotAtHome}) =>{

    let withoutDoublon = [{}] 
    const wrapperRef = useRef(null);
    const cardListRef = useRef(null);
    const scrollRightRef = useRef(null);
    const scrollLeftRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [anime, setAnime] = useState(null);
    const [descriptionSuite, setDescriptionSuite] = useState(false)
    const [animeBySeason, setAnimeBySeason] = useState([])
    const refCard = useRef()

    let categorie = genres.includes("é") ? genres.replace("é", "e")
        : genres.includes("è") ? genres.replaceAll("è", "e")
        : genres.includes(" ") ? genres.replaceAll(" ", "_") 
        : genres.includes("-") ? genres.replaceAll("-", "_") 
        : genres

    let DisplayAllCategory =  categorie.includes("_") ? categorie.replaceAll("_", " ") 
    : categorie.includes("-") ? categorie.replaceAll("-", " ") 
    : categorie

    useEffect(() => {
      if(anime){
        setDescriptionSuite(anime.desc.split("Acteur")[0].length < 400 ? false : true)
        console.log(anime.desc.split("Acteur")[0].length)
      }
    }, [anime])

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
                let animeName = genre[0][genres][anime]['name'].includes("×") ? genre[0][genres][anime]['name'].replace("×", "X").toUpperCase() : genre[0][genres][anime]['name'].toUpperCase();

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

    const handleClose = () => {
        setOpen(false);
        setDescriptionSuite(false)
        setAnime(null)
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
        setOpen(true);
      };

      let currentScrollPosition = 0
      let scrollAmount = 320

      let sCont = cardListRef
      let hScroll = scrollRightRef
      
      //let maxScroll = -sCont.current.offsetWidth + hScroll.current.offsetWidth
      //console.log(maxScroll)


      const scrollX = (val) => {
          currentScrollPosition += (val * scrollAmount)
          sCont.current.style.scrollLeft = currentScrollPosition + "px"
          console.log(sCont.current.style.scrollLeft)
      }

    const displayPreviousButton = (cat) => {
        if(cat === genres){
            return 2 > 1 ? <Button ref={scrollRightRef} onClick={() => scrollX(-1)} style={{position: "absolute", height: "38%", left: "3.2rem", color: "white", background: "linear-gradient(90deg,rgba(0,0,0,.8),transparent)", zIndex: 2, marginLeft: "15px"}} variant='text'><ArrowBackIosNewTwoToneIcon sx={{ fontSize: 60 }} /></Button> : null
        }
    }


    const displayNextButton = (cat) => {
        if(cat === genres){
            if(genre[0][Object.keys(genre[0])[0]]){
                if(genre[0][Object.keys(genre[0])[0]].length < 9){
            
                } else {
                    return <Button ref={scrollLeftRef} onClick={() => scrollX(1)} style={{position: "absolute", height: "38%", right: "1.1rem", color: "white", background: "linear-gradient(90deg,transparent,rgba(0,0,0,.8))", zIndex: 2, marginRight: "15px"}} variant='text'><ArrowForwardIosIcon sx={{ fontSize: 60 }} /></Button>
                }
            }
        }
    }

    return (
      <div className="card">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
          open={open} 
        >
          {anime ? <ContentAnime wrapperRef={wrapperRef} anime={anime} setAnime={setAnime} animeBySeason={animeBySeason} descriptionSuite={descriptionSuite} setDescriptionSuite={setDescriptionSuite} setOpen={setOpen} setNotAtHome={setNotAtHome} /> : <CircularProgress color="inherit" />}
        </Backdrop>
          <div className="grid-container" >
            <h1>{DisplayAllCategory}</h1>
            <div className="list-card snaps-inline" ref={cardListRef}>
              {displayPreviousButton(genres)}
              {withoutDoublon[0][genres]
                ? withoutDoublon[0][genres].map((genre) => (
                    <div
                      key={genre._id}
                      className="card-container"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleToggle(genre)}
                    >
                      <ParallaxHover width={"700"} height={"700"} refCard={refCard} >
                        <img
                          alt={"carde-anime: " + genre.name}
                          className="posters"
                          style={{ height: "100%", width: "100%" }}
                          src={genre.image && genre.image}
                        />
                      </ParallaxHover>
                    </div>
                  ))
                : 
                null}
              {displayNextButton(genres)}
            </div>
          </div>
      </div>
    );
}

export default List