import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useMain } from "../../contexts/MainContext"
import { useNavigate } from 'react-router-dom'
import ScoreboardButton from "../../components/ScoreboardButton"
import { v4 as uuid } from 'uuid'
import ChannelDropdown from "../../components/ChannelDropdown"

const StartPage = () => {
    const { setUser, setChannel, joinGame, getAllAppsName, isConnect, appList } = useMain()
    const navigate = useNavigate()
    const [name, setName] = useState<string>("John Doe")
    const [channelName, setChannelName] = useState<string>("")
    const [appNameLists, setAppNameLists] = useState<string[]>([])

    useEffect(() => {
        if(isConnect){
            getAllAppsName()
        }
    }, [getAllAppsName, isConnect])

    useEffect(() => {
        setAppNameLists([...appList])
    }, [appList])

    const onStartBtnClick = () => {
        if(channelName){
            setUser(name)
            joinGame(channelName)
            setChannel(channelName)
            navigate('/game', {state: {}})
        }else{
            alert("Please select channel.")
        }
    }

    const onScoreboardClick = () => {
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
                   <ChannelDropdown
                    appNameLists={appNameLists}
                    channelName={channelName}
                    onChange={(val) => setChannelName(val)}
                   />
                    <Button
                        variant="outlined" sx={{ marginTop: 1 }}
                        onClick={() => {
                            const newRoomId = uuid()
                            setAppNameLists(p => [newRoomId, ...p])
                            setChannelName(newRoomId)
                        }}
                    >
                        Create new room.
                    </Button>
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