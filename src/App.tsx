import './App.css'

import MainPage from './pages'
import { ThemeProvider } from '@mui/material/styles';
import { MainProvider } from './contexts/MainContext'
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <MainProvider>
        <ThemeProvider theme={theme}>
          <MainPage />
        </ThemeProvider>
      </MainProvider>
    </BrowserRouter>
  )
}

export default App
