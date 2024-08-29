import { Box, Grid, Typography, } from "@mui/material"
import { useMain } from "../../contexts/MainContext"
import { useEffect } from "react"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SearchIcon from '@mui/icons-material/Search';
import GamLogo from '../../assets/game-logo.png';

const FlashingText = ({ begin, second, third, last, text } : {begin : string, second: string, third:string, last : string, text : string}) => {
    return (
      <Box>
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 'bold',
            animation: 'flash 2s infinite',
            '@keyframes flash': {
             '0%': { color: begin },  // Start with first color
            '33%': { color: second }, // Change to second color
            '66%': { color: third },   // Change to third color
            '100%': { color: last }  // Back to the first color
            }
          }}
        >
          {text}
        </Typography>
      </Box>
    );
  };

const GamePage = () => {
    const {} = useMain();
    //  TO DO: Create new state
    // Create state for contain highest score (int)
    // Create constant for contain level
    // Create constant for contain stage

    useEffect(() => {
        // TO DO:
        //when render page
        // if user is null
        // redirect to home page.
    }, [])

    useEffect(() => {
        // TO DO:
        // Show toast to notify a highest score (now) to user

    },[])

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            backgroundColor: '#1E1E1E',
                            borderRadius: 3,
                            padding: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                            marginBottom: '16px',
                            alignItems: 'center',
                            gap: 1
                        }}>
                        <VideogameAssetIcon color="warning" sx={{ fontSize: 40 }} />
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <FlashingText begin="#D81E5B" second="#1876d2" third="#53b5a0" last="#FFC300" text="HUE" />
                        </Box>

                        <Typography sx={{ fontSize: 32 }} fontWeight={'bold'} color={'#00B140'}>Hunter</Typography>
                        <SearchIcon color="secondary" sx={{ fontSize: 40, color: '#FFC300' }} />
                    </Box>
                </Grid>
                <Grid item xs={6} sm={8}>

                </Grid>

                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',
                        backgroundColor: '#1E1E1E',
                        borderRadius: 3,
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/*TO DO: Show player name */}
                        
                        {/*TO DO: Show channel name */}

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/*TO DO: Show active player count */}
                    </Box>

                    {/* Game content */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            marginY: 2,
                            padding: '24px'
                        }}
                    >
                        {/*TO DO: Render Game component */}
                    </Box>

                    {/* Footer */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/*TO DO: Show total level number */}
                        </Box>
                        <Box component="img" sx={{
                            height: 72
                        }} src={GamLogo}></Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/*TO DO: Show highest score */}
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    )
}

export default GamePage
