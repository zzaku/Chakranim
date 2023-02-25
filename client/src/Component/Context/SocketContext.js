import { async } from "@firebase/util";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client"
import { epContext } from "../../App";
import { useAuth } from "./AuthContext";
const socket = io('https://chakranimes-party.herokuapp.com');

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {

const id_live = useContext(epContext)
const [urlsValidated, setUrlsValidated] = useState(null)
const [adTimer, setAdTimer] = useState(null)
const {currentUser, getHostLive} = useAuth()
const [displaySearch, setDisplaySearch] = useState(null);
const [currentVodLiveStream, setCurrentVodLiveStream] = useState(null);
const [userJoined, setUserJoined] = useState(null);
const [thecode, setThecode] = useState(null);
const [tellEveryOne, setTellEveryOne] = useState(null);
const [allusersinroom, setAllusersinroom] = useState([])
const [indexVod, setIndexVod] = useState(0)
const [canceled, setCanceled] = useState(false)

const [playingState, setPlayingState] = useState({
    playing: false,
    muted: false,
    volume: 0.2,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    url: "",
})


const {playing, played, playbackRate, volume} = playingState
let alreadyInTheRoom = false
const videoRef = useRef();
const infoRef = useRef();
const chatMessageRef = useRef();
const [messages, setMessages] = useState([])
const [sync, setSync] = useState(false)
let newHostPaused
useEffect(() => {

    socket.on('videoStates', ({ isHostPaused, hosttime, played, playbackRate, volume, newUrl, vodUrlChanged, canceledChanged, isCanceled }) => {
        // sync video player pause and play of users with the host
        let currentHostPaused = isHostPaused
        const getHost = getHostLive(currentUser?.Room?.[0]?.host)
        getHost
        .then(host => {
                if(!host){

                        newHostPaused = isHostPaused

                        if (isHostPaused) {
                            setPlayingState({...playingState, playing: false, played: played, playbackRate: playbackRate, volume})
                        } else {
                            setPlayingState({...playingState, playing: true, played: played, playbackRate: playbackRate, volume})
                        }

                        if(vodUrlChanged){
                            setIndexVod(newUrl)
                        }

                        if(canceledChanged){
                            setCanceled(isCanceled)
                        }
          
                let diffOfSeek = hosttime - videoRef.current.getCurrentTime();
                // sync time if any user is behind by more than 8 s (in case of poor connection)
                // or if any user is forward 8s than everyone
                if(diffOfSeek > 2 || diffOfSeek < -2){
                    setSync(true)
                    videoRef.current.seekTo(hosttime)
                }
            }
        })
    });

    socket.on('msg', (data) => {
        if(chatMessageRef?.current){
            setMessages(current => [...current, data.msg])
            const chatMessage_container = document.createElement("div")
            chatMessage_container.className = "chat-message-sending"
            const chat_name_container = document.createElement("div")
            chat_name_container.className = "chat-name-container"
            const chat_name = document.createElement("h3")
            chat_name.innerHTML = (data.id === currentUser[0].id ? currentUser[0].pseudo : data.pseudo) + ":"
            const chatMessage_content = document.createElement("div")
            chatMessage_content.className = "chat-message-content"
            const chatMessage = document.createElement("span")
            chatMessage.innerHTML = data.msg
            chatMessageRef.current.appendChild(chatMessage_container)
            chatMessage_container.appendChild(chat_name_container)
            chat_name_container.appendChild(chat_name)
            chatMessage_container.appendChild(chatMessage_content)
            chatMessage_content.appendChild(chatMessage)
        }
    });

      socket.on('joinmetothisroomsuccess', (msg) => {
          setThecode(msg)
    });

    socket.on('who_joined', (allusers) => {
        if(allusers.allusers.length > 1){
            const getHost = getHostLive(currentUser?.Room?.[0]?.host)
            getHost
            .then(res => {
                if(!res){
                    if(!alreadyInTheRoom){
                        alreadyInTheRoom = true
                        allusers.allusers?.map((user) => {
                            if(currentUser[0].pseudo === user){
                                const status = document.createElement("div")
                                const user_namer = document.createElement("div")
                                const nameOfUser_container = document.createElement("div")
                                const nameOfUser = document.createElement("h2")
                                const welcome_container = document.createElement("div")
                                const welcome = document.createElement("span")
                                status.className = "joined-container"
                                user_namer.className = "users-names-container"
                                welcome_container.className = "welcome-container"
                                welcome.innerHTML = "Bienvenu dans la room"
                                    nameOfUser_container.className = "users-names"
                                    nameOfUser.innerHTML = user
                                    infoRef.current.appendChild(status)
                                    status.appendChild(user_namer)
                                    user_namer.appendChild(welcome_container)
                                    welcome_container.appendChild(welcome)
                                    user_namer.appendChild(nameOfUser_container)
                                    nameOfUser_container.appendChild(nameOfUser)
                                } else {
                                    const status = document.createElement("div")
                                    const user_namer = document.createElement("div")
                                    const nameOfUser_container = document.createElement("div")
                                    const nameOfUser = document.createElement("h2")
                                    const welcome_container = document.createElement("div")
                                    const welcome = document.createElement("span")
                                    status.className = "joined-container"
                                    user_namer.className = "users-names-container"
                                    nameOfUser_container.className = "users-names"
                                    nameOfUser.innerHTML = user
                                    welcome_container.className = "welcome-container"
                                    welcome.innerHTML = "a rejoind la room !"
                                    infoRef.current.appendChild(status)
                                    status.appendChild(user_namer)
                                    user_namer.appendChild(nameOfUser_container)
                                    nameOfUser_container.appendChild(nameOfUser)
                                    user_namer.appendChild(welcome_container)
                                    welcome_container.appendChild(welcome)
                                }
                            });
                        } else {
                            const status = document.createElement("div")
                            const user_namer = document.createElement("div")
                            const nameOfUser_container = document.createElement("div")
                            const nameOfUser = document.createElement("h2")
                            const welcome_container = document.createElement("div")
                                const welcome = document.createElement("span")
                                status.className = "joined-container"
                                user_namer.className = "users-names-container"
                                nameOfUser_container.className = "users-names"
                                nameOfUser.innerHTML = allusers.allusers[allusers.allusers.length-1]
                                welcome_container.className = "welcome-container"
                                welcome.innerHTML = "a rejoind la room !"
                                infoRef.current.appendChild(status)
                                status.appendChild(user_namer)
                                user_namer.appendChild(nameOfUser_container)
                                nameOfUser_container.appendChild(nameOfUser)
                                user_namer.appendChild(welcome_container)
                                welcome_container.appendChild(welcome)
                    } 
                }
            })
        }
    });
    
    return () => {
        socket.off("videoStates")
        socket.off("msg")
        socket.off("joinmetothisroomsuccess")
        socket.off("who_joined")
    }
}, [])

useEffect(() => {
    socket.on('whoami',  ({ id }) => {
        id_live.setMyId(id);
      });

      return () => {
        socket.off("whoami")
    }
}, [])

useEffect(() => {
    if (currentUser?.Room?.[0]?.host && videoRef?.current) { 
      if(!videoRef?.current){
        return
      }
        socket.emit('videoStates', { videoState: {
            hosttime: videoRef.current.getCurrentTime(),
            isHostPaused: !playing,
            played: played,
            volume,
            playbackRate: playbackRate,
            vodUrlChanged: false,
            canceledChanged: false
            }, roomid: id_live.roomid })
    }
  }, [currentUser?.Room, played, playing])
  
useEffect(() => {
    if (currentUser?.Room?.[0]?.host && videoRef?.current) { 
      if(!videoRef?.current){
        return
      }
        socket.emit('videoStates', { videoState: {
            newUrl: indexVod,
            vodUrlChanged: true
            }, roomid: id_live.roomid })
    }
  }, [indexVod])

useEffect(() => {
    if (currentUser?.Room?.[0]?.host && videoRef?.current) { 
      if(!videoRef?.current){
        return
      }
        socket.emit('videoStates', { videoState: {
            isCanceled: canceled,
            canceledChanged: true
            }, roomid: id_live.roomid })
    }
  }, [canceled])

useEffect(() => {
    socket.on('someonejoined', (name) => {
        if (id_live.iamhost && id_live.roomid) {
            if(infoRef?.current){
                if(currentUser[0].pseudo === name){
                    const status = document.createElement("div")
                    const user_namer = document.createElement("div")
                    const nameOfUser_container = document.createElement("div")
                    const nameOfUser = document.createElement("h2")
                    const welcome_container = document.createElement("div")
                    const welcome = document.createElement("span")
                    status.className = "joined-container"
                    user_namer.className = "users-names-container"
                    welcome_container.className = "welcome-container"
                    welcome.innerHTML = "Bienvenu dans la room"
                    nameOfUser_container.className = "users-names"
                    nameOfUser.innerHTML = name
                    infoRef.current.appendChild(status)
                    status.appendChild(user_namer)
                    user_namer.appendChild(welcome_container)
                    welcome_container.appendChild(welcome)
                    user_namer.appendChild(nameOfUser_container)
                    nameOfUser_container.appendChild(nameOfUser)
                } else {
                    const status = document.createElement("div")
                    const user_namer = document.createElement("div")
                    const nameOfUser_container = document.createElement("div")
                    const nameOfUser = document.createElement("h2")
                    const welcome_container = document.createElement("div")
                    const welcome = document.createElement("span")
                    status.className = "joined-container"
                    user_namer.className = "users-names-container"
                    nameOfUser_container.className = "users-names"
                    nameOfUser.innerHTML = name
                    welcome_container.className = "welcome-container"
                    welcome.innerHTML = "a rejoind la room !"
                    infoRef.current.appendChild(status)
                    status.appendChild(user_namer)
                    user_namer.appendChild(nameOfUser_container)
                    nameOfUser_container.appendChild(nameOfUser)
                    user_namer.appendChild(welcome_container)
                    welcome_container.appendChild(welcome)
                }
            }
            }
        if(id_live.roomid){
            setAllusersinroom(current => [...current, name]);
        }
    });

    return () => {
        socket.off("someonejoined")
    }
}, [id_live.roomid])

useEffect(() => {
    socket.emit('tell_everyone_who_joined', {
        allusers: {
            allusers: allusersinroom,
        },
        roomid: id_live.roomid,
    });

    return () => {
        socket.off("tell_everyone_who_joined")
    }
}, [allusersinroom])

    //Check Address
    function isStunAddressUp(address, _timeout){
        _timeout = _timeout || 6000;
        let response = {
            myIpAddress: "",
            stun: address,
            ipv6Supported: true,
            errors: []
        };
    
        let checker = new Promise((resolve, reject) => {
            const pc = new RTCPeerConnection({
                iceServers: [
                    {urls: `stun:${address}?transport=udp`}
                ]
            });
            
            pc.onicecandidate = (e) => {
                if (!e.candidate) return;
    
                // If a srflx candidate was found, notify that the STUN server works and provide the IP
                if(e.candidate.type == "srflx"){
                    response.myIpAddress = e.candidate.address;
                    pc.close();
                }
            };
            
            // Log errors:
            // Remember that in most of the cases, even if its working, you will find a STUN host lookup received error
            // Chrome tried to look up the IPv6 DNS record for server and got an error in that process. However, it may still be accessible through the IPv4 address
            pc.onicecandidateerror = (e) => {
                if(e.address == "[0:0:0:x:x:x:x:x]"){
                    response.ipv6Supported = false;
                }
                
                response.errors.push(e);
            };
            
            pc.onclose = function () {
                console.log("datachannel close");
            };
            
            var dc = pc.createDataChannel('ourcodeworld-rocks');
            pc.createOffer().then(offer => pc.setLocalDescription(offer));
    
            dc.onclose = function (e) {
                resolve(response);
            };
        });
    
        let timeout = new Promise(function(resolve, reject){
            setTimeout(function() {
                reject(response);
            }, _timeout);
        });
    
        return Promise.race([checker, timeout]);
    }

    async function TestServers(servers){
        let results = {
            servers: [],
            details: []
        };
    
        for(let i = 0; i < servers.length;i++){
            let server = servers[i];
    
            try{
                let result = await isStunAddressUp(server, 2000);
                console.log(`%c Server functional! : ${server}`, 'background: #222; color: #02ff00');
    
                if(result.myIpAddress && server.substring(0, 4) === "stun"){
                    results.servers.push(server);
                    results.details.push({
                        STUNAddress: server,
                        ipv6Supported: result.ipv6Supported,
                        lastTest: new Date().toDateString()
                    });
                }
            }catch(e){
                if(e == "timeout"){
                    console.log(`%c STUN Server connection timeout! : ${server}`, 'background: #222; color: #ff0000');
                    return;
                }
    
                console.log(`%c STUN Server unreachable! : ${server}`, 'background: #222; color: #ff0000');
            }
    
            console.log(`======================`);
        }
    
        setUrlsValidated(results.servers)
    }

    //WebRTC Initialize
    const checking = () => {
        TestServers(["stun.l.google.com:19302","stun1.l.google.com:19302"])
    }

    
        /*const pc = new RTCPeerConnection({
            iceServers: [
                    {
                    urls: "stun:openrelay.metered.ca:80",
                    },
                    {
                    urls: "turn:openrelay.metered.ca:80",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                    },
                    {
                    urls: "turn:openrelay.metered.ca:443",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                    },
                    {
                    urls: "turn:openrelay.metered.ca:443?transport=tcp",
                    username: "openrelayproject",
                    credential: "openrelayproject",
                    },
            ]
        })*/

    const value = {
        displaySearch,
        setDisplaySearch,
        setCurrentVodLiveStream,
        currentVodLiveStream,
        socket,
        videoRef,
        setAllusersinroom,
        allusersinroom,
        thecode,
        userJoined,
        setAdTimer,
        adTimer,
        infoRef,
        chatMessageRef,
        setTellEveryOne,
        tellEveryOne,
        playingState,
        setPlayingState,
        sync,
        messages,
        indexVod,
        setIndexVod,
        canceled,
        setCanceled
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}