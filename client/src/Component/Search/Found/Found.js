import './style/Found.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { Backdrop } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { ThreeDots } from "react-loader-spinner"
import ContentAnime from '../../Anime/ContentAnime'
import { epContext } from '../../../App';

const Found = ({animeFound, setNotAtHome}) => {

    const [anime, setAnime] = useState([])
    const [open, setOpen] = useState(false)
    const [animeBySeason, setAnimeBySeason] = useState([])
    const [descriptionSuite, setDescriptionSuite] = useState(false)
    let withoutDoublon = []
    const wrapperRef = useRef();
    const loader = useContext(epContext)

    useEffect(() => {
        if(anime.desc){
        setDescriptionSuite(anime.desc.split("Acteur")[0].length < 400 ? false : true)
        }
    }, [anime])

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
        setAnimeBySeason([])
        setAnime([])
    };

    const handleAnime = (myAnime) => {
        let firstPartToCheck = myAnime.name.split(" ")[0]
        let secondPartToCheck = myAnime.name.split(" ").length > 1 ? myAnime.name.split(" ")[1] : ""
        let thirdPartToCheck = myAnime.name.split(" ").length > 2 ? myAnime.name.split(" ")[2] : ""
        console.log(firstPartToCheck + " " + secondPartToCheck + " " + thirdPartToCheck)
        setAnime(myAnime)
        fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/allSeason?name=${encodeURIComponent((firstPartToCheck + " " + secondPartToCheck + " " + thirdPartToCheck).trim())}`)
        .then(res => res.json())
        .then(data => setAnimeBySeason(data))
        setOpen(true);
    }

    return (
      <div className="found">
        {!loader.loading ? (
          <>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 100,
              }}
              open={open}
            >
              {anime ? (
                <ContentAnime
                  wrapperRef={wrapperRef}
                  anime={anime}
                  setAnime={setAnime}
                  animeBySeason={animeBySeason}
                  descriptionSuite={descriptionSuite}
                  setDescriptionSuite={setDescriptionSuite}
                  setOpen={setOpen}
                  setNotAtHome={setNotAtHome}
                />
              ) : (
                <CircularProgress color="inherit" />
              )}
            </Backdrop>
            {withoutDoublon.length === 0 ? (
              <div className="found-container">
                <div className="resultat-found">
                  <h2>Aucun animes trouvé :/</h2>
                </div>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    height: "0",
                    paddingBottom: "75%",
                    display: "flex",
                  }}
                >
                  <iframe
                    title="GIF"
                    src="https://giphy.com/embed/tRWPEUIpuKAtq"
                    style={{
                      position: "absolute",
                      height: "auto",
                      width: "auto",
                    }}
                    frameBorder="0"
                    className="giphy-embed"
                    allowFullScreen
                  ></iframe>
                </div>
                <a href="https://giphy.com/gifs/naruto-gaara-tRWPEUIpuKAtq">
                  {" "}
                </a>
              </div>
            ) : (
              <div className="found-container">
                <div className="resultat-found">
                  <h2>
                    Résultats : {withoutDoublon.length}{" "}
                    {withoutDoublon.length > 1
                      ? "animés trouvés"
                      : "animé trouvé"}
                  </h2>
                </div>
                <div className="found-container-list">
                  {withoutDoublon.map((anime) => {
                    return (
                      <div
                        key={anime._id}
                        className="anime-card"
                        onClick={() => handleAnime(anime)}
                        style={{cursor: "pointer"}}
                      >
                        <div style={{display: "flex", height: "100%", width: "100%"}}>
                          {anime.newAnime && <div className='new-anime'><h2>Nouveauté</h2></div>}
                          {anime.nouveau_Episode && <div className='new-ep'><h2>Nouveaux episodes</h2></div>}
                          <img
                            alt={anime.name}
                            style={{
                              display: "flex",
                              height: "100%",
                              width: "100%",
                            }}
                            src={anime.image}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
            <div className="loading">
                <div className="loading-container">
                    <ThreeDots
                        style={{alignItems: "center"}}
                        height="50%"
                        width="100"
                        color='cyan'
                        ariaLabel='loading'
                    />
                </div>
            </div>
        )}
      </div>
    );
}

export default Found