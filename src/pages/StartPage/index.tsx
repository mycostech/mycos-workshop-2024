import { Box, FormControl, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useMain } from "../../contexts/MainContext"
import Logo from '../../assets/full-logo.png';

const StartPage = () => {
    const { } = useMain()

    // TO DO: Create State.
    // Create state for contain name that user type

    // Create state for contain channel that user select (string)

    // Create state for contain channel list (string[])

    // Create state for contain new chanel that user type in textfield (string)


    useEffect(() => {
        // TO DO.

        // When page is rendered.
        // Call getAllListChannel() for get all channel list.
        // And save those to state
    }, [])


    const onStartBtnClick = () => {
        // TO DO.

        // Logic for when user click on start button
        // if channel name is not null and is not "Select..."
        // set name to User state (from global state [context])
        // Call joinGame(channelName) for join channel game
        // set channel name  to Channel state (from global state [context])
        // finally, navigate to game page

        // if channel name is null or is "Select..."
        // Alert warning message.
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
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        {/* Create textfield for input channel name that need to create new. */}
                    </FormControl>
                    <Grid item xs={12} sm={6}>
                        {/* TO DO: Create button for create new channel */}
                    </Grid>

                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={2}>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        {/* TO DO: Create textfield for inpurt player name */}
                    </FormControl>
                </Grid>
                <Grid container item xs={12} pt={1} p={2} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                       {/* TO DO: Create button for play game */}
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}

export default StartPage