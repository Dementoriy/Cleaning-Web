import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SideBar from './SideBar';
import Address from './Address';
import Services from './Services';
import DopServices from './DopServices';
import AuthGroup from './AuthGroup';
import ServicesGroup from './ServicesGroup'
import Filters from './Filters';
import ProfileGroup from './ProfileGroup'
import reportWebVitals from './reportWebVitals';
import {Stack} from "@mui/material";
import { createTheme, ThemeProvider, makeStyles } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#776D61',
    },
    secondary: {
      main: '#D8D0C5',
    },
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
          </Routes>
        </Stack>
      </BrowserRouter>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
