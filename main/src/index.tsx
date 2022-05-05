import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './components/sideBar/SideBar';
import AuthGroup from './components/auth/AuthGroup';
import ServicesGroup from './components/services/ServicesGroup'
import ProfileGroup from './components/profile/ProfileGroup'
import MyCleaningGroup from './components/myCleaning/MyCleaningGroup'
import reportWebVitals from './reportWebVitals';
import {Stack} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#776D61',
    },
    secondary: {
      main: '#D8D0C5',
    },
    success: {
      main: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: [
      '"Raleway"',
      '"Roboto"',
    ].join(','),
    // fontWeight: '500',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-weight: 500;
          }
      `,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={outerTheme}>
      <BrowserRouter>
        <Stack direction="row" spacing={3}>
          <SideBar />
          <Routes>
            <Route path={"/"} element={<AuthGroup />} />
            <Route path={"/Profile"} element={<ProfileGroup />} />
            <Route path={"/Services"} element={<ServicesGroup />} />
            <Route path={"/MyCleaning"} element={<MyCleaningGroup />} />
          </Routes>
        </Stack>
      </BrowserRouter>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
