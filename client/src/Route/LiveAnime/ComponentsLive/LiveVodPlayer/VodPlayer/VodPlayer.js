import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../../../../../Component/Context/SocketContext";
import extrait from '../assets/extrait.mp4'
import extrait2 from '../assets/extrait.mp4'
import PlayerControls from "./PlayerControls/PlayerControls";
import screenFull from "screenfull"
import { isOpera } from "react-device-detect";
import "./style/VodPlayer.css"

const format = (second) => {
    if(isNaN(second)){
        return "00:00"
    }
    const date = new Date(second * 1000);
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, "0")
    if(hh){
        return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
    }

    return `${mm}:${ss}`
}


const VodPlayer = ({playerContainerRef}) => {

    const {videoRef} = useSocket()

    const [timeDisplay, setTimeDisplay] = useState("normal")

    const [screenFulls, setScreenFull] = useState(false)

    const {playingState, setPlayingState, urlVod} = useSocket()

    const {playing, muted, volume, playbackRate, played, seeking} = playingState

    const controlsRef = useRef(null)
    
    const overlayContainerRef = useRef(null)

    const [count, setCount] = useState(0)

    const handlePlayPause = () => {
        setPlayingState({...playingState, playing: !playingState.playing})
    }

    const handleRewind = () => {
        videoRef.current.seekTo(videoRef.current.getCurrentTime() - 10)
    }

    const handleFastForward = () => {
        videoRef.current.seekTo(videoRef.current.getCurrentTime() + 10)
    }
     
    const handleMute = () => {
        setPlayingState({...playingState, muted: !playingState.muted})
    }

    const handleVolumeSeekUp = (e, newValue) => {
        setPlayingState({...playingState, volume: parseFloat(newValue/100), muted: newValue === 0 ? true : false})
    }

    const handleVolumeSeekDown = (e, newValue) => {
        setPlayingState({...playingState, volume: parseFloat(newValue/100), muted: newValue === 0 ? true : false})
    }

    const handlePlaybackRate = (rate) => {
        setPlayingState({...playingState, playbackRate: rate})
    }

    const toggleFullScreen = () => {
        setScreenFull(!screenFulls)
        screenFull.toggle(playerContainerRef.current)
    }

    const handleProgress = (changeState) => {

        if(count > 0){
            controlsRef.current.style.visibility = 'hidden'
            setCount(0)
        }
        
        if(controlsRef.current.style.visibility === 'visible'){
            setCount(current => current + 1)
        }
        
        if(!seeking){
            setPlayingState({...playingState,  ...changeState})
        }
    }
    
    const handleSeekChange = (e, newValue) => {
    }
    
    const handleSeekMouseDown = (e) => {
        setPlayingState({...playingState,  seeking: true})
    }
    
    const handleSeekMouseUp = (e, newValue) => {
        setPlayingState({...playingState,  seeking: false, currentPosition: newValue})
        videoRef.current.seekTo(newValue / 100)
    }
    
    const handleChangeDisplayFormat = () => {
        setTimeDisplay(timeDisplay === 'normal' ? 'remaining' : 'normal')
    }
    
    const handleMouseMouve = () => {
        controlsRef.current.style.visibility = "visible";
        setCount(0)
    }
    
    const currentTime = videoRef.current ? videoRef.current.getCurrentTime() : "00:00"
    const duration = videoRef.current ? videoRef.current.getDuration() : "00:00"
    const elapsedTime = timeDisplay === "normal" ? format(currentTime) : `-${format(duration - currentTime)}`
    const totalDuration = format(duration)

    return (
        <div style={{display: "flex", position: "relative", height: "100%", width: "100%"}} ref={overlayContainerRef} onMouseMove={handleMouseMouve}>
            <ReactPlayer  
            style={{objectFit: "none"}} 
            muted={muted} 
            height={screenFulls ? "100%" : (isOpera ? 848 : 867)}
            width={screenFulls ? "100%" : 2000} 
            ref={videoRef}
            playing={playing}
            volume={volume}
            url={urlVod} 
            playbackRate={playbackRate}
            onProgress={handleProgress}
            />

            <PlayerControls
            ref={controlsRef}
            onPlayPause={handlePlayPause}
            playing={playing}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            muted={muted}
            onMute={handleMute}
            onVolumeSeekUp={handleVolumeSeekUp}
            onVolumeSeekDown={handleVolumeSeekDown}
            volume={volume}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
            onChangeDisplayFormat={handleChangeDisplayFormat}
            screenFull={screenFulls}
            />
            
        </div>
    )
}

export default VodPlayer