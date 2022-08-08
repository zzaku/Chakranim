import { useContext, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { cyan } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import { Link } from 'react-router-dom';
import './style/VodPlayer.css'
import { useMediaQuery } from '@mui/material';
import { epContext } from '../../App';

const VodPlayer = ({}) => {

    const context = useContext(epContext)
    const ep = context.ep
    const setEp = context.setEp
    const [lecteur, setLecteur] = useState(ep.current_episode)
    const [next, setNext] = useState(false)
    const [checked, setChecked] = useState(false)
    const iframeContainer = useRef()
    const backgroundRef = useRef()
    const modeCineRef = useRef()
    const movieBtnRef = useRef()
    const otherEpisodeRef = useRef()
    const mobile = useMediaQuery('(max-width:968px)')
    let currentEp = !ep.current_episode ? null : ep.current_episode[0] && ep.current_episode[0][0].episode
    let epMax = !ep.current_episode ? null : ep.current_episode[0] && ep.all_episode[ep.all_episode.length-1][0].episode
    let epMin = !ep.current_episode ? null : ep.current_episode[0] && ep.all_episode[0][0].episode
    let urlEp = !ep.current_episode ? null : ep.current_episode[0] && ep.current_episode[0][0].episode.split(" ")[0] + " "
    let urlEpNext  = !ep.current_episode ? null : ep.current_episode[0] && "0" +(parseInt( ep.current_episode[0][0].episode.split(" ")[1])+1).toString()
    let urlEpPrevious  = !ep.current_episode ? null : ep.current_episode[0] && "0" +(parseInt( ep.current_episode[0][0].episode.split(" ")[1])-1).toString()

    
    const epFilter = (tab, episode) => {
        return  tab.filter((elem) => elem[0].episode === episode)
    }

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
    }

    const setModCinema = () => {
        if(!checked){
            iframeContainer.current.style.width = "65.3%";
            iframeContainer.current.style.height = "70.6%";
            iframeContainer.current.style.boxShadow = "1px 5px 70px white";
            backgroundRef.current.style.opacity = "0.2";
            modeCineRef.current.style.position = "absolute";
            modeCineRef.current.style.right = "10%";
            modeCineRef.current.style.zIndex = "2000";
            modeCineRef.current.style.top = "87%";
            otherEpisodeRef.current.style.height = "auto";
            otherEpisodeRef.current.style.marginTop = "5%";
        } else {
            iframeContainer.current.style.width = "100%";
            iframeContainer.current.style.height = "100%";
            backgroundRef.current.style.opacity = "0.5";
            iframeContainer.current.style.boxShadow = "";
            modeCineRef.current.style.position = "";
            modeCineRef.current.style.right = "10%";
            modeCineRef.current.style.zIndex = "0";
            modeCineRef.current.style.top = "0";
            otherEpisodeRef.current.style.height = "auto";
            otherEpisodeRef.current.style.marginTop = "0";
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
      }));

      const addToMostWatchedScore = async () => {
        let score = 0
        let multiplicator = 1.3

        await fetch(`${process.env.REACT_APP_API_ANIME}/VOD/anime/${ep.id}`)
        .then(res => res.json())
        .then(data => multiplicator *= data.score_most_watched)

        await fetch(`${process.env.REACT_APP_API_ANIME}/VOD/anime/score`, {
          method: "PATCH",
          headers: {"Content-type": "application/json;charset=UTF-8"},
          body: JSON.stringify({
            id: ep.id,
            score: multiplicator.toFixed(0)
          })
        })
      }

    return (
        <div className='container-vod-player'>
            <div ref={backgroundRef} style={{position: 'absolute', height: "100%", width: "100%", backdropFilter: "blur(5px)", opacity: "0.5"}}>
                <img alt={ep.name} src={ep.image} style={{display: "flex", height: "90%", width: "100%"}}/>
                <div className='shadows' style={{display: "flex", height: "10%", width: "100%"}}></div>
            </div>
            <div className='vod'>
                <div className='watch'>
                    <div className='watch-container'>
                        <div className='title'>
                            <h1>{!ep.current_episode ? null : ep.current_episode[0] && ep.name.split("Saison")[0] + " " + ep.current_episode[0][0].episode}</h1>
                        </div>
                        <div className='iframe-container' ref={iframeContainer}>
                            {!checked ? next ? <iframe title='VOD' allowFullScreen className='iframe' src={!ep.current_episode ? null : ep.current_episode[0] && ep.current_episode[0][0].lien}></iframe> : <iframe allowFullScreen className='iframe' title='VOD' src={lecteur[0] && lecteur[0][0].lien}></iframe> : null}
                        </div>
                            <Backdrop
                            style={{width: "100%", height: "100%"}}
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100 }}
                                open={checked}
                            >
                                <div className='iframe-container' ref={iframeContainer}>
                                    {next ? <iframe className='iframe' title='VOD' allowFullScreen src={!ep.current_episode ? null : ep.current_episode[0][0].lien}></iframe> : <iframe title='VOD' allowFullScreen className='iframe' src={lecteur[0][0].lien}></iframe>}
                                </div>
                            </Backdrop>
                        <div ref={movieBtnRef} className='watch-content'>
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
                                    <ButtonGroup style={{backgroundColor: "black"}} size={!mobile ? "large" : "small"} aria-label="large button group">
                                        {!ep.current_episode ? null : ep.current_episode.map((episode, index) => {  
                                            if(index === 0){
                                                return null
                                            } else {
                                            return <Button key={episode._id} onClick={() => switchLecteur(episode[0].format_VOD)} style={{color: "white"}} >{!ep.current_episode ? null : ep.current_episode[index-1][0].format_VOD}</Button>
                                            }
                                        })}
                                    </ButtonGroup>
                                </Box>
                            </div>
                            <div ref={otherEpisodeRef} className='otherEpisode-content'>
                                <Stack spacing={2} direction="row"  className='buttontogotootherep'>
                                    <Link to={`/watch/${!ep.current_episode ? null : ep.current_episode[0] && ep.name.split("Saison")[0].replaceAll(" ", "-").replaceAll(".", "").replaceAll(",", "").replaceAll("#", "")}/${urlEp && urlEpPrevious && ( urlEp  + urlEpPrevious ).replaceAll(" ", "-")}`} style={{textDecoration: 'none'}}>
                                    {currentEp === epMin ? null : <ColorButton size={!mobile ? "large" : "small"} onClick={() => goToPreviousEP(!ep.current_episode ? null : ep.current_episode[0][0].episode) + setNext(true)} variant="contained"><span>Episode précédent</span></ColorButton>}
                                    </Link>
                                    <Link to={`/watch/${!ep.current_episode ? null : ep.current_episode[0] && ep.name.split("Saison")[0].replaceAll(" ", "-").replaceAll(".", "").replaceAll(",", "").replaceAll("#", "")}/${urlEp && urlEpPrevious && (urlEp + urlEpNext).replaceAll(" ", "-")}`} style={{textDecoration: 'none'}}>
                                    {currentEp === epMax ? null : <ColorButton size={!mobile ? "large" : "small"} onClick={() => goToNextEP(!ep.current_episode ? null : ep.current_episode[0][0].episode) + setNext(true) + addToMostWatchedScore()} variant="contained"><span>Episode suivant</span></ColorButton>}
                                    </Link>
                                </Stack>
                            </div>
                            {!mobile &&
                            <div ref={modeCineRef} className='cinema-mode'>
                            <FormControlLabel
                                style={{color: "white", backgroundColor: "transparent", borderRadius: "12px", paddingLeft: "10px", border: `2px ${cyan[400]} solid`}}
                                value="mode cinéma"
                                control={<Checkbox />}
                                label="mode cinéma"
                                labelPlacement="start"
                                onChange={() => setChecked(checked === true ? false : true) + setModCinema()}
                                />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VodPlayer