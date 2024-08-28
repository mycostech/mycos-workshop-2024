import { Route, Routes, NavLink } from 'react-router-dom';
import StartPage from './StartPage';
import GamePage from './GamePage';
import ScorePage from './ScorePage';
import { Box, Container } from '@mui/material';

const MainPage = () => {
    return (
        <div>
            {/* Top Navigation Bar */}
            <Box
                sx={{
                    typography: 'body1',
                    '& > :not(style) ~ :not(style)': {
                        ml: 2,
                    },
                }}
                onClick={e => e.preventDefault()}
            >
                <NavLink to={'/'} style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? 'bold' : '',
                        textDecoration: isActive ? 'underline' : 'none',
                        color: isActive ? 'primary.main' : 'text.secondary'
                    };
                }}>Home</NavLink>
                <NavLink to={'/score'} style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? 'bold' : '',
                        textDecoration: isActive ? 'underline' : 'none',
                        color: isActive ? 'primary.main' : 'text.secondary'
                    };
                }} >Score Board</NavLink>
            </Box>

            {/* Main Content Area */}
            <Container maxWidth="md" sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: '100%',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: '#fefefe',
                        textAlign: 'center',
                    }}
                >
                    <Routes>
                        <Route path='/' element={<StartPage />} />
                        <Route path='/game' element={<GamePage />} />
                        <Route path='/score' element={<ScorePage />} />
                    </Routes>
                </Box>
            </Container>
        </div>


    )
}

export default MainPage