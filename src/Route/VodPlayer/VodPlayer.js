import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { cyan, purple } from '@mui/material/colors';
import './style/VodPlayer.css'


const VodPlayer = ({ep}) => {

    const [lecteur, setLecteur] = useState(ep.current_episode)

    console.log(ep)


    const switchLecteur = (nameOfLecteur) => {
        let newLecteur = ep.current_episode.filter(lecteur => lecteur[0].format_VOD === nameOfLecteur)
        setLecteur(newLecteur)
        console.log(newLecteur)
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
                            <h1>{ep.name.split("Saison")[0] + " " + lecteur[0][0].episode}</h1>
                        </div>
                        <div className='iframe-container'>
                            <iframe className='iframe' src={lecteur[0][0].lien}></iframe>
                        </div>
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
                                    <ColorButton variant="contained">Episode précédent</ColorButton>
                                    <ColorButton variant="contained">Episode suivant</ColorButton>
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VodPlayer