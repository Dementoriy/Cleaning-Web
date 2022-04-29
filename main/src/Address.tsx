import React from 'react';
import {TextField, Typography, Avatar, Stack, Button, Grid, Paper} from "@mui/material";

import { createTheme, ThemeProvider, makeStyles } from '@mui/material/styles';

function Address() {
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', marginRight: '17px',width: '33%'}}>
        <Typography variant="h4" align='center'>Мои адреса</Typography>
    </div>
  );
}

export default Address;