import "./style/Extrait.css"
import { useRef, useState } from "react"
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import extrait from './assets/extrait.mp4'
import { isSafari } from "react-device-detect";

const Extrait = () => {

    const [son, setSon] = useState(true)
    const playerRef = useRef()
    if(playerRef.current){
       
        playerRef.current.playbackRate = 2
    } 
    
    
    return (
        <div className="extrait-video">
            <video  height={isSafari ? "300px" : "1500px"} width="100%" ref={playerRef} loop={true} autoPlay={true} playsInline={true} muted={son}>
                <source src={extrait} type="video/mp4" />
            </video>
             <Button variant="outlined" className="muteButton" onClick={() => setSon(son === true ? false : true)} style={{borderRadius: "50%", border: "1px solid", color:"white", width: "50px", position: "absolute", height: "50px", zIndex: "2", opacity: "1"}}>{son ? <VolumeOffIcon /> : <VolumeUpIcon />}</Button >
        </div>
    )
}

export default Extrait