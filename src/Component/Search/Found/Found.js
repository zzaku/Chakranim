import './style/Found.css'
import { useEffect, useRef, useState } from 'react'
import { Backdrop } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import ContentAnime from '../../Anime/ContentAnime'

const Found = ({animeFound, setNotAtHome}) => {

    const [anime, setAnime] = useState([])
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null);

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

    const handleClose = () => {
        setOpen(false);
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
                {animeFound.map(anime => {
                    return (
                        <div className='anime-card' onClick={() => handleAnime(anime)}>
                            <img style={{display: "flex", height: "100%", width: "100%"}} src={anime.image} />
                        </div> 
                    )
                   
                })
                }
            </div>
            <div className='found-suggestions'>

            </div>
        </div>
    )
}

export default Found