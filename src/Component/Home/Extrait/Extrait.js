import "./style/Extrait.css"
import ReactPlayer from "react-player";
import { useRef, useState } from "react"
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Player, ControlBar  } from 'video-react';
import extrait from './assets/extrait.mp4'

const Extrait = () => {

    const [son, setSon] = useState(true)
    const playerRef = useRef()
    if(playerRef.current){
        playerRef.current.manager.rootElement.style.paddingTop = 0
        playerRef.current.playbackRate = 2
    } 
    
    
    return (
        <div className="extrait-video">
             <Player height={"90vh"} ref={playerRef} fluid={false} autoPlay={true} loop={true} url="https://www.youtube.com/watch?v=p4A4rklgKtw"  muted={son}>
                <source src={extrait} />
                <ControlBar autoHide={true} disableCompletely={true} />
            </Player>
             <Button variant="outlined" className="muteButton" onClick={() => setSon(son === son ? !son : son)} style={{borderRadius: "50%", color:"white", width: "50px", position: "absolute", height: "50px", zIndex: "2", opacity: "1"}}>{son ? <VolumeOffIcon /> : <VolumeUpIcon />}</Button >
        </div>
    )
}

export default Extrait