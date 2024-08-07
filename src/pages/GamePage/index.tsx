import { Box, Grid, Typography } from "@mui/material"
import { useMain } from "../../contexts/MainContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const GamePage = () => {
    const navigate = useNavigate()
    const { user } = useMain()

    useEffect(() => {
        if(!user) navigate('/')
    }, [user])

    return(
        <Box>
            <Grid container>
                <Grid item xl={12}>
                    <Typography variant="h1">
                        Welcome {user}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default GamePage