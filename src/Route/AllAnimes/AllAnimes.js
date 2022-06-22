import { Grid, Card, CardActionArea, CardMedia, Stack, Pagination, Button } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewTwoTone from "@mui/icons-material/ArrowBackIosNewTwoTone";
import { useState } from "react"
import { useEffect } from "react"
import "./style/AllAnimes.css"


const AllAnimes = () => {

    const [nextPage, setNextPage] = useState(1)
    const [animes, setAnimes] = useState([])
    const [allAnimes, setAllAnimes] = useState([])

    let getAll15Animes = `http://localhost:4000/VOD/allanimes?page=${nextPage}`
    let getAllAnimes = `http://localhost:4000/VOD/allanimes/check`

    useEffect(() => {
        fetch(getAllAnimes)
        .then(res => res.json())
        .then(data => setAllAnimes(data))
    }, [])
    
    useEffect(() => {
        fetch(getAll15Animes)
        .then(res => res.json())
        .then(data => setAnimes(data))
    }, [nextPage])


    let lastPage = Math.trunc(allAnimes/15)


    
    
    return (
        <div className='animes-list'>
            <div className='list-container-anime'>
                <div className="layout-coontainer">
                <div className="pagination">
                        <Stack spacing={10}>
                            {allAnimes.length/15 === Math.trunc(allAnimes.length/15) ? <Pagination count={lastPage} onChange={(e, value) => setNextPage(value)} variant="outlined" color="primary" /> : <Pagination count={Math.trunc(allAnimes.length/15) + 1} onChange={(e, value) => setNextPage(value)} variant="outlined" color="primary" />}
                        </Stack>
                    </div>
                    <div className="grid-container">
                        <Grid container spacing={4} padding="2%">
                            <div className="previouspage">
                                <Button style={{color: "black"}} onClick={() => setNextPage(nextPage-1)}><ArrowBackIosNewTwoTone /></Button>
                            </div>
                            {animes.map(anime => {
                                return(
                                    <>
                                        <Grid item xs={3} md={2.4} >
                                            <Card sx={{ maxWidth: "auto"}}>
                                                <CardActionArea >
                                                    <CardMedia
                                                        component="img"
                                                        height="410"
                                                        image={anime.image}
                                                        alt="green iguana"
                                                    />
                                                    
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </>
                                    )
                                })   
                            }    
                            <div className="nextpage">
                                <Button style={{color: "black"}} onClick={() => setNextPage(nextPage+1)}><ArrowForwardIosIcon /></Button>
                            </div>
                        </Grid>
                    </div>
                    <div className="pagination">
                        <Stack spacing={10}>
                            {allAnimes.length/15 === Math.trunc(allAnimes.length/15) ? <Pagination count={lastPage} onChange={(e, value) => setNextPage(value)} variant="outlined" color="primary" /> : <Pagination count={Math.trunc(allAnimes.length/15) + 1} onChange={(e, value) => setNextPage(value)} variant="outlined" color="primary" />}
                        </Stack>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default AllAnimes