import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SideBar from './SideBar';
import reportWebVitals from './reportWebVitals';
import {Stack} from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <Stack direction="row" spacing={3}>
      <SideBar />
      <App />
    </Stack>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
