import "./style/StreamAnime.css";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "../../../../Component/Context/AuthContext";
import { IconButton, TextField } from "@mui/material";
import { useSocket } from "../../../../Component/Context/SocketContext";
import LiveVodPlayer from "../LiveVodPlayer/LiveVodPlayer";
import { epContext } from "../../../../App";
import Found from "../../../../Component/Search/Found/Found";
import { IoMdArrowRoundBack } from "react-icons/io";
import ChatLive from "../ChatLive/ChatLive";

const StreamAnime = ({goToPlayerVOD, setGoToPlayerVOD}) => {
  const { currentUserID, currentUser } = useAuth();
  const [choice, setChoice] = useState("");
  const { socket, myid, videoplayer, setVideoplayer, setIamhost, setRoomid, roomid, iamhost, setMyid, displaySearch, setDisplaySearch, setCurrentVodLiveStream, currentVodLiveStream } = useSocket();
  const [joinRoomId, setJoinRoomId] = useState({});
  const [createRoomName, setCreateRoomName] = useState("");

  const open = useContext(epContext)

  useEffect(() => {
    setCurrentVodLiveStream({vod: open.ep})
  }, [open.ep]);

  const createRoom = () => {
    try{
      if (createRoomName) {
        localStorage.setItem('lets_party_uname', createRoomName);
        setRoomid(myid);
        setIamhost(true);
        startCreating()
      }
    } catch(error){
        console.log(error)
    }
  };

  const startCreating = () => {
    if(iamhost){
      socket.emit('joinmetothisroom', { roomid: myid, name: createRoomName });
      setGoToPlayerVOD(true)
    }
  }

  const startJoining = () => {

      socket.emit('joinmetothisroom', { roomid: joinRoomId.token, name:joinRoomId.name });
      setGoToPlayerVOD(true)
    
  }

  const joinRoom = () => {
    try{
      if (joinRoomId?.name && joinRoomId?.token) {
        localStorage.setItem('lets_party_uname',joinRoomId.name);
        setRoomid(joinRoomId.token);
        startJoining()
        setIamhost(false)
      }
    } catch(error){
      console.log(error)
    }
  };


  const launchSearching = (e, animeToFind) => {
    e.preventDefault()
    open.setLoading(true)
    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/allSeason?name=${encodeURIComponent((animeToFind).trim())}`)
    .then(res => res.json())
    .then(data => open.setAnimeFound(data) + open.setLoading(false) + setDisplaySearch(true))
  }

  return (
    <>
    <div className="live-vod-container" style={{width: goToPlayerVOD ? "80%": "100%"}}>
      {!goToPlayerVOD ? (
        <div className="chat-vod-container">
          <div className="choice-btn" style={{display: displaySearch && "none"}}>
            <Button variant="contained" onClick={() => setChoice("join")}>
              Rejoindre une salle privée
            </Button>
            <Button variant="contained" onClick={() => setChoice("create")}>
              créer une salle privée
            </Button>
          </div>
          {choice === "create" ? (
            <div className="create-room-info">
                <div className="creating-container">
                    <div className="create-room-info-container" style={{justifyContent: !displaySearch && "center", alignItems: !displaySearch && "center"}}>
                        <form
                        style={{height: "20%"}}
                        className="search-input"
                        onSubmit={(e) => launchSearching(e, open.animeToFind)}
                        >
                        <div style={{display: "flex", height: "100%", width: "100%", marginLeft: "5%", marginRight: "5%", flexDirection: "row", justifyContent: currentVodLiveStream ? "center" : !currentVodLiveStream && displaySearch && "space-between" }} className="search-input">
                            {!currentVodLiveStream ?
                                <div style={{flexDirection: "column"}}>
                                <h3>Recherche l'animé que vous souhaitez regarder</h3>
                                <TextField
                                onChange={(e) =>
                                    open.setStartSearching(true) +
                                    open.setAnimeToFind(e.target.value)
                                }
                                value={open.animeToFind}
                                autoComplete="off"
                                className="text-field"
                                style={{
                                    background: "white",
                                    color: "black",
                                    borderRadius: "200px 200px 200px 200px",
                                }}
                                id="standard"
                                label="Recherche ton anime"
                                variant="standard"
                                />
                            </div>
                            :
                            <div style={{display: "flex", height: "auto", width: "100%", flexDirection: "column", justifyContent: "space-around"}}>
                                <h1>Nom : {currentVodLiveStream?.vod?.name}</h1>
                                <h1>Langue : {currentVodLiveStream?.vod?.langue}</h1>
                                <h1>Saison : {currentVodLiveStream?.vod?.saison}</h1>
                                <h1>Episode : {currentVodLiveStream?.vod?.current_episode[0][0].episode}</h1>
                                <TextField onChange={(e) => setCreateRoomName(e.target.value)} variant="filled" placeholder="Nom de la party"></TextField>
                            </div>
                            }
                            <div>
                                {displaySearch && <IconButton sx={{fontSize: "50px", color: "black"}} size="large" onClick={() => setDisplaySearch(false) + open.setAnimeToFind("")}><IoMdArrowRoundBack /></IconButton>}
                            </div>
                        </div>
                        </form>
                        {displaySearch && <div className="found-vod-anime"><Found animeFound={open.animeFound} setNotAtHome={open.setNotAtHome} /></div>}
                    </div>
                    {(!displaySearch && currentVodLiveStream) &&
                        <div className="vod-card-container">
                            <img style={{height: "auto", width: "auto"}} src={currentVodLiveStream?.vod?.image} />
                        </div>
                    }
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {currentVodLiveStream &&
                        <div style={{display: "flex", height: "auto", width: "100%", justifyContent: "center"}}>
                        <Button variant="contained" onClick={() => setCurrentVodLiveStream(null)}>Changer d'animé</Button>
                    </div>
                    }
              {!displaySearch &&
              <Button
                disabled={createRoomName ? false : true}
                variant="contained"
                onClick={() => createRoom()}
              >
                CREER
              </Button>}
                </div>
            </div>
          ) : (
            choice === "join" && (
              <>
                <TextField
                  variant="filled"
                  style={{ background: "white" }}
                  value={joinRoomId.name}
                  onChange={(e) => setJoinRoomId({...joinRoomId, name: e.target.value})}
                  placeholder="nom de la room"
                />
                <TextField
                  variant="filled"
                  style={{ background: "white" }}
                  value={joinRoomId.token}
                  onChange={(e) => setJoinRoomId({...joinRoomId, token: e.target.value})}
                  placeholder="Token"
                />
                <Button
                  disabled={joinRoomId?.name && joinRoomId?.token ? false : true}
                  to={"/live-anime/vod/id"}
                  variant="contained"
                  onClick={() => joinRoom()}
                >
                  REJOINDRE
                </Button>
              </>
            )
          )}
        </div>
      ) : (
        <LiveVodPlayer setGoToPlayerVOD={setGoToPlayerVOD} joinId={joinRoomId} currentVodLiveStream={currentVodLiveStream} />
      )}
    </div>
    {goToPlayerVOD &&
      <div className="chat-live">
        <ChatLive />
      </div>
    }
    </>
  );
};

export default StreamAnime;
