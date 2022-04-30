import React from 'react';
import {Typography, Avatar, Stack, Button} from "@mui/material";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function SideBar() {
    return (
      <div style={{backgroundColor: '#B1A18B', marginTop: '-7px', height: 'auto', padding: '10px', width: '13%', paddingBottom: '270px'}}>
          <Stack direction="row" spacing={1}>
            <img src="./assets/icons/logo.png" alt="logo"></img>
            <Typography variant="h5" style={{color: 'white', fontWeight: '500'}}>Чистый дом</Typography>
          </Stack>
          <Stack spacing={1} marginTop={10} alignItems={"center"}>
            <Avatar alt="Avatar" src="./assets/image/ava.png" sx={{ width: 140, height: 140 }}/>
            <Typography variant="h6" style={{color: 'white'}}>Adam</Typography>
          </Stack>
          <Stack spacing={1} marginTop={8}>
            <Button variant="contained" color="secondary" disableElevation style={{ borderRadius: '10px'}} startIcon={<AccountCircleOutlinedIcon />}>
              Профиль
            </Button>
            <Button variant="contained" color="secondary" disableElevation style={{ borderRadius: '10px'}} startIcon={<HomeOutlinedIcon />}>
              Мои уборки
            </Button>
            <Button variant="contained" color="secondary" disableElevation style={{ borderRadius: '10px'}} startIcon={<ListAltOutlinedIcon />} >
              Услуги
            </Button>
            <Button variant="contained" color="secondary" disableElevation style={{ borderRadius: '10px'}} startIcon={<AddCircleOutlineOutlinedIcon />}>
              Заказать
            </Button>
          </Stack>
      </div>
    );
  }

  
export default SideBar;