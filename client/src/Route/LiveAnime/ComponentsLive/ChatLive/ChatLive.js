import { TextField } from "@mui/material"
import { useSocket } from "../../../../Component/Context/SocketContext"
import "./style/ChatLive.css"
import { useContext, useEffect, useState } from "react"
import { useAuth } from "../../../../Component/Context/AuthContext"
import { epContext } from "../../../../App"

const ChatLive = ({chatRef}) => {

    const [chatMessage, setChatMessage] = useState("")
    const [send, setSend] = useState(false)
    const {currentUser} = useAuth()
    const { roomid }= useContext(epContext)
    const { socket, infoRef, chatMessageRef, messages, setMessages } = useSocket()
    
    const submitMessage = (e) => {
        setSend(true)
        e.preventDefault()
        console.log(chatMessage, currentUser[0].id, currentUser[0].pseudo, roomid)
        socket.emit("msg", {data: {msg: chatMessage, id: currentUser[0].id, pseudo: currentUser[0].pseudo}, roomid: roomid})
        setChatMessage("")
    }
    
    return (
        <div ref={chatRef} className="chat-live-container">
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