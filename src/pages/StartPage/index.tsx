import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useMain } from "../../contexts/MainContext"
import Logo from '../../assets/full-logo.png';
import { useNavigate } from "react-router-dom";
import ChannelDropdown, { FIRST_OPTION_VALUE_DROPDOWN } from "../../components/ChannelDropdown";
import { getAllListChannel } from "../../api/appScore";

const StartPage = () => {
    const { setUser, setChannel, joinGame, appList } = useMain()
    const navigate = useNavigate()
    
    // TO DO: Create State.
    // Create state for contain name that user type
    const [name, setName] = useState<string>("John Doe")

    // Create state for contain channel that user select (string)
    const [channelName, setChannelName] = useState<string>(FIRST_OPTION_VALUE_DROPDOWN)
    
    // Create state for contain channel list (string[])
    const [appNameLists, setAppNameLists] = useState<string[]>([])

    // Create state for contain new chanel that user type in textfield (string)
    const [newChannelName, setNewChannelName] = useState<string>("")

    useEffect(() => {
        // TO DO.

        // When page is rendered.
        // Call getAllListChannel() for get all channel list.
        // And save those to state
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


    const onStartBtnClick = () => {
        // TO DO.

        // Logic for when user click on start button
        // if channel name is not null and is not "Select..."
        if (channelName && channelName !== FIRST_OPTION_VALUE_DROPDOWN) {
            // set name to User state (from global state [context])
            // Call joinGame(channelName) for join channel game
            // set channel name  to Channel state (from global state [context])
            // finally, navigate to game page
            setUser(name)
            joinGame(channelName)
            setChannel(channelName)
            navigate('/game', { state: {} })
        } else {
            // if channel name is null or is "Select..."
            // Alert warning message.
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
                    
                    {/*TO DO: Create dropdown for show channel list */}
                    <ChannelDropdown
                        appNameLists={appNameLists}
                        channelName={channelName}
                        onChange={(val) => setChannelName(val)}
                    />
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        {/* Create textfield for input channel name that need to create new. */}
                        <TextField
                            label="Create new channel"
                            onChange={e => setNewChannelName(e.target.value)}
                        />
                    </FormControl>
                    <Grid item xs={12} sm={6}>
                        {/* TO DO: Create button for create new channel */}
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
                        {/* TO DO: Create textfield for input player name */}
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
                       {/* TO DO: Create button for play game */}
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