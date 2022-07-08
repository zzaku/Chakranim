
import { useEffect, useState } from "react"
import { Route, Routes } from 'react-router-dom';
import Navbar from "../Nav/Navbar"
import Found from "./Found/Found";


const Search = ({notAtHome, setNotAtHome, animeToFind, allAnimes}) => {

    const [animeFound, setAnimeFound] = useState([])

    useEffect(() => {
        setAnimeFound(allAnimes.filter(anime => anime.name.toUpperCase().includes(animeToFind.toUpperCase())))
    }, [animeToFind, allAnimes])


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