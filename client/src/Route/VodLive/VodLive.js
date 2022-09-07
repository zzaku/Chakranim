import { useContext } from "react"
import { epContext } from "../../App"
import ChatLive from "../LiveAnime/ComponentsLive/ChatLive/ChatLive"
import LiveVodPlayer from "../LiveAnime/ComponentsLive/LiveVodPlayer/LiveVodPlayer"
import { SocketProvider } from "../../Component/Context/SocketContext"
import './style/VodLive.css'


const VodLive = () => {


    const vod = useContext(epContext)

    return (
            <div className="vod-id-live">
                <SocketProvider>
                    <div className="live-vod-containers">
                        <LiveVodPlayer setGoToPlayerVOD={vod.setGoToPlayerVOD} />
                    </div>
                    <div className="chat-lives">
                        <ChatLive />
                    </div>
                </SocketProvider>
            </div>
    )
}

export default VodLive