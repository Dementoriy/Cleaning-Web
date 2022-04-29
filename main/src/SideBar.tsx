import React from 'react';
import {TextField, Typography, Avatar, Stack, Button} from "@mui/material";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

function SideBar() {
    return (
      <div style={{backgroundColor: '#B1A18B', marginTop: '-7px', height: 'auto', padding: '10px', width: '13%'}}>
          <Stack direction="row" spacing={1}>
            <img src="./assets/icons/logo.png" alt="logo"></img>
            <Typography variant="h5" style={{color: 'FFFF'}}>Чистый дом</Typography>
          </Stack>
          <Stack spacing={1} marginTop={16}>
            <Avatar alt="Avatar" src="./assets/image/ava.png" sx={{ width: 140, height: 140 }}/>
            <Typography variant="h6" style={{color: 'FFFF'}}>Adam</Typography>
          </Stack>
          <Stack spacing={1} marginTop={8}>
            <Button variant="contained" startIcon={<HomeOutlinedIcon />}>
              Профиль
            </Button>
            <Button variant="contained" startIcon={<HomeOutlinedIcon />}>
              Мои уборки
            </Button>
            <Button variant="contained" startIcon={<HomeOutlinedIcon />}>
              Услуги
            </Button>
            <Button variant="contained" startIcon={<HomeOutlinedIcon />}>
              Заказать
            </Button>
          </Stack>
      </div>
    );
  }

  
export default SideBar;