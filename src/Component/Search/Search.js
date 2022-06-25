import { Backdrop } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import ContentAnime from "../Anime/ContentAnime";
import Navbar from "../Nav/Navbar"
import Found from "./Found/Found";
import Footer from "../Footer/Footer";



const Search = ({open, notAtHome, setNotAtHome, startSearching, animeToFind, allAnimes}) => {

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
        <Router>
            <Backdrop 
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
            open={open} 
            >
                {startSearching && <>
                    <Found animeFound={animeFound} setNotAtHome={setNotAtHome} />
                    {/*<Footer footerRef={footerRef} />*/}
                    </>
                }
            
                <Navbar notAtHome={notAtHome} setNotAtHome={setNotAtHome} />
                </Backdrop>
            </Router>
    )
}

export default Search