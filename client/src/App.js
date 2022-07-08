import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Nav/Navbar'
import Home from './Component/Home/Home'
import Footer from './Component/Footer/Footer';
import VodPlayer from './Route/VodPlayer/VodPlayer';
import AllAnimes from './Route/AllAnimes/AllAnimes';
import './App.css';
import { createContext, useContext, useEffect, useState } from 'react';
import Search from './Component/Search/Search';

export const epContext = createContext()

function App() {

  const {REACT_APP_IP_KEY} = process.env
  const [notAtHome, setNotAtHome] = useState(false)
  const [search, setSearch] = useState(false)
  const [startSearching, setStartSearching] = useState(false)
  const [allAnimes, setAllAnimes] = useState([])
  const [animeToFind, setAnimeToFind] = useState("")
  
  const saveAnime = localStorage.watching;
  const [ep, setEp] = useState(saveAnime ? JSON.parse(saveAnime) : {current_episode: [], all_episodes: [], name: "", image: ""})

  useEffect(() => {
    localStorage.setItem("watching", JSON.stringify(ep));
  }, [ep]);

  const [ip, setIP] = useState('');

  //creating function to load ip address from the API
  const getData = () => {
    fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_IP_KEY}`)
    .then(res => res.json())
    .then(data => setIP(data.ip_address))
  }
 

  useEffect(() => {
    getData()
    fetch(`https://chakranime.herokuapp.com/VOD/allanimes/check`)
    .then(res => res.json())
    .then(data => setAllAnimes(data))
  }, [])

  return (
      <epContext.Provider value={{setEp: setEp, setSearch: setSearch, search: search, setStartSearching: setStartSearching, setAnimeToFind: setAnimeToFind}}>
        <div className="App">
          <Router>
            {!search && <Navbar notAtHome={notAtHome} setNotAtHome={setNotAtHome} />}
            <Search open={search} notAtHome={notAtHome} setNotAtHome={setNotAtHome} startSearching={startSearching} allAnimes={allAnimes} animeToFind={animeToFind} />
          <Routes>
                <Route path='/' element={<Home allAnimes={allAnimes} setNotAtHome={setNotAtHome} />} />  
                <Route path='/watch/:watchName/:watchEpisode' element={<VodPlayer ep={ep} setEp={setEp} />} />
                <Route path='/list/animes' element={<AllAnimes allAnimes={allAnimes} setNotAtHome={setNotAtHome} />} />
            </Routes>
          {!startSearching && <Footer />}
        </Router>
      </div>
    </epContext.Provider>
  );
}

export default App;
