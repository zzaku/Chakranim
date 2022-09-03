import "./style/StreamAnime.css";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "../../../../Component/Context/AuthContext";
import { Alert, IconButton, TextField } from "@mui/material";
import { useSocket } from "../../../../Component/Context/SocketContext";
import LiveVodPlayer from "../LiveVodPlayer/LiveVodPlayer";
import { epContext } from "../../../../App";
import Found from "../../../../Component/Search/Found/Found";
import { IoMdArrowRoundBack } from "react-icons/io";
import ChatLive from "../ChatLive/ChatLive";
import { io } from "socket.io-client";

const StreamAnime = ({goToPlayerVOD, setGoToPlayerVOD}) => {
  const { currentUserID, getRoom, currentUser, addRoom } = useAuth();
  const [choice, setChoice] = useState("");
  const { myid, socket, setIamhost, setRoomid, roomid, displaySearch, setTellEveryOne, setDisplaySearch, setCurrentVodLiveStream, currentVodLiveStream } = useSocket();
  const [joinRoomId, setJoinRoomId] = useState({name: "", token: ""});
  const [createRoomName, setCreateRoomName] = useState("");
  const [error, setError] = useState("");
  const footerContext = useContext(epContext)

  const open = useContext(epContext)

  useEffect(() => {
    setCurrentVodLiveStream({vod: open.ep})

    return () => {
      setCurrentVodLiveStream({vod: open.ep})
    }
  }, [open.ep]);

  const createRoom = async () => {
      await addRoom({host: true, name: createRoomName}, myid, currentUser[0].id)
      .then(res => {
        if(res.isAllowed){
          socket.emit('joinmetothisroom', { roomid: myid, name: createRoomName });
          setRoomid(myid);
          setIamhost(true)
          setGoToPlayerVOD(true)
          footerContext.setHideFooter(true)
        } else {
          setError("Vous avez déja créée une room, veuillez la quitter pour en créer une autre !")
        }
      })
  };

  const joinRoom = async () => {
      addRoom({host: false, name: joinRoomId.name}, joinRoomId.token, currentUser[0].id)
      .then(allowed => {
        if(allowed.isAllowed){
            socket.emit('joinmetothisroom', { roomid: joinRoomId.token, name:joinRoomId.name });
            setRoomid(joinRoomId.token);
            setGoToPlayerVOD(true)
            footerContext.setHideFooter(true)
        } else {
          setError("Vous avez déja rejoind une room, veuillez la quitter pour en rejoindre une autre !")
        }
      })
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
                        style={{height: "80%"}}
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
                                <h1>Episode : {currentVodLiveStream?.vod?.current_episode?.[0]?.[0]?.episode}</h1>
                                <TextField onChange={(e) => setCreateRoomName(e.target.value)} variant="filled" placeholder="Choisissez un pseudo"></TextField>
                                <div>{error && 
                                <Alert variant="filled" severity="info">
                                    {error}
                                </Alert>}</div>
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
                  placeholder="Choisissez un pseudo"
                />
                <TextField
                  variant="filled"
                  style={{ background: "white" }}
                  value={joinRoomId.token}
                  onChange={(e) => setJoinRoomId({...joinRoomId, token: e.target.value})}
                  placeholder="Entrer le code secret"
                />
                <Button
                  disabled={joinRoomId?.name && joinRoomId?.token ? false : true}
                  to={"/live-anime/vod/id"}
                  variant="contained"
                  onClick={() => joinRoom()}
                >
                  REJOINDRE
                </Button>
                <div>{error && 
                                <Alert variant="filled" severity="info">
                                    {error}
                                </Alert>}</div>
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
