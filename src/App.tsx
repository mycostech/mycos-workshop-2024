import './App.css'

import MainPage from './pages'
import { ThemeProvider } from '@mui/material/styles';
import { MainProvider } from './contexts/MainContext'
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <MainProvider>
        <ThemeProvider theme={theme}>
          <MainPage />
          <ToastContainer />
        </ThemeProvider>
      </MainProvider>
    </BrowserRouter>
  )
}

export default App
