import Extrait from "./Extrait/Extrait"
import List from "./List/List"
import { useEffect, useMemo, useState } from "react"
import "./style/Home.css"

const Home = () => {

    const genres = useMemo(() => ["S-F", "Action", "Aventure", "Comédie", "Tranche de vie", "Drame", "Fantasy", "Surnaturel", "Mystère", "Shonen", "Psychologique", "Romance", "Films", "Nouveautes"], [])

    const [genre1, setGenre1] = useState([{}])
    const [genre2, setGenre2] = useState([{}])
    const [genre3, setGenre3] = useState([{}])
    const [genre4, setGenre4] = useState([{}])
    const [genre5, setGenre5] = useState([{}])
    const [genre6, setGenre6] = useState([{}])
    const [genre7, setGenre7] = useState([{}])
    const [genre8, setGenre8] = useState([{}])
    const [genre9, setGenre9] = useState([{}])
    const [genre10, setGenre10] = useState([{}])
    const [genre11, setGenre11] = useState([{}])
    const [genre12, setGenre12] = useState([{}])
    const [genre13, setGenre13] = useState([{}])
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
                   fetch(`http://localhost:4000/VOD/anime/recentlyadded?page=1`)
                    .then(res => res.json())
                    .then(data => setLastAnime([{[genres[13]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[0]}${getParam(genres[0])}`)
                    .then(res => res.json())
                    .then(data => setGenre1([{[genres[0]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[1]}${getParam(genres[1])}`)
                    .then(res => res.json())
                    .then(data => setGenre2([{[genres[1]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[2]}${getParam(genres[2])}`)
                    .then(res => res.json())
                    .then(data => setGenre3([{[genres[2]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[3]}${getParam(genres[3])}`)
                    .then(res => res.json())
                    .then(data => setGenre4([{[genres[3]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[4]}${getParam(genres[4])}`)
                    .then(res => res.json())
                    .then(data => setGenre5([{[genres[4]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[5]}${getParam(genres[5])}`)
                    .then(res => res.json())
                    .then(data => setGenre6([{[genres[5]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[6]}${getParam(genres[6])}`)
                    .then(res => res.json())
                    .then(data => setGenre7([{[genres[6]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[7]}${getParam(genres[7])}`)
                    .then(res => res.json())
                    .then(data => setGenre8([{[genres[7]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[8]}${getParam(genres[8])}`)
                    .then(res => res.json())
                    .then(data => setGenre9([{[genres[8]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[9]}${getParam(genres[9])}`)
                    .then(res => res.json())
                    .then(data => setGenre10([{[genres[9]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[10]}${getParam(genres[10])}`)
                    .then(res => res.json())
                    .then(data => setGenre11([{[genres[10]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/Allgenres?genre1=${genres[11]}${getParam(genres[11])}`)
                    .then(res => res.json())
                    .then(data => setGenre12([{[genres[11]]: data}]))
           }
        }, [ready, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/type/Allfilm`)
                    .then(res => res.json())
                    .then(data => setGenre13([{[genres[12]]: data}]))
           }
        }, [ready, genres])

    return (
            <div className="anime-list">
                <div className="anime-container">
                    <div className="extrait">
                        <Extrait />
                    </div>
                    <div className="list">
                        <div className="list-container">
                            {lastAnime && genres[13] ? <List genres={genres[13]} genre={lastAnime} setGenre={setLastAnime}/> : null}
                            {genre1 && genres[0] ? <List genres={genres[0]} genre={ genre1} setGenre={setGenre1} /> : null}
                            {genre2 && genres[1] ?<List genres={genres[1]} genre={ genre2} setGenre={setGenre2} /> : null}
                            {genre3 && genres[2] ?<List genres={genres[2]} genre={ genre3} setGenre={setGenre3} /> : null}
                            {genre4 && genres[3] ?<List genres={genres[3]} genre={ genre4} setGenre={setGenre4} /> : null}
                            {genre5 && genres[4] ?<List genres={genres[4]} genre={ genre5} setGenre={setGenre5} /> : null}
                            {genre6 && genres[5] ?<List genres={genres[5]} genre={ genre6} setGenre={setGenre6} /> : null}
                            {genre7 && genres[6] ?<List genres={genres[6]} genre={ genre7} setGenre={setGenre7} /> : null}
                            {genre8 && genres[7] ?<List genres={genres[7]} genre={ genre8} setGenre={setGenre8} /> : null}
                            {genre9 && genres[8] ?<List genres={genres[8]} genre={ genre9} setGenre={setGenre9} /> : null}
                            {genre10 && genres[9] ?<List genres={genres[9]} genre={ genre10} setGenre={setGenre10} /> : null}
                            {genre11 && genres[10] ?<List genres={genres[10]} genre={ genre11} setGenre={setGenre11} /> : null}
                            {genre12 && genres[11] ?<List genres={genres[11]} genre={ genre12} setGenre={setGenre12} /> : null}
                            {genre13 && genres[12] ?<List genres={genres[12]} genre={ genre13} setGenre={setGenre13} /> : null}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home