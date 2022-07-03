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

  const [notAtHome, setNotAtHome] = useState(false)
  const [ep, setEp] = useState({current_episode: [], all_episodes: [], name: "", current_link: ""})
  const [epFilter, setEpFilter] = useState(() => () => {})
  const [search, setSearch] = useState(false)
  const [startSearching, setStartSearching] = useState(false)
  const [allAnimes, setAllAnimes] = useState([])
  const [animeToFind, setAnimeToFind] = useState("")

  useEffect(() => {
    fetch("http://localhost:4000/VOD/allanimes/check")
    .then(res => res.json())
    .then(data => setAllAnimes(data))
  }, [])

  return (
      <epContext.Provider value={{setEp: setEp, setEpFilter: setEpFilter, setSearch: setSearch, search: search, setStartSearching: setStartSearching, setAnimeToFind: setAnimeToFind}}>
        <div className="App">
          <Router>
            {!search && <Navbar notAtHome={notAtHome} setNotAtHome={setNotAtHome} />}
            <Search open={search} notAtHome={notAtHome} setNotAtHome={setNotAtHome} startSearching={startSearching} allAnimes={allAnimes} animeToFind={animeToFind} />
          <Routes>
                <Route path='/' element={<Home allAnimes={allAnimes} setNotAtHome={setNotAtHome} />} />  
                <Route path='/watch/:watchName/:watchEpisode' element={<VodPlayer ep={ep} setEp={setEp} epFilter={epFilter} />} />
                <Route path='/list/animes' element={<AllAnimes allAnimes={allAnimes} setNotAtHome={setNotAtHome} />} />
            </Routes>
          {!startSearching && <Footer />}
        </Router>
      </div>
    </epContext.Provider>
  );
}

export default App;
