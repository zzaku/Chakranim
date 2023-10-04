import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../../../../../Component/Context/SocketContext";
import PlayerControls from "./PlayerControls/PlayerControls";
import screenFull from "screenfull"
import { isOpera } from "react-device-detect";
import "./style/VodPlayer.css"
import { epContext } from "../../../../../App";
import { useAuth } from "../../../../../Component/Context/AuthContext";

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


const VodPlayer = ({playerContainerRef, chatRef, tokenRef}) => {

    const {videoRef} = useSocket()

    const [timeDisplay, setTimeDisplay] = useState("normal")

    const [screenFulls, setScreenFull] = useState(false)

    const {playingState, setPlayingState, indexVod, setIndexVod, canceled, setCanceled} = useSocket()
    const { currentUser } = useAuth()

    const {playing, muted, volume, playbackRate, played, seeking} = playingState

    const controlsRef = useRef(null)
    
    const overlayContainerRef = useRef(null)

    const [count, setCount] = useState(0)
    const [secondeBeforeNextVod, setSecondeBeforeNextVod] = useState(10)
    const [showNextVod, setShowNextVod] = useState(false)

    const vod = useContext(epContext)

    const handlePlayPause = () => {
        setPlayingState({...playingState, playing: !playingState.playing})
        setCount(-1)
    }

    const handleRewind = () => {
        videoRef.current.seekTo(videoRef.current.getCurrentTime() - 10)
        setCount(-1)
    }

    const handleFastForward = () => {
        videoRef.current.seekTo(videoRef.current.getCurrentTime() + 10)
        setCount(-1)
    }
     
    const handleMute = () => {
        setPlayingState({...playingState, muted: !playingState.muted})
        setCount(-1)
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

        if(canceled){
            setShowNextVod(false)
        } else {
            if(vod.urlVod.length > 1 && currentVod("position") !== vod.urlVod.length - 1){
    
                if(played > 0.90){      
                    setShowNextVod(true)
                    setSecondeBeforeNextVod(current => current - 1)
    
                    if(secondeBeforeNextVod === 1 && currentUser.Room?.[0]?.host){
                        setIndexVod(current => current + 1)
                    }
                }
            }
        }

        if(count > 0){
            controlsRef.current.style.visibility = 'hidden'
            document.body.style.cursor = 'none'
            chatRef.current.style.cursor = 'default'
            tokenRef.current.style.cursor = 'default'
            setCount(0)
        }
        
        if(controlsRef.current.style.visibility === 'visible' && controlsRef.current.style.cursor === 'default'){
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
        controlsRef.current.style.cursor = 'default';
        document.body.style.cursor = 'default';
        setCount(0)
    }
    
    const previousVod = () => {
        setIndexVod(current => current - 1)
    }
    
    const nextVod = () => {
        setIndexVod(current => current + 1)
    }
    
    const currentVod = (option) => {
        let current_vod = vod.urlVod.filter(elem => elem.position === indexVod)
        let current_vod_url = current_vod?.[0]?.url
        let current_vod_title = current_vod?.[0]?.title
        let current_vod_position = current_vod?.[0]?.position
        if(option === "url"){
            return current_vod_url
        } else if(option === "title"){
            return current_vod_title
        } else if(option === "position"){
            return current_vod_position
        }
    }
    
    useEffect(() => {
        setCanceled(false)
        setPlayingState({...playingState, played: 0})
        setShowNextVod(false)
        setSecondeBeforeNextVod(10)
    }, [indexVod])
    
    const currentTime = videoRef.current ? videoRef.current.getCurrentTime() : "00:00"
    const duration = videoRef.current ? videoRef.current.getDuration() : "00:00"
    const elapsedTime = timeDisplay === "normal" ? format(currentTime) : `-${format(duration - currentTime)}`
    const totalDuration = format(duration)

    return (
        <div style={{display: "flex", position: "relative", height: "100%", width: "100%"}} ref={overlayContainerRef} onMouseMove={handleMouseMouve}>
            <ReactPlayer  
            style={{objectFit: "none"}}
            muted={muted}
            height={screenFulls ? "100%" : (isOpera ? 845 : 864)}
            width={screenFulls ? "100%" : 2000} 
            ref={videoRef}
            playing={playing}
            volume={volume}
            url={currentVod("url")} 
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
            previousVod={previousVod}
            nextVod={nextVod}
            currentVod={currentVod}
            showNextVod={showNextVod}
            secondeBeforeNextVod={secondeBeforeNextVod}
            setCanceled={setCanceled}
            setCount={setCount}
            />
            
        </div>
    )
}

export default VodPlayer