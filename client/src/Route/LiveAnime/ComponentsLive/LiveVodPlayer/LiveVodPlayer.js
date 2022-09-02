import { async } from "@firebase/util"
import { Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useAuth } from "../../../../Component/Context/AuthContext"
import { useSocket } from "../../../../Component/Context/SocketContext"
import VodPlayer from "./VodPlayer/VodPlayer"
import "./style/LiveVodPlayer.css"


const LiveVodPlayer = ({setGoToPlayerVOD, joinId, currentVodLiveStream}) => {

    const {currentUser, removeRoom} = useAuth()
    const { thecode, socket, roomid, setAdTimer, adTimer, videoRef, playingState} = useSocket()
    const {playing, muted, volume, playbackRate, played, seeking, loaded, loadedSeconds, playedSeconds} = playingState
    const playerContainerRef = useRef()


    useEffect(() => {
      
      if (currentUser.Room?.[0]?.host && videoRef?.current) {
        if(!videoRef?.current){
          return
        }
        socket.emit('videoStates', { videoState: {
          hosttime: {loaded, loadedSeconds, played, playedSeconds},
          isHostPaused: !playing
        }, roomid });
      }
      //console.log({loaded, loadedSeconds, played, playedSeconds})
    }, [videoRef, currentUser?.Room, playing])


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
                  <h3>Voici le token à envoyer à tes amis : </h3> <h1 style={{color: "purple"}}>{thecode}</h1>
                </div>
              </div>
            </div>
          </div>
          <div ref={playerContainerRef} className="vod-live-container">
            <VodPlayer playerContainerRef={playerContainerRef} />
          </div>
        </div>
        </>
    )
}

export default LiveVodPlayer