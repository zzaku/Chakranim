import { Backdrop } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import ContentAnime from "../Anime/ContentAnime";
import Navbar from "../Nav/Navbar"
import Found from "./Found/Found";
import { useNavigate } from "react-router-dom";


const Search = ({open, notAtHome, setNotAtHome, animeToFind, allAnimes}) => {

    const [animeFound, setAnimeFound] = useState([])
    const footerRef = useRef()
  

    useEffect(() => {
        setAnimeFound(allAnimes.filter(anime => anime.name.toUpperCase().includes(animeToFind.toUpperCase())))
    }, [animeToFind])

    useEffect(() => {
        if(footerRef.current){
           footerRef.current.style.bottom = 0 
        } 
    }, [footerRef.current])
   

    return (
        <>
           
                <Routes>
                    <Route path='/Search/Animes' element={<Found allAnimes={allAnimes} animeFound={animeFound} setNotAtHome={setNotAtHome} />} />
                    {/*<Footer footerRef={footerRef} />*/}
                </Routes>
                
                
            
                <Navbar notAtHome={notAtHome} setNotAtHome={setNotAtHome} />
          </>   
    )
}

export default Search