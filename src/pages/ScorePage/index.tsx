import { useEffect, useState } from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useMain } from "../../contexts/MainContext"
import ChannelDropdown, { FIRST_OPTION_VALUE_DROPDOWN } from "../../components/ChannelDropdown"
import { getAllListChannel, getScoreByAppName } from "../../api/appScore"
import DataTable from "./Table"

interface IScoreList{[key: string]: number}

export default function ScorePage(){
    const navigate = useNavigate()
    
    const { joinGame } = useMain()

    // TO DO: Create new State
    // Create state for contain list of channels (string[])
    const [appNameLists, setAppNameLists] = useState<string[]>([])

    // Create state for contain channel choice selected (string)
    const [channelId, setChannelId] = useState<string | null>(FIRST_OPTION_VALUE_DROPDOWN)
    
    // Create state for contain score (type: IScoreList)
    const [scoreList, setScoreList] = useState<IScoreList>({})

    useEffect(() => {
        // TO DO:
        /*
            When render this page
            call getAllListChannel() function to get all channel list.
            And set to state.
        */
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

    const onSelectChannel = async(channelIdSelected: string) => {
        // TO DO:
        // Function for get score by channel
        // and render score in table
        if(channelIdSelected !== FIRST_OPTION_VALUE_DROPDOWN){
            setChannelId(channelIdSelected)
            try {
                const res = await getScoreByAppName(channelIdSelected)
                setScoreList(res)
                joinGame(channelIdSelected)
            } catch (error) {
                console.error(error)
                alert(`Can't get score from server.`)
            }
           }
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
                    TO DO:
                    Render channel dropdown 
                   */}
                    <ChannelDropdown
                        appNameLists={appNameLists}
                        channelName={channelId || ""}
                        onChange={(val) => onSelectChannel(val)}
                    />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    {/*TO DO: Render data table for show score */}
                    <DataTable
                        data={scoreList}
                    />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={1}>
                    {/*TO DO: Render button for back to home */}
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        Back to Home
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}