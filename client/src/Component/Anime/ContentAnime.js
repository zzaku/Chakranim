import './style/ContentAnime.css'
import Overlay from './Overlay/Overlay';
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Circles } from "react-loader-spinner"
import { epContext } from '../../App';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { Button, useMediaQuery } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const ContentAnime = ({anime, setAnime, animeBySeason, wrapperRef, descriptionSuite, setDescriptionSuite, setOpen, setNotAtHome}) => {

    let withoutDoublon = [{}]
    const setEp = useContext(epContext)
    const openSearch = useContext(epContext)
    let distributionTemp = anime.desc ? anime.desc.split("Acteur") : null
    let description = anime.desc ? anime.desc.split("Acteur")[0] : null
    let distribution = anime.desc ? "Acteur" + anime.desc.split("Acteur")[distributionTemp.length-1].replaceAll("\n", "") : null
    let LastPartdescriptionTemp = anime.desc ? anime.desc.split("Acteur")[0].split(".").join('.').split(".") : null
    if(LastPartdescriptionTemp){if(LastPartdescriptionTemp[LastPartdescriptionTemp.length-1] === ""){LastPartdescriptionTemp.pop()}}
    let middleDesc = LastPartdescriptionTemp && Math.trunc((LastPartdescriptionTemp.length-1) / 2) + 1
    let LastPartdescription = anime.desc && anime.desc.split("Acteur")[0].split(".").splice(0, middleDesc).join(". ") + "..."
console.log(openSearch.loading)
    //const [lecteur, setLecteur] = useState({Lecteur: sibnet})
    const allLinks = useMemo(() => [anime.links, anime.nextLinks], [anime])
    const seasonRef = useRef()
    const mobile = useMediaQuery('(max-width:968px)');
   
      const filterDoublonAnime = () => {
        let newArray = [];
        let uniqueObject = {};

        if(anime.links){

            for (let anime in allLinks[0]) {
      
                // Extract the name
                let animeName = allLinks[0][anime][0]['episode'];

                // Use the name as the index
                uniqueObject[animeName] = allLinks[0][anime];
            }

            for (let anime in uniqueObject){
                newArray.push(uniqueObject[anime])
            }
        }
        return newArray 
    }

    withoutDoublon = [{episode: filterDoublonAnime()}]

    const [seasonSelected, setSeasonSelected] = useState(false);
    const [langueSelected, setLangueSelected] = useState(false);

    useEffect(() => {
      setSeasonSelected(false)
      setLangueSelected(false)
    }, [anime])


const setLecteurEpisode = (tab, episode) => {
  return tab.filter(elem => elem[0].episode === episode)
}

const getNbrOfSeason = () => {
  let otherSeason = animeBySeason.filter(elem => elem.saison !== anime.saison)
  let newArray = [];
  let uniqueObject = {};
  
  if(otherSeason){
    
    for (let anime in otherSeason) {
          
      // Extract the name
      let animeName = otherSeason[anime]['saison'];
      
      // Use the name as the index
      uniqueObject[animeName] = otherSeason[anime];
    }
    
    for (let anime in uniqueObject){
      newArray.push(uniqueObject[anime])
    }
  }
  return newArray 
}

let nbrSeason = getNbrOfSeason()
console.log(animeBySeason)
let seasonChanged = (otherSeason, langue) => {
  let testSeason = animeBySeason.filter(elem => (elem.saison === otherSeason.saison && elem.langue === langue) || (elem.saison === otherSeason.saison))[0]
  if(testSeason){
    setAnime(testSeason)
  }
}

let testLangue = animeBySeason.filter(elem => elem.saison === anime.saison && elem.langue === (anime.langue === "VF" ? "VOSTFR" : "VF"))[0]
const onLangueChanged = () => {
    setAnime(testLangue)
}

return (
      <div className="display-ep-anime" ref={wrapperRef}>
        <div className="container-display">
          <div className='back'>
            <div className='back-container'>
              <Button onClick={() => setOpen(false)}><KeyboardDoubleArrowDownIcon /></Button>
            </div>
          </div>
          <div className="container-title-anime">
            <div className="container-background-image-anime">
              <img alt={anime.name} width={"auto"} height={"auto"} src={anime.banniere} />
            </div>
            <div className="container-name-anime">
              <h1>{anime.name}</h1>
            </div>
          </div>
          <div className='info-anime'>
          <div className="container-info-anime">
            <div className="container-desc-anime">
              {!descriptionSuite ? (
                <h3> {description} </h3>
              ) : (
                <h3>
                  {LastPartdescription}
                  <span
                    style={{ color: "cyan", cursor: "pointer" }}
                    onClick={() => setDescriptionSuite(false)}
                  >
                    
                    Afficher la suite
                  </span>
                </h3>
              )}
            </div>
            <div className="container-context-anime">
              <h3
                style={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  marginBlockEnd: 0,
                  color: "white",
                }}
              >
                Distribution<br></br>
                {distribution}
              </h3>
              <h3 style={{ width: "50%", color: "cyan" }}>
                date : {anime.date}
              </h3>
            </div>
          </div>
          </div>
          <div className='moreinfo-anime'>
          <div className="container-moreinfo-anime">
            <div className="container-content-info-anime">
              <h3>
                genre : {anime.genre && anime.genre.slice(1).join(", ")}
              </h3>
              <h3 style={{ width: "30%"}}>
                durée: {anime.duree && anime.duree.replace(" ", "").trim()}
              </h3>
            </div>
            <div ref={seasonRef} className="container-current-saison-anime">
              {anime.saison === "Film" ? (
                <h4 style={{color: "cyan" }}>Film :</h4>
              ) : (
                <h4 style={{color: "cyan" }}>
                  saison : {anime.saison && anime.saison}
                </h4>
              )}
              <div ref={seasonRef} className="container-saison-anime">
                <h4 id="Saison"> Autre saison :</h4>
                {!openSearch.loading ? nbrSeason[0] ? (
                    <>
                      <div className='buttonGroup-saison'>
                      { nbrSeason.map((elem, i) => {
                        return (
                          <div key={elem._id + i}>
                              <ButtonGroup className='season-btn' style={{backgroundColor: "black"}} size={mobile ? "small" : "large"} aria-label="large button group">
                                {elem.saison === "00" ? null : (
                                  <Button
                                    onClick={() => setSeasonSelected(true) + seasonChanged(elem, anime.langue)}
                                    value={"season"}
                                  >
                                    {elem.saison}
                                  </Button>
                                )}
                              </ButtonGroup>
                          </div>
                        );
                      })}
                    </div>
                </>
                ) 
                : 
                <h4 id="Saison">indisponible</h4>
                :
                <Circles
                    style={{alignItems: "center"}}
                    height="50"
                    width="100"
                    color='cyan'
                    ariaLabel='loading'
                />
              }
              </div>
            </div>
            <div className="container-langue">
              <h4 style={{color: "cyan" }}>
                langue : {anime.langue}
              </h4>
              {testLangue ? <Button onClick={() => setLangueSelected(true) + onLangueChanged(anime.saison, anime.langue === "VF" ? "VOSTFR" : "VF")}>
                {anime.langue === "VF"
                  ? "regarder en VOSTFR"
                  : "regarder en VF"}
              </Button> : null}
            </div>
          </div>
          </div>
          <div className="container-vod-anime">
            {anime.saison === "Film" ? null : <h2>Liste des épisodes</h2>}
            {seasonSelected || langueSelected ? null : <div className="container-episode-anime">
              {withoutDoublon[0].episode ? (
                withoutDoublon[0].episode.map((elem, i) => {
                  return (
                    <div className="vod-anime" key={anime._id + i}>
                      <Link
                        to={`/watch/${anime.name
                          .replaceAll(" ", "-")
                          .replaceAll(".", "")
                          .replaceAll(",", "")
                          .replaceAll("#", "")}/${elem[0].episode.replaceAll(
                          " ",
                          "-"
                        )}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          onClick={() =>
                            setOpen(false) +
                            setNotAtHome(true) +
                            setEp.setEp({
                              current_episode: setLecteurEpisode(
                                allLinks[0],
                                elem[0].episode
                              ),
                              all_episode: allLinks[0],
                              name: anime.name,
                              image: anime.image,
                            }) +
                            openSearch.setSearch(false)
                          }
                          className="vod-cards card-shadow"
                          style={{
                            display: "flex",
                            height: "auto",
                            width: "auto",
                            borderRadius: "15px",
                            cursor: "pointer",
                          }}
                        >
                          <Overlay
                            image={anime.image}
                            episode={elem[0].episode}
                            saison={anime.saison}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h2>Prochainement</h2>
              )}
            </div>}
          </div>
        </div>
      </div>
    );
}

export default ContentAnime