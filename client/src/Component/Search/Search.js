
import { useEffect, useState } from "react"
import { Route, Routes } from 'react-router-dom';
import Navbar from "../Nav/Navbar"
import Found from "./Found/Found";


const Search = ({notAtHome, setNotAtHome, animeFound}) => {


    return (
        <>
                <Routes>
                    <Route path='/Search/Animes' element={<Found animeFound={animeFound} setNotAtHome={setNotAtHome} />} />
                </Routes>
                
                
            
                <Navbar notAtHome={notAtHome} setNotAtHome={setNotAtHome} />
          </>   
    )
}

export default Search