import { Box, Grid, Typography, } from "@mui/material"
import { useMain } from "../../contexts/MainContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SearchIcon from '@mui/icons-material/Search';
import Game from "./GameLogic"
import GamLogo from '../../assets/game-logo.png';

const FlashingText = ({ begin, second, last, text } : {begin : string, second: string, last : string, text : string}) => {
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
            '66%': { color: last },   // Change to third color
            '100%': { color: begin }  // Back to the first color
            }
          }}
        >
          {text}
        </Typography>
      </Box>
    );
  };
const GamePage = () => {
    const navigate = useNavigate()
    const { user, channel } = useMain();

    const [highestScore, setHighestScore] = useState<number>(0);
    const [totalPalyers, setPlayers] = useState<number>(0);
    const levels = 4;
    const stages = 4;

    useEffect(() => {
        if (!user) navigate('/')
    }, [user, navigate])

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
                            <FlashingText begin="#D81E5B" second="#1876d2" last="#FFC300" text="H" />
                            <FlashingText begin="#1876d2" second="#FFC300" last="#D81E5B" text="U" />
                            <FlashingText begin="#FFC300" second="#D81E5B" last="#1876d2" text="E" />
                        </Box>

                        <Typography sx={{ fontSize: 32 }} fontWeight={'bold'} color={'#00B140'}>Hunter</Typography>
                        {/* <Typography sx={{ fontSize: 32 }} fontWeight={'bold'} color={'#FFC300'}>Game</Typography> */}
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
                        <Typography sx={{ color: '#fff', fontSize: 14 }}>Player : {user}</Typography>
                        <Typography sx={{ color: '#fff', fontSize: 14 }}>Channel : {channel}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: '#fff', fontSize: 14 }}>Active Payers : {0}</Typography>
                    </Box>
                    {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ minWidth: 35 }}>
                        <Typography sx={{ color: '#fff', fontSize: 14 }}>Timer</Typography>
                        </Box>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={50}
                                sx={{ height: 12, borderRadius: 5, backgroundColor: '#C4C4C4' }}
                            />
                        </Box>

                    </Box> */}


                    {/* Tetris Grid Placeholder */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            backgroundColor: '#fff',
                            borderRadius: 2,
                            marginY: 2,
                            padding: '24px'
                        }}
                    >
                        <Game levels={levels} stages={stages} onSubmitScores={(score) => {
                            if (score > highestScore) {
                                setHighestScore(score);
                            }
                        }} />
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
                            <Typography sx={{ color: '#fff', fontSize: 12 }}>Total Levels</Typography>
                            <Typography sx={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{levels}</Typography>
                        </Box>
                        <Box component="img" sx={{
                            height: 72
                        }} src={GamLogo}></Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography sx={{ color: '#fff', fontSize: 12 }}>Your Highest Score</Typography>
                            <Typography sx={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{highestScore}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    )
}

export default GamePage