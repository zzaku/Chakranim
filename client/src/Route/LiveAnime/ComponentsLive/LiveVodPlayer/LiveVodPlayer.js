import { async } from "@firebase/util"
import { Button } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { useAuth } from "../../../../Component/Context/AuthContext"
import { useSocket } from "../../../../Component/Context/SocketContext"
import VodPlayer from "./VodPlayer/VodPlayer"
import "./style/LiveVodPlayer.css"
import { epContext } from "../../../../App"
import { useNavigate } from "react-router-dom"


const LiveVodPlayer = ({setGoToPlayerVOD, chatRef}) => {

    const {currentUser, removeRoom, removeVod, getUserInRoom, setNotInRoom} = useAuth()
    const { thecode, socket, userOn } = useSocket()
    const playerContainerRef = useRef(null)
    const footerContext = useContext(epContext)
    const vod = useContext(epContext)
    const navigate = useNavigate();
    const tokenRef = useRef(null)

    const removeVodArray = (vodArray) => {
      return Promise.all(vodArray.map((elem, i) => removeVod(currentUser.Room?.[0]?.id, JSON.parse(sessionStorage.getItem('urlVod'))[i].position, JSON.parse(sessionStorage.getItem('urlVod'))[i].title)));
    }

    const disconnect = async () => {
      await getUserInRoom(currentUser.Room?.[0]?.id)
      .then(async (res) => {
        if(res === 1){
          await removeVodArray(vod.urlVod)
        }
        await removeRoom(currentUser.Room?.[0]?.id)
        .then(async () => {
          await setNotInRoom(currentUser?.[0]?.id)
          .then(() => {
            vod.setUrlVod([])
            vod.setUrlUpload([])
            socket.on('disconnect')
            setGoToPlayerVOD(false)
            navigate('/live-anime')
            footerContext.setHideFooter(false)
          })
        })
      })
    }
    
    return (
      <>
        <div className="Live-VOD-player-container">
          <div ref={tokenRef} className="info-live">
            <div>
              <Button variant="contained" sx={{background: "#2c2c80", color: "white", border: "2px solid #fff"}} onClick={() => disconnect()}>Quitter la room</Button>
            </div>
            <div style={{display: "flex", height: "100%", width: "80%", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "50%", width: "90%", borderRadius: "25px", border: "3px solid black", background: "rgb(107 110 189 / 92%)", boxShadow: "rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 60%) 6px 4px 6px, rgb(0 0 0 / 44%) 9px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "80%", color: "#fff"}}>
                  <h3>Voici le code secret à envoyer à tes amis : </h3> <h3 style={{background: "rgb(216 219 223 / 65%)", borderRadius: "5px", fontSize: "33px", color: "rgb(44 44 128)"}}>{thecode}</h3>
                </div>
              </div>
            </div>
          </div>
          <div ref={playerContainerRef} className="vod-live-container">
            <VodPlayer playerContainerRef={playerContainerRef} chatRef={chatRef} tokenRef={tokenRef} />
          </div>
        </div>
        </>
    )
}

export default LiveVodPlayer