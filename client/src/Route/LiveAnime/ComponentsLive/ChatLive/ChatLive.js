import { TextField } from "@mui/material"
import { useSocket } from "../../../../Component/Context/SocketContext"
import "./style/ChatLive.css"
import { useState } from "react"

const ChatLive = () => {


    const {someoneelse, infoRef} = useSocket()
    
    
    
    return (
        <div className="chat-live-container">
            <div className="chat-live-joined-info-container">
                <div className="chat-live-joined-info">
                    <div className="chat-info-container" ref={infoRef} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%"}}>
                    </div>
                </div>
            </div>
            <div className="chat-live-messages-container">
                <div className="chat-content-container">
                    <div className="chat-title">
                        <h2>Chat Live</h2>
                    </div>
                    <div className="chat-container">
                        <div className="chat-message-container">
                            <div className="chat-message-sending">
                                <span>c Biennnnnnnnnnnnnnnnnn !</span>
                            </div>
                            <div className="chat-message-sending">
                                <span>c Biennnnnnnnnnnnnnnnnn !</span>
                            </div>
                        </div>
                        <div className="chat-message-input">
                        <TextField sx={{borderRadius: "25px", background: "white"}} placeholder="Envoyer un message"></TextField>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatLive