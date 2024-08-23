import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartPage from './StartPage';
import GamePage from './GamePage';
import ScorePage from './ScorePage';

const MainPage = () => {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<StartPage/>} />
                <Route path='/game' element={<GamePage/>} />
                <Route path='/score' element={<ScorePage/>}/>
            </Routes>
        </Router>
    )
}

export default MainPage