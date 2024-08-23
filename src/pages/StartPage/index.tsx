import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useMain } from "../../contexts/MainContext"
import { useNavigate } from 'react-router-dom'
import ScoreboardButton from "../../components/ScoreboardButton"

const GAME_GUID = "c551724b-c8ab-4255-a131-3ac90ec9d0e2"

const StartPage = () => {
    const { setUser, setChannel, joinGame } = useMain()
    const navigate = useNavigate()
    const [name, setName] = useState<string>("John Doe")
    const [channelName, setChannelName] = useState<string>(GAME_GUID)

    const onStartBtnClick = () => {
        setUser(name)
        joinGame(GAME_GUID)
        setChannel(channelName)
        navigate('/game', {state: {

        }})
    }

    const onScoreboardClick = () => {
        setChannel(GAME_GUID)
        joinGame(GAME_GUID)
        navigate('/score')
    }

    return(
        <Box>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h1">Color Dot Game</Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={2}>
                    <Typography variant="h2" p={1}>
                        Select Channel
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel>Channel</InputLabel>
                        <Select
                            value={channelName}
                            label="Channel"
                            onChange={e => setChannelName(e.target.value)}
                        >
                            <MenuItem value={GAME_GUID}>{GAME_GUID}</MenuItem>
                        </Select>
                    </FormControl>
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
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} pt={1}>
                    <ScoreboardButton
                        onScoreboardClick={onScoreboardClick}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default StartPage