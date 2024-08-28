import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useMain } from "../../contexts/MainContext"
import { useNavigate } from 'react-router-dom'
import ScoreboardButton from "../../components/ScoreboardButton"
import ChannelDropdown, { FIRST_OPTION_VALUE_DROPDOWN } from "../../components/ChannelDropdown"
import { getAllListChannel } from '../../api/appScore'

const StartPage = () => {
    const { setUser, setChannel, joinGame, appList } = useMain()
    const navigate = useNavigate()
    const [name, setName] = useState<string>("John Doe")
    const [channelName, setChannelName] = useState<string>(FIRST_OPTION_VALUE_DROPDOWN)
    const [appNameLists, setAppNameLists] = useState<string[]>([])

    const [newChannelName, setNewChannelName] = useState<string>("")

    useEffect(() => {
        async function GetAllListChannel() {
            try {
                const data = await getAllListChannel()
                setAppNameLists(() => [...data])
            } catch (error) {
                console.error(error)
                alert("Error")
            }
        }

        GetAllListChannel()
    }, [])

    useEffect(() => {
        setAppNameLists([...appList])
    }, [appList])

    const onStartBtnClick = () => {
        if(channelName && channelName !== FIRST_OPTION_VALUE_DROPDOWN){
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
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <TextField
                            label="Create new channel"
                            onChange={e => setNewChannelName(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        variant="outlined" sx={{ marginTop: 1 }}
                        onClick={() => {
                            if(newChannelName.trim() !== ""){
                                setAppNameLists(p => {
                                    if (p.includes(newChannelName)) return p
                                    return [newChannelName, ...p]
                                })
                                setChannelName(newChannelName)
                            }else{
                                alert("Please input channel name")
                            }
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