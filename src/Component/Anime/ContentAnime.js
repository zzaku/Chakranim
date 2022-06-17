import './style/ContentAnime.css'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';

const ContentAnime = ({anime, wrapperRef, descriptionSuite, setDescriptionSuite}) => {

    let distributionTemp = anime ? anime.desc.split("Acteur") : null
    let description = anime ? anime.desc.split("Acteur")[0] : null
    let distribution = anime ? "Acteur" + anime.desc.split("Acteur")[distributionTemp.length-1].replaceAll("\n", "") : null
    
    let sibnet = anime.links.filter(elem => elem[0].format_VOD === "Sibnet")
    let Uqload = anime.links.filter(elem => elem[0].format_VOD === "Uqload")
    let Streamsb = anime.links.filter(elem => elem[0].format_VOD === "Streamsb")
    let Vudeo = anime.links.filter(elem => elem[0].format_VOD === "Vudeo")
    let Mytv = anime.links.filter(elem => elem[0].format_VOD === "Mytv")
    let LastPartdescriptionTemp = anime.desc.split("Acteur")[0].split(".").join('.').split(".")
    if(LastPartdescriptionTemp[LastPartdescriptionTemp.length-1] === ""){LastPartdescriptionTemp.pop()}
    let middleDesc = Math.trunc((LastPartdescriptionTemp.length-1) / 2) + 1
    let LastPartdescription = anime.desc.split("Acteur")[0].split(".").splice(0, middleDesc).join(". ") + "..."

    const [lecteur, setLecteur] = useState({Lecteur: sibnet})

    const buttons = [
        <Button key="Sibnet" onClick={() => setLecteur({Lecteur: sibnet})}>Sibnet</Button>,
        <Button key="Uqload" onClick={() => setLecteur({Lecteur: Uqload})}>Uqload</Button>,
        <Button key="Streamsb" onClick={() => setLecteur({Lecteur: Vudeo})}>Streamsb</Button>,
        <Button key="Vudeo" onClick={() => setLecteur({Lecteur: Mytv})}>Vudeo</Button>,
      ];
      
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
                            {descriptionSuite ? <h3> {description} </h3> : <h3> {LastPartdescription} <a style={{color: "white", cursor: "pointer"}} onClick={() => setDescriptionSuite(true)}> Afficher la suite</a> </h3>}
                        </div>
                        <div className="container-context-anime">
                            <h3 style={{display: "flex", height: "100%", width: "100%", marginBlockEnd: 0}}>
                            Distribution<br></br>
                            {distribution}
                            </h3>
                            <p style={{width: "40%", fontSize: "20px"}}>date : {anime.date}</p>
                        </div>
                    </div>
                    <div className='container-moreinfo-anime'>
                        <div className="container-content-info-anime">
                            <p style={{fontSize: "20px"}}>genre : {anime.genre.slice(1).join(', ')}</p>
                            <p style={{width: "30%", fontSize: "20px"}}>durée: {anime.duree.replace(" ", "").trim()}</p>
                        </div>
                        <div className="container-saison-anime">
                            <h3 style={{fontSize: "20px"}}>saison : {anime.saison}</h3>
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
                        <div className="container-episode-anime">
                            {lecteur.Lecteur ? lecteur.Lecteur.map(elem => {
                                return <div className='vod-anime'>
                                    <h2>{elem[0].episode}</h2>
                                    <h2>lecteur : 
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                '& > *': {
                                                m: 1,
                                                },
                                            }}>
                                    <ButtonGroup size="small" aria-label="small button group">
                                        {buttons}
                                    </ButtonGroup>
                                    </Box></h2> 
                                    {/*<iframe src={elem[0].lien}></iframe>*/}
                                </div>
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