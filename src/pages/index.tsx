import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';
import GamePage from './GamePage';

const MainPage = () => {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<StartPage/>} />
                <Route path='/game' element={<GamePage/>} />
            </Routes>
        </Router>
    )
}

export default MainPage