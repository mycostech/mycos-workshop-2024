import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useMain } from "../../contexts/MainContext"
import { useNavigate } from 'react-router-dom'
import ScoreboardButton from "../../components/ScoreboardButton"
import ChannelDropdown, { FIRST_OPTION_VALUE_DROPDOWN } from "../../components/ChannelDropdown"
import { getAllListChannel } from '../../api/appScore'
import Logo from '../../assets/full-logo.png';
import { toast } from "react-toastify"

const StartPage = () => {
    const { setUser, setChannel, joinGame, appList, scoreList } = useMain()
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
        if (channelName && channelName !== FIRST_OPTION_VALUE_DROPDOWN) {
            setUser(name)
            joinGame(channelName)
            setChannel(channelName)
            navigate('/game', { state: {} })
        } else {
            alert("Please select channel.")
        }
    }

    return (
        <Box>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box component="img" sx={{
                        // height: 108
                    }} src={Logo}></Box>
                </Grid>
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} p={2} justifyContent="center">
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
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="outlined" sx={{ marginTop: 1 }}
                            onClick={() => {
                                if (newChannelName.trim() !== "") {
                                    setAppNameLists(p => {
                                        if (p.includes(newChannelName)) return p
                                        return [newChannelName, ...p]
                                    })
                                    setChannelName(newChannelName)
                                } else {
                                    alert("Please input channel name")
                                }
                            }}
                            fullWidth
                        >
                            Create new channel
                        </Button>
                    </Grid>

                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={2}>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <TextField
                            required
                            label="Input Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                        />
                    </FormControl>
                </Grid>
                <Grid container item xs={12} pt={1} p={2} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" onClick={onStartBtnClick} fullWidth>
                            Play
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}

export default StartPage