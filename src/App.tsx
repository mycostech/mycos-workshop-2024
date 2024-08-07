import './App.css'

import MainPage from './pages'
import { ThemeProvider } from '@mui/material/styles';
import { MainProvider } from './contexts/MainContext'
import theme from './theme';

function App() {

  return (
    <MainProvider>
      <ThemeProvider theme={theme}>
        <MainPage/>
      </ThemeProvider>
    </MainProvider>
  )
}

export default App
