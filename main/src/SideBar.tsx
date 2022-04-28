import React from 'react';
import {TextField, Typography, Avatar, Stack, Button} from "@mui/material";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

function SideBar() {
    return (
      <div style={{backgroundColor: '#B1A18B', marginTop: '-7px', height: 'auto', padding: '10px', width: '250px'}}>
          <Typography variant="h4">Чистый дом</Typography>
      </div>
    );
  }

  
export default SideBar;