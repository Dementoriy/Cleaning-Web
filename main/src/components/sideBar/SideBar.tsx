import React from 'react';
import {Typography, Avatar, Stack, Button} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useNavigate} from 'react-router-dom';

export default function SideBar() {
    const navigate = useNavigate();
    
    return (
      <div style={{backgroundColor: '#B1A18B', marginTop: '-7px', height: 'auto', padding: '10px', width: '13%', minWidth: '220px', paddingBottom: '270px'}}>
          <Stack direction="row" alignItems="stretch">
            <img src="./icons/logo.png" alt="logo" width="40px" height="40px"></img>
            <Typography sx={{fontSize: '30px', color: 'white', fw: '500'}}>Чистый дом</Typography>
          </Stack>
          <Stack spacing={1} marginTop={10} alignItems={"center"}>
            <Avatar alt="Avatar" src="/image/ava.png" sx={{ width: 140, height: 140 }}/>
            <Typography variant="h6" sx={{color: 'white'}}>Adam</Typography>
          </Stack>
          <Stack spacing={1} marginTop={8}>
            <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px'}} startIcon={<AccountCircleOutlinedIcon />}  onClick={() => {navigate("/Profile")}}>
              Профиль
            </Button>
            <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px'}} startIcon={<HomeOutlinedIcon />} onClick={() => {navigate("/MyCleaning")}}>
              Мои уборки
            </Button>
            <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px'}} startIcon={<ListAltOutlinedIcon />} onClick={() => {navigate("/Services")}}>
              Услуги
            </Button>
            <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px'}} startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => {navigate("/")}}>
              Заказать
            </Button>
          </Stack>
      </div>
    );
  }