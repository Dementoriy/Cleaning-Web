import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './components/sideBar/SideBar';
import AuthGroup from './components/auth/AuthGroup';
import ServicesGroup from './components/services/ServicesGroup';
import DopServicesGroup from './components/dopServices/DopServicesGroup';
import ProfileGroup from './components/profile/ProfileGroup';
import MyCleaningGroup from './components/myCleaning/MyCleaningGroup';
import ToOrderGroup from './components/toOrder/ToOrderGroup';
import reportWebVitals from './reportWebVitals';
import {Stack} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from './redux/store';

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
    <Provider store={store}>
      <ThemeProvider theme={outerTheme}>
        <BrowserRouter>
          <Stack direction="row" spacing={3} height="100%">
            <SideBar />
            <Routes>
              <Route path={"/"} element={<AuthGroup />} />
              <Route path={"profile"} element={<ProfileGroup />} />
              <Route path={"services"} element={<ServicesGroup />} />
              <Route path={"dop-services"} element={<DopServicesGroup />} />
              <Route path={"my-cleaning"} element={<MyCleaningGroup />} />
              <Route path={"to-order"} element={<ToOrderGroup />} />
            </Routes>
          </Stack>
        </BrowserRouter>
      </ThemeProvider>
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
