import './style/ContentAnime.css'
import Overlay from './Overlay/Overlay';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import { epContext } from '../../App';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';

const ContentAnime = ({anime, setAnime, animeBySeason, wrapperRef, descriptionSuite, descriptionSuite2, setDescriptionSuite, setOpen, setNotAtHome}) => {

    let withoutDoublon = [{}]
    const setEp = useContext(epContext)
    const setEpFilter = useContext(epContext)
    const openSearch = useContext(epContext)
    let distributionTemp = anime.desc ? anime.desc.split("Acteur") : null
    let description = anime.desc ? anime.desc.split("Acteur")[0] : null
    let distribution = anime.desc ? "Acteur" + anime.desc.split("Acteur")[distributionTemp.length-1].replaceAll("\n", "") : null
    let LastPartdescriptionTemp = anime.desc ? anime.desc.split("Acteur")[0].split(".").join('.').split(".") : null
    if(LastPartdescriptionTemp){if(LastPartdescriptionTemp[LastPartdescriptionTemp.length-1] === ""){LastPartdescriptionTemp.pop()}}
    let middleDesc = LastPartdescriptionTemp && Math.trunc((LastPartdescriptionTemp.length-1) / 2) + 1
    let LastPartdescription = anime.desc && anime.desc.split("Acteur")[0].split(".").splice(0, middleDesc).join(". ") + "..."

    //const [lecteur, setLecteur] = useState({Lecteur: sibnet})
    const allLinks = useMemo(() => [anime.links, anime.nextLinks], [anime])
    const seasonRef = useRef()
   
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
      withoutDoublon = [{episode: filterDoublonAnime()}]
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

let seasonChanged = (otherSeason, langue) => {
  let testSeason = animeBySeason.filter(elem => elem.saison === otherSeason.saison && elem.langue === langue || elem.saison === otherSeason.saison)[0]
  if(testSeason){
    setAnime(testSeason)
  }
}

let testLangue = animeBySeason.filter(elem => elem.saison === anime.saison && elem.langue === (anime.langue === "VF" ? "VOSTFR" : "VF"))[0]
const onLangueChanged = () => {
    setAnime(testLangue)
}
console.log(animeBySeason)

return (
      <div className="display-ep-anime" ref={wrapperRef}>
        <div className="container-display">
          <div className="container-title-anime">
            <div className="container-background-image-anime">
              <img width={"auto"} height={"auto"} src={anime.banniere} />
            </div>
            <div className="container-name-anime">
              <h1>{anime.name}</h1>
            </div>
          </div>
          <div className="container-info-anime">
            <div className="container-desc-anime">
              {!descriptionSuite ? (
                <h3> {description} </h3>
              ) : (
                <h3>
                  {" "}
                  {LastPartdescription}{" "}
                  <a
                    style={{ color: "cyan", cursor: "pointer" }}
                    onClick={() => setDescriptionSuite(false)}
                  >
                    {" "}
                    Afficher la suite
                  </a>{" "}
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
              <p style={{ width: "40%", fontSize: "20px", color: "cyan" }}>
                date : {anime.date}
              </p>
            </div>
          </div>
          <div className="container-moreinfo-anime">
            <div className="container-content-info-anime">
              <p style={{ fontSize: "20px" }}>
                genre : {anime.genre && anime.genre.slice(1).join(", ")}
              </p>
              <p style={{ width: "30%", fontSize: "20px" }}>
                durée: {anime.duree && anime.duree.replace(" ", "").trim()}
              </p>
            </div>
            <div ref={seasonRef} className="container-current-saison-anime">
              {anime.saison === "Film" ? (
                <h3 style={{ fontSize: "20px", color: "cyan" }}>Film :</h3>
              ) : (
                <h3 style={{ fontSize: "20px", color: "cyan" }}>
                  saison : {anime.saison && anime.saison}
                </h3>
              )}
              {nbrSeason[0] ? (<div ref={seasonRef} className="container-saison-anime">
              
                    <h3 id="Saison"> Autre saison</h3>
                    <div className='buttonGroup-saison'>
                    {nbrSeason.map((elem) => {
                      return (
                          <ButtonGroup style={{backgroundColor: "black"}} size="large" aria-label="large button group">
                            {elem.saison === "00" ? null : (
                              <Button
                                onClick={() => setSeasonSelected(true) + seasonChanged(elem, anime.langue)}
                                value={"season"}
                              >
                                {elem.saison}
                              </Button>
                            )}
                          </ButtonGroup>
                      );
                    })}
                  </div>
               </div>
              ) : null}
            </div>
            <div className="container-langue">
              <h3 style={{ fontSize: "20px", color: "cyan" }}>
                langue : {anime.langue}
              </h3>
              {testLangue ? <Button onClick={() => setLangueSelected(true) + onLangueChanged(anime.saison, anime.langue === "VF" ? "VOSTFR" : "VF")}>
                {anime.langue === "VF"
                  ? "regarder en VOSTFR"
                  : "regarder en VF"}
              </Button> : null}
            </div>
          </div>
          <div className="container-vod-anime">
            {anime.saison === "Film" ? null : <h2>Liste des épisodes</h2>}
            {seasonSelected || langueSelected ? null : <div className="container-episode-anime">
              {withoutDoublon[0].episode ? (
                withoutDoublon[0].episode.map((elem) => {
                  return (
                    <div className="vod-anime" key={anime._id}>
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
                            }) +
                            setEpFilter.setEpFilter(
                              () => (tab, episode) =>
                                tab.filter(
                                  (elem) => elem[0].episode === episode
                                )
                            ) +
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