import './style/ContentAnime.css'
import Overlay from './Overlay/Overlay';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import { epContext } from '../../App';
import { useContext } from 'react';

const ContentAnime = ({anime, wrapperRef, descriptionSuite, setDescriptionSuite, setOpen, setNotAtHome}) => {

    let withoutDoublon = [{}] 
    const setEp = useContext(epContext)
    const setEpFilter = useContext(epContext)

    let distributionTemp = anime ? anime.desc.split("Acteur") : null
    let description = anime ? anime.desc.split("Acteur")[0] : null
    let distribution = anime ? "Acteur" + anime.desc.split("Acteur")[distributionTemp.length-1].replaceAll("\n", "") : null
    let LastPartdescriptionTemp = anime.desc.split("Acteur")[0].split(".").join('.').split(".")
    if(LastPartdescriptionTemp[LastPartdescriptionTemp.length-1] === ""){LastPartdescriptionTemp.pop()}
    let middleDesc = Math.trunc((LastPartdescriptionTemp.length-1) / 2) + 1
    let LastPartdescription = anime.desc.split("Acteur")[0].split(".").splice(0, middleDesc).join(". ") + "..."

    //const [lecteur, setLecteur] = useState({Lecteur: sibnet})
    const allLinks = [anime.links, anime.nextLinks]

      const filterDoublonAnime = () => {
        let newArray = [];
        let uniqueObject = {};

        if(allLinks[0]){

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

    const setLecteurEpisode = (tab, episode) => {
        return tab.filter(elem => elem[0].episode === episode)
    }

    return (
        <div className="display-ep-anime" ref={wrapperRef}>
                <div className='container-display'>
                    <div className="container-title-anime">
                        <div className="container-background-image-anime">
                            <img width={"auto"} height={"auto"} src={anime.banniere} />
                        </div>
                        <div className="container-name-anime">
                            <h1>{anime.name}</h1>
                        </div>
                    </div>
                    <div className='container-info-anime'>
                        <div className="container-desc-anime">
                            {descriptionSuite ? <h3> {description} </h3> : <h3> {LastPartdescription} <a style={{color: "cyan", cursor: "pointer"}} onClick={() => setDescriptionSuite(true)}> Afficher la suite</a> </h3>}
                        </div>
                        <div className="container-context-anime">
                            <h3 style={{display: "flex", height: "100%", width: "100%", marginBlockEnd: 0, color: "white"}}>
                            Distribution<br></br>
                            {distribution}
                            </h3>
                            <p style={{width: "40%", fontSize: "20px", color: "cyan"}}>date : {anime.date}</p>
                        </div>
                    </div>
                    <div className='container-moreinfo-anime'>
                        <div className="container-content-info-anime">
                            <p style={{fontSize: "20px"}}>genre : {anime.genre.slice(1).join(', ')}</p>
                            <p style={{width: "30%", fontSize: "20px"}}>durée: {anime.duree.replace(" ", "").trim()}</p>
                        </div>
                        <div className="container-saison-anime">
                            {anime.saison === "Film" ? <h3 style={{fontSize: "20px", color: "cyan"}}>Film :</h3> : <h3 style={{fontSize: "20px", color: "cyan"}}>saison : {anime.saison}</h3>}
                            <FormControl>
                                <InputLabel style={{fontSize: "20px"}} id="Langue-select-label">Langue</InputLabel>
                                <Select labelId="Langue-select-label" 
                                        id="Langue-select" 
                                        variant='outlined' 
                                        label="Langue"
                                        style={{backgroundColor: "white", color: "black", width: "120px"}}>
                                    <MenuItem value={"VOSTFR"}>VOSTFR</MenuItem>
                                    <MenuItem value={"VF"}>VF</MenuItem>
                                </Select>
                            </FormControl>    
                        </div>
                    </div>
                    <div className='container-vod-anime'>
                            {anime.saison === "Film" ? null : <h2>Liste des épisodes</h2>}
                        <div className="container-episode-anime">
                            {withoutDoublon[0].episode ? withoutDoublon[0].episode.map(elem => {
                                return (
                                    <div className='vod-anime'>
                                        <Link to={`/watch/${anime.name.replaceAll(" ", "-").replaceAll(".", "").replaceAll(",", "").replaceAll("#", "")}/${elem[0].episode.replaceAll(" ", "-")}`} style={{textDecoration: 'none'}}>
                                            <div onClick={() => setOpen(false) + setNotAtHome(true) + setEp.setEp({current_episode: setLecteurEpisode(allLinks[0], elem[0].episode), all_episode: allLinks[0], name: anime.name}) + setEpFilter.setEpFilter(() => (tab, episode) => tab.filter(elem => elem[0].episode === episode))} className='vod-cards card-shadow' style={{display: "flex", height: "auto", width: "auto", borderRadius: "15px", cursor: "pointer"}}>
                                                <Overlay image={anime.image} episode={elem[0].episode} saison={anime.saison} />
                                            </div>
                                        </Link>    
                                    </div>
                                )
                            })
                            :
                            <h2>Prochainement</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ContentAnime