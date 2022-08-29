import { useSocket } from "../../../../Component/Context/SocketContext"
import "./style/ChatLive.css"


const ChatLive = () => {


    const {userJoined, someoneelse, infoRef} = useSocket()
console.log(userJoined, someoneelse)
    return (
        <div className="chat-live-container">
            <div className="chat-live-joined-info-container">
                <div className="chat-live-joined-info">
                    <div className="chat-info-container" ref={infoRef} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%"}}>
                        {
                        userJoined &&
                         <div>
                            <div style={{ display: "flex", height: "auto", width: "auto", marginRight: "10px"}}>
                                <h2>{userJoined}</h2>
                            </div>
                            <div style={{ display: "flex", height: "auto", width: "auto"}}>
                                <span>Bienvenu dans votre room !</span>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div className="chat-live-messages-container">

            </div>
        </div>
    )
}

export default ChatLive