import { Button } from "@mui/material"
import { useState } from "react"
import StreamAnime from "./ComponentsLive/StreamAnime/StreamAnime"
import { SocketProvider, } from "../../Component/Context/SocketContext"
import styled from "styled-components"
import "./style/LiveAnime.css"


const LiveAnime = () => {
    
    const ManageLive = styled("div")`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    `;

    const [goToPlayerVOD, setGoToPlayerVOD] = useState(false);
    const [open, setOpen] = useState(false)


    return (
        <SocketProvider>
            <ManageLive>
                <div className="open-live-vod" style={{height: goToPlayerVOD ? ("100%")  : (open ? "80%" : "50px"), width: goToPlayerVOD ? ("100%")  : (open ? "80%" : "220px"), border: goToPlayerVOD ? ("0")  : "25px"}}>
                    {open ?
                    <StreamAnime goToPlayerVOD={goToPlayerVOD} setGoToPlayerVOD={setGoToPlayerVOD} />
                    :
                    <Button onClick={() => setOpen(true)} style={{display: "flex", borderRadius: "25px", color: "white", height: "auto", width: "100%", justifyContent: "center", alignItems: "center"}}>OK</Button>
                    }
                </div>
            </ManageLive>
        </SocketProvider>

    )
}

export default LiveAnime