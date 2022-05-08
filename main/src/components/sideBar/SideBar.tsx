import React from 'react';
import {Typography, Avatar, Stack, Button} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";

export default function SideBar() {
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();
    
    return (
      <div style={{backgroundColor: '#B1A18B', marginTop: '-7px', height: 'auto', padding: '10px', width: '13%', minWidth: '220px', paddingBottom: '270px'}}>
          <Stack direction="row" alignItems="stretch">
            <img src="./icons/logo.png" alt="logo" width="40px" height="40px"></img>
            <Typography sx={{fontSize: '30px', color: 'white', fontWeight: '500'}}>Чистый дом</Typography>
          </Stack>
          <Stack spacing={1} marginTop={10} alignItems={"center"}>
            <Avatar alt="Avatar" src="/image/ava.png" sx={{ width: 140, height: 140 }}/>
            <Typography variant="h6" sx={{color: 'white'}}>{user.auth.toString()}</Typography>
          </Stack>
          <Stack spacing={1} marginTop={8}>
            <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px'}} startIcon={<AccountCircleOutlinedIcon />}  onClick={() => {navigate("/profile")}}>
              Профиль
            </Button>
            <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px'}} startIcon={<HomeOutlinedIcon />} onClick={() => {navigate("/my-cleaning")}}>
              Мои уборки
            </Button>
            <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px'}} startIcon={<ListAltOutlinedIcon />} onClick={() => {navigate("/services")}}>
              Услуги
            </Button>
            <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px'}} startIcon={<AddCircleOutlineOutlinedIcon />} onClick={() => {navigate("/to-order")}}>
              Заказать
            </Button>
          </Stack>
          <Button variant="contained" color="secondary" disableElevation sx={{ width: '100%', borderRadius: '10px', mt: '60%'}} startIcon={<ExitToAppIcon />} onClick={() => {navigate("/")}}>
              Выйти
            </Button>
      </div>
    );
  }