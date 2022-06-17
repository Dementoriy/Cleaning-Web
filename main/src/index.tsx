import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './components/sideBar/SideBar';
import SignIn from './components/auth/SignIn';
import SignOn from './components/auth/SignOn';
import ServicesGroup from './components/services/ServicesGroup';
import ProfileGroup from './components/profile/ProfileGroup';
import MyCleaningGroup from './components/myCleaning/MyCleaningGroup';
import StepOne from './components/toOrder/StepOne';
import StepTwo from './components/toOrder/StepTwo';
import StepThree from './components/toOrder/StepThree';
import StepFour from './components/toOrder/StepFour';
import reportWebVitals from './reportWebVitals';
import {Stack} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from './redux/store';
import CssBaseline from '@mui/material/CssBaseline';
//import RobotoWoff2 from './fonts/Raleway-Regular.woff2'

export const outerTheme = createTheme({
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
    fontFamily: ['"Raleway"', '"Roboto"',].join(','),
    "fontWeightMedium": 500,
    "fontWeightLight": 500,
    "fontWeightRegular": 500,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Roboto';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Roboto'), local('Roboto-Regular');
          unicodeRang": U+0030-0039;
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
              <Route path={"/"} element={<SignIn />} />
              <Route path={"registration"} element={<SignOn />} />
              <Route path={"profile"} element={<ProfileGroup />} />
              <Route path={"services"} element={<ServicesGroup />} />
              <Route path={"my-cleaning"} element={<MyCleaningGroup />} />
              <Route path={"to-order-one"} element={<StepOne />} />
              <Route path={"to-order-two"} element={<StepTwo />} />
              <Route path={"to-order-three"} element={<StepThree />} />
              <Route path={"to-order-four"} element={<StepFour />} />
            </Routes>
          </Stack>
        </BrowserRouter>
      </ThemeProvider>
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
