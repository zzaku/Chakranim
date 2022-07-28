import { useMediaQuery } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import { useAuth } from "../../../Component/Context/AuthContext"
import ParallaxHover from "../../../Component/Home/List/Card/Card"
import { Circles } from "react-loader-spinner"
import "../style/Preferences.css"


const Fav = () => {

    const {currentUser} = useAuth()
    const [animesPref, setAnimesPref] = useState([])
    const refCard = useRef()
    const mobile = useMediaQuery('(max-width:968px)')

    const getPreferences = async (tab) => {
        let tempPref = []
        tab.map(pref => {
            if(pref.favorite){
                fetch(`https://chakranimes.herokuapp.com/VOD/anime/${pref.animeId}`)
                .then(res => res.json())
                .then(data => tempPref.push(data))
            }
        })
        return tempPref
    }

    useEffect(() => {
        if(currentUser){
            if(currentUser.Preferences){
                getPreferences(currentUser.Preferences).then(res => setAnimesPref(res))
            }
        }
        
    }, [currentUser])
    
    const handleToggle = () => {
        
    }

    console.log(animesPref)

    return (
        <div className="list-anime-container">
            <div className="list-anime">
                { animesPref ?
                    animesPref.map((anime, i) => 
                    <div
                      key={anime._id + i}
                      className="card-item-container"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleToggle(anime)}
                      ref={refCard}
                      >
                          {anime.newAnime && <div className='new-anime-mobile' style={{display: mobile ? "" : "none"}}><h2>Nouveauté</h2></div>}
                          {anime.nouveau_Episode && <div className='new-ep-mobile' style={{display: mobile ? "" : "none"}}><h2>Nouveaux episodes</h2></div>}
                          <ParallaxHover width={"700"} height={"700"} yRotate={500} >
                            <div style={{position: "absolute", height: "100%", width: "100%"}}>
                              {anime.newAnime && <div className='new-anime' style={{display: mobile ? "none" : ""}}><h2>Nouveauté</h2></div>}
                              {anime.nouveau_Episode && <div className='new-ep' style={{display: mobile ? "none" : ""}}><h2>Nouveaux episodes</h2></div>}
                              <img
                                alt={"carde-anime: " + anime.name}
                                className="posters"
                                style={{ height: "100%", width: "100%" }}
                                src={anime.image && anime.image}
                              />
                            </div>
                          </ParallaxHover>
                        </div>
                        )
                        :
                        <div className="loading">
                            <Circles
                                style={{alignItems: "center"}}
                                height="50"
                                width="100"
                                color='cyan'
                                ariaLabel='loading'
                            />
                        </div>
                        }
            </div>
        </div>
    )
}

export default Fav