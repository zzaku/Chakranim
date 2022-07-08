import "./style/Extrait.css"
import { useRef, useState } from "react"
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ReactPlayer from 'react-player'
import extrait from './assets/extrait.mp4'

const Extrait = () => {

    const [son, setSon] = useState(true)
    const playerRef = useRef()
    if(playerRef.current){
       
        playerRef.current.playbackRate = 2
    } 
    
    
    return (
        <div className="extrait-video">
             <video  height="1500px" width="100%" ref={playerRef} autoPlay={true} loop={true} src={extrait}  muted={son} />
             <Button variant="outlined" className="muteButton" onClick={() => setSon(son === son ? !son : son)} style={{borderRadius: "50%", border: "1px solid", color:"white", width: "50px", position: "absolute", height: "50px", zIndex: "2", opacity: "1"}}>{son ? <VolumeOffIcon /> : <VolumeUpIcon />}</Button >
        </div>
    )
}

export default Extrait