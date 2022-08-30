import { useSocket } from "../../../../Component/Context/SocketContext"
import "./style/ChatLive.css"


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

            </div>
        </div>
    )
}

export default ChatLive