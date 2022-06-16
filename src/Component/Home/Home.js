import Extrait from "./Extrait/Extrait"
import List from "./List/List"
import { useEffect, useMemo, useState } from "react"
import "./style/Home.css"

const Home = () => {

    const genres = useMemo(() => ["S-F", "Action", "Aventure", "Comédie", "Tranche de vie", "Drame", "Fantasy", "Surnaturel", "Mystère", "Shonen", "Psychologique", "Romance", "Films", "Nouveautes"], [])
    const [animeFiltered, setAnimeFiltered] = useState([])
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
    const [page, setPage] = useState({
        Nouveautes: 1,
        S_F: 1,
        Action: 1,
        Aventure: 1,
        Comedie: 1,
        Tranche_de_vie: 1,
        Drame: 1,
        Fantasy: 1,
        Surnaturel: 1,
        Mystere: 1,
        Shonen: 1,
        Psychologique: 1,
        Romance: 1,
        Films: 1,
    })

    
        const getParam = (parameter) => {
            let params = ""
            for(let i = 1; i <= 12; i++){
                params += `&genre${i}=${parameter}`
            }
            return params
        }

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/anime/recentlyadded?page=${page.Nouveautes}`)
                    .then(res => res.json())
                    .then(data => setLastAnime([{[genres[13]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.S_F}${getParam(genres[0])}`)
                    .then(res => res.json())
                    .then(data => setGenre1([{[genres[0]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Action}${getParam(genres[1])}`)
                    .then(res => res.json())
                    .then(data => setGenre2([{[genres[1]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Aventure}${getParam(genres[2])}`)
                    .then(res => res.json())
                    .then(data => setGenre3([{[genres[2]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Comedie}${getParam(genres[3])}`)
                    .then(res => res.json())
                    .then(data => setGenre4([{[genres[3]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Tranche_de_vie}${getParam(genres[4])}`)
                    .then(res => res.json())
                    .then(data => setGenre5([{[genres[4]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Drame}${getParam(genres[5])}`)
                    .then(res => res.json())
                    .then(data => setGenre6([{[genres[5]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Fantasy}${getParam(genres[6])}`)
                    .then(res => res.json())
                    .then(data => setGenre7([{[genres[6]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Surnaturel}${getParam(genres[7])}`)
                    .then(res => res.json())
                    .then(data => setGenre8([{[genres[7]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Mystere}${getParam(genres[8])}`)
                    .then(res => res.json())
                    .then(data => setGenre9([{[genres[8]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Shonen}${getParam(genres[9])}`)
                    .then(res => res.json())
                    .then(data => setGenre10([{[genres[9]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Psychologique}${getParam(genres[10])}`)
                    .then(res => res.json())
                    .then(data => setGenre11([{[genres[10]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/genres?page=${page.Romance}${getParam(genres[11])}`)
                    .then(res => res.json())
                    .then(data => setGenre12([{[genres[11]]: data}]))
           }
        }, [ready, page, genres])

        useEffect(() => {
            setReady(true)
           if(ready){
                   fetch(`http://localhost:4000/VOD/animes/type/film?page=${page.Films}`)
                    .then(res => res.json())
                    .then(data => setGenre13([{[genres[12]]: data}]))
           }
        }, [ready, page, genres])

    return (
            <div className="anime-list">
                <div className="anime-container">
                    <div className="extrait">
                        <Extrait />
                    </div>
                    <div className="list">
                        <div className="list-container">
                            {lastAnime && genres[13] ? <List genres={genres[13]} genre={lastAnime} setGenre={setLastAnime} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage}/> : null}
                            {genre1 && genres[0] ? <List genres={genres[0]} genre={ genre1} setGenre={setGenre1} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre2 && genres[1] ?<List genres={genres[1]} genre={ genre2} setGenre={setGenre2} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre3 && genres[2] ?<List genres={genres[2]} genre={ genre3} setGenre={setGenre3} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre4 && genres[3] ?<List genres={genres[3]} genre={ genre4} setGenre={setGenre4} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre5 && genres[4] ?<List genres={genres[4]} genre={ genre5} setGenre={setGenre5} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre6 && genres[5] ?<List genres={genres[5]} genre={ genre6} setGenre={setGenre6} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre7 && genres[6] ?<List genres={genres[6]} genre={ genre7} setGenre={setGenre7} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre8 && genres[7] ?<List genres={genres[7]} genre={ genre8} setGenre={setGenre8} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre9 && genres[8] ?<List genres={genres[8]} genre={ genre9} setGenre={setGenre9} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre10 && genres[9] ?<List genres={genres[9]} genre={ genre10} setGenre={setGenre10} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre11 && genres[10] ?<List genres={genres[10]} genre={ genre11} setGenre={setGenre11} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre12 && genres[11] ?<List genres={genres[11]} genre={ genre12} setGenre={setGenre12} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                            {genre13 && genres[12] ?<List genres={genres[12]} genre={ genre13} setGenre={setGenre13} animeFiltered={animeFiltered} setAnimeFiltered={setAnimeFiltered} page={page} setPage={setPage} /> : null}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home