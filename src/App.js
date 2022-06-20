import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Nav/Navbar'
import Home from './Component/Home/Home'
import Footer from './Component/Footer/Footer';
import VodPlayer from './Route/VodPlayer/VodPlayer';
import './App.css';
import { createContext, useContext, useState } from 'react';

export const epContext = createContext()

function App() {

  const [notAtHome, setNotAtHome] = useState(false)
  const [ep, setEp] = useState({current_episode: [], all_episodes: [], name: ""})

  return (
      <epContext.Provider value={setEp}>
        <div className="App">
          <Router>
            <Navbar notAtHome={notAtHome} setNotAtHome={setNotAtHome} />
              <Routes>
                <Route path='/' element={<Home setNotAtHome={setNotAtHome} />} />
                <Route path='/watch/:watchName/:watchEpisode' element={<VodPlayer ep={ep} />} />
            </Routes>
          <Footer />
        </Router>
      </div>
    </epContext.Provider>
  );
}

export default App;
