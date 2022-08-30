import { async } from "@firebase/util"
import { Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useAuth } from "../../../../Component/Context/AuthContext"
import { useSocket } from "../../../../Component/Context/SocketContext"
import extrait from './assets/extrait.mp4'
import "./style/LiveVodPlayer.css"


const LiveVodPlayer = ({setGoToPlayerVOD, joinId, currentVodLiveStream}) => {

    const remoteStream = new MediaStream()
    const [roomId, setRoomId] = useState(joinId)
    const [finished, setFinished] = useState(false)
    const [someone, setSomeone] = useState(null)
    const [user, setUser] = useState(null)
    const {currentUser, removeRoom} = useAuth()
    const { thecode, socket, someoneelse, roomid, setMyid, iamhost, videoplayer, setVideoplayer, setAdTimer, setIsAd, isAd, adTimer, videoRef, setAllusersinroom, allusersinroom} = useSocket()

    useEffect(() => {
      
      if(videoRef){
        checkIsAdPlayng()

        return () => {
          checkIsAdPlayng()
        }
      } else {

      }
    }, [videoRef])
  
  function checkIsAdPlayng() {
    setAdTimer(setInterval(() => {
      setIsAd(document.querySelector('.ad-cta-wrapper'));
      if (isAd === null) {
        getVideoPlayer();
      }
    }, 1000))
  }
  
  function getVideoPlayer() {
    clearInterval(adTimer);
  
    //keep listening to the hosts videoplayer events, only host can control the play pause and seek
    if (currentUser.Room?.[0]?.host && videoRef?.current) {
      setInterval(() => {
        syncVideoStates();
      }, 1000);
    }
  }
  
  function syncVideoStates() {
    let videoState = {
      hosttime: videoRef.current.currentTime,
      isHostPaused: videoRef.current.paused,
    };
    socket.emit('videoStates', { videoState, roomid });
  }

  const disconnect = () => {
    removeRoom(currentUser.Room?.[0]?.id)
    socket.on('disconnect')
    setGoToPlayerVOD(false)
    
  }
  
    return (
      <>
        <div className="Live-VOD-player-container">
          <div className="info-live">
            <div>
              <Button variant="contained" onClick={() => disconnect()}>Retour</Button>
            </div>
            <div style={{display: "flex", height: "100%", width: "80%", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "50%", width: "90%", borderRadius: "25px", border: "3px solid black", background: "#362c7d"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "80%", color: "white"}}>
                  <h3>Voici le lien à envoyer à tes amis : </h3> <h1 style={{color: "purple"}}>{thecode}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="vod-live-container">
            <video style={{height: "100%", width: "100%", objectFit: "none"}} ref={videoRef} autoPlay={true} loop={true} src={extrait}  muted={true} />
          </div>
        </div>
        </>
    )
}

export default LiveVodPlayer