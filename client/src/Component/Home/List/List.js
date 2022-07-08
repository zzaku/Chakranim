import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ContentAnime from '../../Anime/ContentAnime';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import ParallaxHover from './Card/Card';
import goku from './Neon/assets/kamea.gif'
import jiren from './Neon/assets/jiren.gif'
import tpGoku from './Neon/assets/tpGoku.gif'
import songoku from './Neon/assets/songoku.gif'
import { parseGIF, decompressFrames  } from 'gifuct-js';
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
    const cardContainerRef = useRef()
    const neonContainerRef = useRef()
    const gokuRef = useRef()
    const jirenRef = useRef()

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
      }
    }, [anime])

    
    
    useEffect(() => {
      
      let sumDelay1
      let sumDelay2
      
      fetch(goku)
      .then(res => res.arrayBuffer())
      .then(buff => parseGIF(buff))
      .then(gif => {
        sumDelay1 = displayGifOneTime(decompressFrames(gif, true));
        if(sumDelay1 > 0){
          setTimeout(() => {
            fetch(tpGoku)
            .then(res => res.arrayBuffer())
            .then(buff => parseGIF(buff))
            .then(gif => {
              sumDelay2 = displayGifOneTime(decompressFrames(gif, true));
              if(sumDelay2 > 0 && gokuRef.current){
                  gokuRef.current.src = tpGoku;
                  gokuRef.current.style.height = "auto";
                  gokuRef.current.style.width = "auto";
                  setTimeout(() => {
                    gokuRef.current.src = songoku;
                }, sumDelay2-100);
              }
              })
        }, sumDelay1);   
      }

      })
    }, [gokuRef])

    const displayGifOneTime = (array) => {
      if(array[0]){
        let sumDelay = array.map(frame => frame.delay).reduce((a, b) => a + b)
        return sumDelay
      }
    }

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

      const [finalPositionScroll, setFinalPositionScroll] = useState({start: true, end: false})
      const [currentPose, setCurrentPose] = useState(0)
      
      const scrollX = (val) => {
        let currentScrollPosition = 0;
        let scrollAmount = cardContainerRef.current && cardContainerRef.current.scrollWidth * 7
        let maxScroll = cardListRef.current ? cardListRef.current.scrollWidth : null
        currentScrollPosition = finalPositionScroll.start && !finalPositionScroll.end ? 0 : currentPose 
        currentScrollPosition += val * scrollAmount
        setCurrentPose(currentScrollPosition)
        if(currentScrollPosition >= maxScroll - scrollAmount){
          currentScrollPosition = maxScroll
          setFinalPositionScroll({start: false, end: true})
        } else if(currentScrollPosition <= 0){
          currentScrollPosition = 0
          setFinalPositionScroll({start: true, end: false})
        } else {
          setFinalPositionScroll({start: false, end: false})
        }
          cardListRef.current.scrollLeft = currentScrollPosition
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
            <div ref={neonContainerRef} className='grid-list-container'>
              <div className='animation'>
                <div className='animation-gif'>
                <img alt="goku" ref={gokuRef} style={{display: "flex", height: "auto", width: "auto"}} src={goku} />
                <img alt="jiren" ref={jirenRef} style={{display: "flex", height: "auto", width: "auto", WebkitTransform: "scaleX(-1)"}} src={jiren} />
              </div>
              </div>
                <div className="list-card" ref={cardListRef}>
                  {!finalPositionScroll.start ? <Button className='scroll-btn' ref={scrollLeftRef} onClick={() => scrollX(-1)} style={{left: "3.2rem", boxShadow: "rgba(255,255,255, 0.4) -5px 5px, rgba(255,255,255, 0.3) -10px 10px, rgba(255,255,255, 0.2) -15px 15px, rgba(255,255,255, 0.1) -20px 20px, rgba(255,255,255, 0.05) -25px 25px", marginLeft: "3%"}} variant='text'><ArrowBackIosNewTwoToneIcon sx={{ fontSize: 60 }} /></Button> : null}
                  {withoutDoublon[0][genres]
                    ? withoutDoublon[0][genres].map((genre, i) => (
                        <div
                          ref={cardContainerRef}
                          key={genre._id + i}
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
                  {!finalPositionScroll.end ? <Button className='scroll-btn' ref={scrollRightRef} onClick={() => scrollX(1)} style={{right: "0", boxShadow: "rgba(255,255,255, 0.4) 5px -5px, rgba(255,255,255, 0.3) 10px -10px, rgba(255,255,255, 0.2) 15px -15px, rgba(255,255,255, 0.1) 20px -20px, rgba(255,255,255, 0.05) 25px -25px", marginRight: "14px"}} variant='none'><ArrowForwardIosIcon sx={{ fontSize: 60 }} /></Button> : null}
                </div>
              </div>
          </div>
      </div>
    );
}

export default List