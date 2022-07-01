import './style/Found.css'
import { useEffect, useRef, useState } from 'react'
import { Backdrop } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import ContentAnime from '../../Anime/ContentAnime'

const Found = ({animeFound, setNotAtHome}) => {

    const [anime, setAnime] = useState([])
    const [open, setOpen] = useState(false)
    let withoutDoublon = []
    const wrapperRef = useRef();

    let descriptionSuite = anime.desc ? anime.desc.split("Acteur")[0].length < 400 ? false : true : null

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            handleClose()
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [wrapperRef]);

      const filterDoublonAnime = () => {
        let newArray = [];
        let uniqueObject = {};

        if(animeFound){

            for (let anime in animeFound) {
      
                // Extract the name
                let animeName = animeFound[anime]['name'].includes("-") && !animeFound[anime]['name'].includes("Saison") && !animeFound[anime]['name'].includes(".") ?
                 animeFound[anime]['name'].split("OAV")[0].replaceAll("-", " ").toUpperCase() : 
                 animeFound[anime]['name'].includes("-") && animeFound[anime]['name'].includes("Saison") && !animeFound[anime]['name'].includes(".") ? 
                 animeFound[anime]['name'].split("Saison")[0].replaceAll(".", " ").replaceAll("-", " ").toUpperCase() : 
                 animeFound[anime]['name'].includes("OAV") && !animeFound[anime]['name'].includes(".") ? 
                 animeFound[anime]['name'].split("OAV")[0].toUpperCase() : 
                 animeFound[anime]['name'].includes("OAV") && animeFound[anime]['name'].includes(".") ? 
                 animeFound[anime]['name'].split("OAV")[0].replaceAll(".", " ").toUpperCase() : 
                 animeFound[anime]['name'].includes("Saison") && !animeFound[anime]['name'].includes(".") ? 
                 animeFound[anime]['name'].split("Saison")[0].toUpperCase() : 
                 animeFound[anime]['name'].includes("Saison") && animeFound[anime]['name'].includes(".") ? 
                 animeFound[anime]['name'].split("Saison")[0].replaceAll(".", " ").toUpperCase() : 
                 animeFound[anime]['name'].includes(".") ? 
                 animeFound[anime]['name'].replace(".", " ").toUpperCase() : 
                 animeFound[anime]['name'].includes("!") ? 
                 animeFound[anime]['name'].replace("!", "").toUpperCase() : 
                 animeFound[anime]['name'].includes("×") ? 
                 animeFound[anime]['name'].replace("×", "X").toUpperCase() : 
                 animeFound[anime]['name'].toUpperCase()
                 console.log(animeName)
                // Use the name as the index
                uniqueObject[animeName] = animeFound[anime];
            }

            for (let anime in uniqueObject){
                newArray.push(uniqueObject[anime])
            }
        }
        return newArray 
    }
    withoutDoublon = filterDoublonAnime()

    const handleClose = () => {
        setOpen(false);
        setAnime([])
        descriptionSuite = false
    };

    const handleAnime = (anime) => {
        setAnime(anime)
        setOpen(true)
    }

    return (
        <div className="found">
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
                open={open} 
            >
                {anime ? <ContentAnime wrapperRef={wrapperRef} anime={anime} descriptionSuite={descriptionSuite} setOpen={setOpen} setNotAtHome={setNotAtHome} /> : <CircularProgress color="inherit" />}
            </Backdrop>
            <div className='found-container'>
                {withoutDoublon.map(anime => {
                    return (
                        <div key={anime._id} className='anime-card' onClick={() => handleAnime(anime)}>
                            <img style={{display: "flex", height: "100%", width: "100%"}} src={anime.image} />
                        </div> 
                    )
                   
                })
                }
            </div>
        </div>
    )
}

export default Found