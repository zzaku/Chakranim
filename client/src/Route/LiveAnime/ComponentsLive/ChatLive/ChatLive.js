import { TextField } from "@mui/material"
import { useSocket } from "../../../../Component/Context/SocketContext"
import "./style/ChatLive.css"
import { useState } from "react"
import { useAuth } from "../../../../Component/Context/AuthContext"

const ChatLive = () => {

    const [chatMessage, setChatMessage] = useState("")
    const {currentUser} = useAuth()
    const { socket, roomid, infoRef, chatMessageRef, messages } = useSocket()
    
    const submitMessage = (e) => {
        e.preventDefault()
        socket.emit("msg", {data: {msg: chatMessage, id: currentUser[0].id}, roomid: roomid})
        setChatMessage("")
    }
    
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
                            <div ref={chatMessageRef} className={messages.length <= 10 ? "chat-message-nooverflow" : "chat-message-overflow"}></div>
                        </div>
                        <div className="chat-message-input">
                            <form onSubmit={submitMessage}>
                                <TextField sx={{borderRadius: "10px", background: "white"}} value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder="Envoyer un message"></TextField>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatLive