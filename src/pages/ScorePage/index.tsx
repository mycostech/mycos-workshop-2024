import { useEffect } from "react"
import { Box, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useMain } from "../../contexts/MainContext"

interface IScoreList{[key: string]: number}

export default function ScorePage(){
    const navigate = useNavigate()
    
    const { } = useMain()
    // Create state for contain list of channels (string[])
    // Create state for contain channel choice selected (string)
    
    // Create state for contain score (type: IScoreList)

    useEffect(() => {
        /*
            When render this page
            call getAllListChannel() function to get all channel list.
            And set to state.
        */
       
    }, [])

    const onSelectChannel = async(channelIdSelected: string) => {
        // Function for get score by channel
        // and render score in table
    }

    return(
        <Box>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography variant="h1">
                        Scoreboard
                    </Typography>   
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={1}>
                   {/* 
                    Render channel dropdown 
                   */}
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    {/* Render data table for show score */}
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={1}>
                    {/* Render button for back to home */}
                </Grid>
            </Grid>
        </Box>
    )
}