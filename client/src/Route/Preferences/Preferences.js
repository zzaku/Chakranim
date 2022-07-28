import "./style/Preferences.css"
import Fav from "./Fav/Fav"
import ToWatchLater from "./ToWatchLater/ToWatchLater"
import { useState } from "react"
import { Button } from "@mui/material"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { useAuth } from "../../Component/Context/AuthContext"
import { useEffect } from "react"

const Preferences = () => {

    const [selected, setSelected] = useState('')

    return (
      <div className="preferences-container">
        <div className="select-container">
            <div className="info">
                <div className="title">
                    <h1>Ma liste</h1>
                </div>
                <div className="description">
                    <h2>Vous retrouverez ici les animés que vous avez aimé !</h2>
                </div>
            </div>
            <div className="select-wrapper">
                <div className="selector-btn">
                    <Button variant="contained" color="inherit" onClick={() => setSelected("fav")} ><BookmarkIcon /><h3>Fav</h3></Button>
                    <Button variant="contained" color="inherit" onClick={() => setSelected("to_watch_later")} ><AddToQueueIcon /><h3>regarder plus tard</h3></Button>
                </div>
                {selected === "fav" ? (
                <Fav />
                ) : (
                selected === "to_watch_later" && <ToWatchLater />
                )}  
            </div>
        </div>
        
      </div>
    );
}

export default Preferences