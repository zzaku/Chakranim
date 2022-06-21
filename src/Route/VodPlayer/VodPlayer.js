import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { cyan, grey } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './style/VodPlayer.css'
import Backdrop from '@mui/material/Backdrop';

const VodPlayer = ({ep, setEp, epFilter}) => {

    const [lecteur, setLecteur] = useState(ep.current_episode)
    const [next, setNext] = useState(false)
    const [checked, setChecked] = useState(true)

    const iframeContainer = useRef()

    let currentEp = ep.current_episode[0][0].episode
    let epMax = ep.all_episode[ep.all_episode.length-1][0].episode
    let epMin = ep.all_episode[0][0].episode
    
    
    const goToNextEP = (current_episode) => {
        let nbrOfNextEp = ep.all_episode.find(elem => elem[0].episode === current_episode.split(" ")[0] + " 0" + (parseInt(current_episode.split(" ")[1])+1).toString())
            if(nbrOfNextEp === undefined){

            } else {
                setEp({...ep, current_episode: epFilter(ep.all_episode, nbrOfNextEp[0].episode)})
            }
            
    }

    const goToPreviousEP = (current_episode) => {
        let nbrOfNextEp = ep.all_episode.find(elem => elem[0].episode === current_episode.split(" ")[0] + " 0" + (parseInt(current_episode.split(" ")[1])-1).toString())
        if(nbrOfNextEp === undefined){

        } else {
            setEp({...ep, current_episode: epFilter(ep.all_episode, nbrOfNextEp[0].episode)})
        }
    }
    
    const switchLecteur = (nameOfLecteur) => {
        let newLecteur = ep.current_episode.filter(lecteur => lecteur[0].format_VOD === nameOfLecteur)
        setNext(false)
        setLecteur(newLecteur)
        console.log(newLecteur)
    }

    console.log(checked)
    const setModCinema = () => {
        if(checked){
            iframeContainer.current.style.width = "69%"
            iframeContainer.current.style.height = "98%"
            iframeContainer.current.style.boxShadow = "1px 5px 50px white"
        } else {
            iframeContainer.current.style.width = "100%"
            iframeContainer.current.style.height = "100%"
            iframeContainer.current.style.boxShadow = ""
        }
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(cyan[700]),
        backgroundColor: cyan[700],
        '&:hover': {
          backgroundColor: cyan[900],
        },
        display: "flex",
        height: "50%",
        color: "white"
      }));


    return (
        <div className='container-vod-player'>
            <div className='vod'>
                <div className='watch'>
                    <div className='watch-container'>
                        <div className='title'>
                            <h1>{ep.name.split("Saison")[0] + " " + ep.current_episode[0][0].episode}</h1>
                        </div>
                            <Backdrop
                            style={{display: "flex", width: "100%", height: "75.9%", top: "10%"}}
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={!checked}
                            >
                                <div className='iframe-container' ref={iframeContainer}>
                                    {next ? <iframe className='iframe' src={ep.current_episode[0][0].lien}></iframe> : <iframe className='iframe' src={lecteur[0][0].lien}></iframe>}
                                </div>
                            </Backdrop>
                        <div className='watch-content'>
                            <div className='lecteur-container'>
                                <h2>Lecteurs</h2>
                                <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    '& > *': {
                                    m: 1,
                                    },
                                }}
                                >
                                    <ButtonGroup style={{backgroundColor: "black"}} size="large" aria-label="large button group">
                                        {ep.current_episode.map((episode, index) => {  
                                            if(index === 0){
                                            } else {
                                            return <Button onClick={() => switchLecteur(episode[0].format_VOD)} style={{color: "white"}} key={ep.current_episode[index-1][0].format_VOD} >{ep.current_episode[index-1][0].format_VOD}</Button>
                                            }
                                        })}
                                    </ButtonGroup>
                                </Box>
                            </div>
                            <div className='otherEpisode-content'>
                                <Stack spacing={2} direction="row">
                                    <ColorButton disabled={currentEp === epMin ? true : false} onClick={() => goToPreviousEP(ep.current_episode[0][0].episode) + setNext(true)} variant="contained">Episode précédent</ColorButton>
                                    <ColorButton disabled={currentEp === epMax ? true : false} onClick={() => goToNextEP(ep.current_episode[0][0].episode) + setNext(true)} variant="contained">Episode suivant</ColorButton>
                                </Stack>
                            </div>
                            <div className='cinema-mode'>
                            <FormControlLabel
                                style={{color: "white", backgroundColor: "transparent", borderRadius: "12px", paddingLeft: "10px", border: `2px ${cyan[400]} solid`}}
                                value="mode cinéma"
                                control={<Checkbox />}
                                label="mode cinéma"
                                labelPlacement="start"
                                onChange={() => setChecked(checked === true ? false : true) + setModCinema()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VodPlayer