import { useEffect, useState } from "react"
import { useMain } from "../../contexts/MainContext"
import { Box, Button, Grid, Typography } from "@mui/material"
import DataTable from "./Table"
import { useNavigate } from "react-router-dom"
import ChannelDropdown from "../../components/ChannelDropdown"


export default function ScorePage(){
    const navigate = useNavigate()
    const { scoreList, getLatestScoreFromServer, appList, channel, isConnect, getAllAppsName } = useMain()
    const [state, setState] = useState<boolean>(true)
    const [channelId, setChannelId] = useState<string | null>(channel)

    useEffect(() => {
        if(isConnect && state){
            getAllAppsName()
            setState(false)
        }
    }, [isConnect, state, getAllAppsName])

    const onSelectChannel = (channelIdSelected: string) => {
        setChannelId(channelIdSelected)
        getLatestScoreFromServer(channelIdSelected)
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
                    <ChannelDropdown
                        appNameLists={appList}
                        channelName={channelId || ""}
                        onChange={(val) => onSelectChannel(val)}
                    />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <DataTable
                        data={scoreList}
                    />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={1}>
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