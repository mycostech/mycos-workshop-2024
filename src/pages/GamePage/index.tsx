import { Box, Grid, Typography } from "@mui/material"
import { useMain } from "../../contexts/MainContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Game from "./GameLogic"

const GamePage = () => {
    const navigate = useNavigate()
    const { user } = useMain()

    useEffect(() => {
        if(!user) navigate('/')
    }, [user, navigate])

    return(
        <Box>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h1">
                        Welcome {user}
                    </Typography>
                </Grid>
                <Grid xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Game/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default GamePage