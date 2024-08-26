import { Box, Grid, Typography } from "@mui/material"
import { useMain } from "../../contexts/MainContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Game from "./GameLogic"

const GamePage = () => {
    const navigate = useNavigate()
    const { user, channel } = useMain()

    useEffect(() => {
        if(!user) navigate('/')
    }, [user, navigate])

    return(
        <Box>
            <Grid container>
                <Grid item sm={12}>
                    <Typography variant="h1">
                        Welcome {user}
                    </Typography>
                    <Typography variant="h2">
                        Channel: {channel}
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Game/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default GamePage