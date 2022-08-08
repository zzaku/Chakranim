import Extrait from "./Extrait/Extrait"
import List from "./List/List"
import { useEffect, useMemo, useState } from "react"
import customFetcher from "../Fetch/FetchInstance"
import "./style/Home.css"

const Home = ({allAnimes, setNotAtHome}) => {

    const genres = useMemo(() => ["S-F", "Action", "Aventure", "Comédie", "Tranche de vie", "Drame", "Fantasy", "Surnaturel", "Mystère", "Shonen", "Psychologique", "Romance", "Films", "Les plus regardés", "Nouveaux Episodes"], [])

    //const [genre1, setGenre1] = useState([{}])
    //const [genre2, setGenre2] = useState([{}])
    const [genre3, setGenre3] = useState([{}])
    const [genre4, setGenre4] = useState([{}])
    //const [genre5, setGenre5] = useState([{}])
    //const [genre6, setGenre6] = useState([{}])
    //const [genre7, setGenre7] = useState([{}])
    const [genre8, setGenre8] = useState([{}])
    const [genre9, setGenre9] = useState([{}])
    //const [genre10, setGenre10] = useState([{}])
    //const [genre11, setGenre11] = useState([{}])
    const [genre12, setGenre12] = useState([{}])
    const [genre13, setGenre13] = useState([{}])
    const [mostWatched, setMostWatched] = useState([{}])
    const [lastAnime, setLastAnime] = useState([{}])
    const [ready, setReady] = useState(false)

    
        const getParam = (parameter) => {
            let params = ""
            for(let i = 2; i <= 12; i++){
                params += `&genre${i}=${parameter}`
            }
            return params
        }

        
        useEffect(() => {
            setReady(true)
            if(ready){
                getByLastAnime()
                getMostWatched()
                getByGenre13()
                getByGenre4()
                getByGenre8()
                getByGenre9()
                getByGenre12()
                getByGenre3()
            }
        }, [ready, genres])

                let getByGenre3 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[2]}${getParam(genres[2])}`)
                    .then(res => res.json())
                    .then(data => setGenre3([{[genres[2]]: data}]))
                  }
                
                let getByGenre4 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[3]}${getParam(genres[3])}`)
                    .then(res => res.json())
                    .then(data => setGenre4([{[genres[3]]: data}]))
                  }
        
                let getByGenre8 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[7]}${getParam(genres[7])}`)
                    .then(res => res.json())
                    .then(data => setGenre8([{[genres[7]]: data}]))
                  }

                let getByGenre9 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[8]}${getParam(genres[8])}`)
                    .then(res => res.json())
                    .then(data => setGenre9([{[genres[8]]: data}]))
                  }

                let getByGenre12 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[11]}${getParam(genres[11])}`)
                    .then(res => res.json())
                    .then(data => setGenre12([{[genres[11]]: data}]))
                }

                let getByGenre13 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/type/Allfilm`)
                    .then(res => res.json())
                    .then(data => setGenre13([{[genres[12]]: data}]))
                }

                let getByLastAnime = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/anime/recentlyadded?page=1`)
                    .then(res => res.json())
                    .then(data => setLastAnime([{[genres[14]]: data}]))
                }

                let getMostWatched = async () => {
                    await fetch(`${process.env.REACT_APP_API_ANIME}/VOD/anime/mostWatched`)
                    .then(res => res.json())
                    .then(data => setMostWatched([{[genres[13]]: data}]))
                }

        
        return (
            <div className="anime-list">
                <div className="anime-container">
                    <div className="extrait">
                        <Extrait />
                    </div>
                    <div className="list">
                        <div className="list-container">
                            {lastAnime && genres[14] ? <List allAnimes={allAnimes} genres={genres[14]} genre={lastAnime} setGenre={setLastAnime} setNotAtHome={setNotAtHome} /> : null}
                            {lastAnime ? <List allAnimes={allAnimes} genres={genres[13]} genre={mostWatched} setGenre={setLastAnime} setNotAtHome={setNotAtHome} /> : null}
                            
                            {genre3 && genres[2] ?<List allAnimes={allAnimes} genres={genres[2]} genre={ genre3} setGenre={setGenre3} setNotAtHome={setNotAtHome}/> : null}
                            {genre4 && genres[3] ?<List allAnimes={allAnimes} genres={genres[3]} genre={ genre4} setGenre={setGenre4} setNotAtHome={setNotAtHome}/> : null}
                            

                            
                            {genre8 && genres[7] ?<List allAnimes={allAnimes} genres={genres[7]} genre={ genre8} setGenre={setGenre8} setNotAtHome={setNotAtHome}/> : null}
                            {genre9 && genres[8] ?<List allAnimes={allAnimes} genres={genres[8]} genre={ genre9} setGenre={setGenre9} setNotAtHome={setNotAtHome}/> : null}
                            
                            {genre12 && genres[11] ?<List allAnimes={allAnimes} genres={genres[11]} genre={ genre12} setGenre={setGenre12} setNotAtHome={setNotAtHome}/> : null}
                            {genre13 && genres[12] ?<List allAnimes={allAnimes} genres={genres[12]} genre={ genre13} setGenre={setGenre13} setNotAtHome={setNotAtHome}/> : null}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home