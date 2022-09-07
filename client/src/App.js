import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Nav/Navbar";
import Home from "./Component/Home/Home";
import Footer from "./Component/Footer/Footer";
import VodPlayer from "./Route/VodPlayer/VodPlayer";
import AllAnimes from "./Route/AllAnimes/AllAnimes";
import Preferences from "./Route/Preferences/Preferences";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import Search from "./Component/Search/Search";
import Login from "./Route/Login/Login";
import { AuthProvider } from "./Component/Context/AuthContext";
import Account from "./Route/Account/Account";
import LiveAnime from "./Route/LiveAnime/LiveAnime";
import VodLive from "./Route/VodLive/VodLive";

export const epContext = createContext();
export const log = createContext();

function App() {
  const [notAtHome, setNotAtHome] = useState(false);
  const [search, setSearch] = useState(false);
  const [startSearching, setStartSearching] = useState(false);
  const [allAnimes, setAllAnimes] = useState([]);
  const [animeToFind, setAnimeToFind] = useState("");
  const [animeFound, setAnimeFound] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideFooter, setHideFooter] = useState(false);
  const [myId, setMyId] = useState("");
  const [goToPlayerVOD, setGoToPlayerVOD] = useState(false);
  const [urlVod, setUrlVod] = useState("")
  const [roomid, setRoomid] = useState(null)
  const [iamhost, setIamhost] = useState(false)

  ////local storage ep
  const saveAnime = localStorage.watching;
  const [ep, setEp] = useState(
    saveAnime
      ? JSON.parse(saveAnime)
      : {
          current_episode: [],
          all_episodes: [],
          id: "",
          name: "",
          langue: "",
          saison: "",
          image: "",
        }
  );

  useEffect(() => {
    localStorage.setItem("watching", JSON.stringify(ep));

    return () => {
      localStorage.setItem("watching", JSON.stringify(ep));
    }
  }, [ep]);
  ///////////////////////////////////////////////////////////

  ////local storage token
  const jwt = localStorage.token;
  const [token, setToken] = useState(localStorage.getItem("token"));
  ///////////////////////////////////////////////////////////

  ////local storage refreshToken
  const jwtRefreshed = localStorage.refreshToken;
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  ///////////////////////////////////////////////////////////

  const body_Key = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: process.env.REACT_APP_SECRET_KEY,
    }),
  };

  let getToken = async (e) => {
    let response = await fetch(
      `${process.env.REACT_APP_API_ANIME}/VOD/user`,
      body_Key
    );
    let data = await response.json();

    if (response.status === 200) {
      setToken(data.accessToken);
      localStorage.setItem(
        "token",
        token ? token : JSON.stringify(data.accessToken)
      );
      setRefreshToken(data.refreshToken);
      localStorage.setItem(
        "refreshToken",
        refreshToken ? refreshToken : JSON.stringify(data.refreshToken)
      );
    } else {
      console.log("nope 0 token");
    }
  };

  /*useEffect(() => {
    getToken();
  }, []);*/

  return (
    <AuthProvider>
      <epContext.Provider
        value={{
          ep: ep,
          setEp: setEp,
          token: token,
          setToken: setToken,
          refreshToken: refreshToken,
          setRefreshToken: setRefreshToken,
          setSearch: setSearch,
          search: search,
          setStartSearching: setStartSearching,
          animeToFind: animeToFind,
          setAnimeToFind: setAnimeToFind,
          setAnimeFound: setAnimeFound,
          setNotAtHome: setNotAtHome,
          animeFound: animeFound,
          loading: loading,
          setLoading: setLoading,
          hideFooter: hideFooter,
          setHideFooter: setHideFooter,
          myId: myId,
          setMyId: setMyId,
          goToPlayerVOD,
          setGoToPlayerVOD,
          urlVod: urlVod,
          setUrlVod: setUrlVod,
          roomid: roomid,
          setRoomid: setRoomid,
          iamhost: iamhost,
          setIamhost: setIamhost,
        }}
      >
        <div className="App">
          <Router>
            {!search && (
              <Navbar notAtHome={notAtHome} setNotAtHome={setNotAtHome} />
            )}
            <Search
              open={search}
              notAtHome={notAtHome}
              setNotAtHome={setNotAtHome}
              startSearching={startSearching}
              allAnimes={allAnimes}
              animeFound={animeFound}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home allAnimes={allAnimes} setNotAtHome={setNotAtHome} />
                }
              />
              <Route
                path="/watch/:watchName/:watchEpisode"
                element={<VodPlayer ep={ep} setEp={setEp} />}
              />
              <Route
                path="/list/animes"
                element={
                  <AllAnimes
                    token={token}
                    setToken={setToken}
                    refreshToken={refreshToken}
                    setRefreshToken={setRefreshToken}
                    allAnimes={allAnimes}
                    setNotAtHome={setNotAtHome}
                  />
                }
              />
              <Route
                path="/list/preferences"
                element={
                  <Preferences
                    token={token}
                    setToken={setToken}
                    refreshToken={refreshToken}
                    setRefreshToken={setRefreshToken}
                    allAnimes={allAnimes}
                    setNotAtHome={setNotAtHome}
                  />
                }
              />
              <Route
                path="/live-anime/"
                element={
                  <LiveAnime
                    token={token}
                    setToken={setToken}
                    refreshToken={refreshToken}
                    setRefreshToken={setRefreshToken}
                    allAnimes={allAnimes}
                    setNotAtHome={setNotAtHome}
                  />
                }
              />
              <Route
                path={`/live-anime/${myId}`}
                element={
                  <VodLive
                    token={token}
                    setToken={setToken}
                    refreshToken={refreshToken}
                    setRefreshToken={setRefreshToken}
                    allAnimes={allAnimes}
                    setNotAtHome={setNotAtHome}
                  />
                }
              />
              <Route path="/connexion" element={<Login />} />
              <Route path="/account" element={<Account />} />
            </Routes>
            {!hideFooter && <Footer />}
          </Router>
        </div>
      </epContext.Provider>
    </AuthProvider>
  );
}

export default App;
