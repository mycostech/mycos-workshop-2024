import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useMain } from "../../contexts/MainContext"
import { useNavigate } from 'react-router-dom'

const StartPage = () => {
    const { setUser } = useMain()
    const navigate = useNavigate()
    const [name, setName] = useState<string>("John Doe")

    const onStartBtnClick = () => {
        setUser(name)
        navigate('/game')
    }

    return(
        <Box>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h1">Color Dot Game</Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        required
                        label="Input Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} pt={1}>
                    <Button variant="contained" onClick={onStartBtnClick}>
                        Start
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StartPage