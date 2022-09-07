import "./style/StreamAnime.css";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "../../../../Component/Context/AuthContext";
import { Alert, CircularProgress, IconButton, TextField } from "@mui/material";
import { useSocket } from "../../../../Component/Context/SocketContext";
import LiveVodPlayer from "../LiveVodPlayer/LiveVodPlayer";
import { epContext } from "../../../../App";
import Found from "../../../../Component/Search/Found/Found";
import { IoMdArrowRoundBack } from "react-icons/io";
import ChatLive from "../ChatLive/ChatLive";
import DropFileInput from "../../../../Component/DropFileInput/DropFileInput";
import { useNavigate } from "react-router-dom";

const StreamAnime = ({goToPlayerVOD, setGoToPlayerVOD}) => {
  const { currentUserID, getRoom, currentUser, addRoom, uploadVodLive, getBackVodLive } = useAuth();
  const [choice, setChoice] = useState("");
  const { socket, displaySearch, setDisplaySearch, setCurrentVodLiveStream, currentVodLiveStream } = useSocket();
  const [joinRoomId, setJoinRoomId] = useState({name: "", token: ""});
  const [createRoomName, setCreateRoomName] = useState("");
  const [error, setError] = useState("");
  const [urlUpload, setUrlUpload] = useState([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const footerContext = useContext(epContext)
  const id = useContext(epContext)
  const navigate = useNavigate();

  const open = useContext(epContext)

  useEffect(() => {
    setCurrentVodLiveStream({vod: open.ep})

    return () => {
      setCurrentVodLiveStream({vod: open.ep})
    }
  }, [open.ep]);

  const createRoom = async () => {
    let room = {}
    setLoadingLive("Creation de la room...")
      await addRoom({host: true, name: currentUser[0].pseudo}, id.myId, currentUser[0].id)
      .then( async (res) => {
        if(res.isAllowed){
        await getRoom()
        .then(async (res) => {
        if(res.length > 0){
          await uploadVodLive(urlUpload[0].result, id.myId)
          .then(async () => {
            await getBackVodLive(id.myId)
            .then(res => {
              socket.emit('joinmetothisroom', { roomid: id.myId, name: currentUser[0].pseudo });
              id.setRoomid(id.myId);
              id.setIamhost(true)
              footerContext.setHideFooter(true)
              id.setUrlVod(res)
              setLoadingLive("")
              room = {room_created: true, room_already_created: false}
            })
          })
        }
      })

      } else {
        room = {room_created: false, room_already_created: true}
      }
    })
    return room
  };

  const goToRoom = async () => {
    if(choice === "create"){
      createRoom()
      .then(res => {
        if(res.room_created && !res.room_already_created){
          setGoToPlayerVOD(true)
          navigate(`/live-anime/${id.myId}`)
        } else if(!res.room_created && res.room_already_created) {
          setError("Vous avez déja créée une room, veuillez la quitter pour en créer une autre !")
        }
      })
    } else if(choice === "join"){
      joinRoom()
      .then(res => {
        if(res.room_joined && !res.room_already_joined){
          setGoToPlayerVOD(true)
          navigate(`/live-anime/${id.myId}`)
        } else if(!res.room_joined && res.room_already_joined) {
          setError("Vous avez déja rejoind une room, veuillez la quitter pour en rejoindre une autre !")
        }
      })
    }
  }

  const joinRoom = async () => {
    let room = {}
    setLoadingLive("Chargement de la room...")
      await addRoom({host: false, name: currentUser[0].pseudo}, joinRoomId.token, currentUser[0].id)
      .then( async (allowed) => {
        if(allowed.isAllowed){
          await getRoom()
          .then(async (res) => {
            if(res.length > 0){
              await getBackVodLive(joinRoomId.token)
                .then(res => {
                  socket.emit('joinmetothisroom', { roomid: joinRoomId.token, name: currentUser[0].pseudo });
                  id.setUrlVod(res)
                  id.setRoomid(joinRoomId.token);
                  setLoadingLive("")
                  footerContext.setHideFooter(true)
                  room = {room_joined: true, room_already_joined: false, url_vod: res}
                })
            }
          })
        } else {
          room = {room_joined: false, room_already_joined: true}
        }
      })
      return room
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
                {(!displaySearch && currentVodLiveStream) &&
                        <div className="vod-input-files">
                            <DropFileInput setUrlUpload={setUrlUpload} />
                        </div>
                    }
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
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    {
                    !loadingLive ? <>
                    {currentVodLiveStream &&
                        <div style={{display: "flex", height: "auto", width: "100%", justifyContent: "center"}}>
                        <Button variant="contained" onClick={() => setCurrentVodLiveStream(null)}>Changer d'animé</Button>
                    </div>}
                    
                {!displaySearch &&
                <Button
                  disabled={false}
                  variant="contained"
                  onClick={() => goToRoom()}
                >
                  CREER
                </Button>}
              </>
               :
               <>
                <div>
                  <h2>{loadingLive}</h2>
                </div>
                <div>
                <CircularProgress color="inherit" />
                </div>
               </>
              }
                </div>
            </div>
          ) : (
            choice === "join" && (
              <>
                <TextField
                  variant="filled"
                  style={{ background: "white" }}
                  value={joinRoomId.token}
                  onChange={(e) => setJoinRoomId({...joinRoomId, token: e.target.value})}
                  placeholder="Entrer le code secret"
                />
                {
                !loadingLive ?
                <Button
                  disabled={joinRoomId?.token ? false : true}
                  to={"/live-anime/vod/id"}
                  variant="contained"
                  onClick={() => goToRoom()}
                >
                  REJOINDRE
                </Button>
                :
                <div>
                  <h2>{loadingLive}</h2>
                </div>
                }
                <div>{error && 
                                <Alert variant="filled" severity="info">
                                    {error}
                                </Alert>}</div>
              </>
            )
          )}
        </div>
    </div>
    </>
  );
};

export default StreamAnime;
