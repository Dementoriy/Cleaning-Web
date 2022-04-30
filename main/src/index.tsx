import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SideBar from './SideBar';
import Address from './Address';
import Services from './Services';
import DopServices from './DopServices';
import SignIn from './SignIn';
import SignOn from './SignOn';
import reportWebVitals from './reportWebVitals';
import {Stack} from "@mui/material";
import { createTheme, ThemeProvider, makeStyles } from '@mui/material/styles';

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
      <Stack direction="row" spacing={3}>
        <SideBar />
        <SignOn />
        <Address />
      </Stack>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
