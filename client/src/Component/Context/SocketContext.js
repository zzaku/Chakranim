import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client"

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {

const [urlsValidated, setUrlsValidated] = useState([])
const [adTimer, setAdTimer] = useState(null)
const [myid, setMyid] = useState(null)
const [roomid, setRoomid] = useState(null)
const userHost = localStorage.userInfos;
  const [iamhost, setIamhost] = useState(userHost ? JSON.parse(userHost) : null)
  
  useEffect(() => {
    localStorage.setItem("iamhost", JSON.stringify(iamhost));
  }, [iamhost]);

const [isAd, setIsAd] = useState(null)
const [allusersinroom, setAllusersinroom] = useState([])
const [displaySearch, setDisplaySearch] = useState(false);
const [currentVodLiveStream, setCurrentVodLiveStream] = useState(null);
const [userJoined, setUserJoined] = useState(null);
const [thecode, setThecode] = useState(null);
const [tellEveryOne, setTellEveryOne] = useState(false);
const videoRef = useRef();
const infoRef = useRef();


const socket = io('https://lets-party-server.herokuapp.com/');

useEffect(() => {
    socket.on('whoami', function ({ id }) {
        setMyid(id);
      });
  }, [])

socket.on('joinmetothisroomsuccess', (msg) => {
    setThecode(msg)
  });

  socket.on('someonejoined', (name) => {
    console.log(iamhost)
    if (iamhost) {
        setAllusersinroom(current => [...current, name]);
        setUserJoined(name)
    }
});

useEffect(() => {
    if (iamhost) {
          socket.emit('tell_everyone_who_joined', {
              allusers: allusersinroom,
              roomid,
          });
    }
}, [allusersinroom])

  socket.on('who_joined', (allusers) => {
    console.log(iamhost)
    if (!iamhost) {
        console.log(allusers)
		allusers?.forEach((user) => {
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
		});
	}
  });

  socket.on('videoStates', ({ isHostPaused, hosttime }) => {
    // sync video player pause and play of users with the host
    if (!iamhost && videoRef?.current) {
      if (isHostPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
  
      let diffOfSeek = videoRef.current.currentTime - hosttime;
      // sync time if any user is behind by more than 8 s (in case of poor connection)
      // or if any user is forward 8s than everyone
      if (diffOfSeek < -8 || diffOfSeek > 8) {
        videoRef.current.currentTime = hosttime;
      }
    }
  });

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

    
        const pc = new RTCPeerConnection({
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
        })

    const value = {
        pc,
        displaySearch,
        setDisplaySearch,
        setCurrentVodLiveStream,
        currentVodLiveStream,
        socket,
        myid,
        setMyid,
        iamhost,
        setRoomid,
        roomid,
        setIamhost,
        videoRef,
        setAllusersinroom,
        allusersinroom,
        thecode,
        userJoined,
        setAdTimer,
        setIsAd,
        isAd,
        adTimer,
        infoRef
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}