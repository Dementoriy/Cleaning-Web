import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {TextField, Stack, Button, Grid, Icon} from "@mui/material";
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';

import '@fontsource/raleway/300.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';

export default function MediaControlCard() {
    const theme = useTheme();
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '48%'}}>
        <Typography variant="h4" color="primary" align='center' style={{fontWeight: '500'}}>Услуги</Typography>
        <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", marginTop: "10px"}}>
            <CardMedia
                component="img"
                sx={{ width: 140, height: 140,  padding: "30px" }}
                image="./assets/image/service1.png"
                alt="Service1"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '54%'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" style={{fontWeight: '500'}}>
                    Экспресс-уборка
                    </Typography>
                    <Typography variant="subtitle2">
                    Сухая, влажная уборка полов, плинтусов. Протирка пыли на доступных поверхностях. Чистка и дезинфекция сантехники. Протирка фасадов кухонного гарнитура. Чисткка стеновой панели фартука. Мытьё кухонной плиты снаружи. Удаление пыли с кухонной техники. Мытьё посуды "Одна заполненная раковина" Проветривание помещения Вынос мусора.
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{flexDirection: 'column', backgroundColor: '#B1A18B', borderLeft: '3px solid #776D61', width: '20%', padding: '5px'}}>
                <Box marginTop={5} sx={{ display: 'flex'}}>
                    <QueryBuilderOutlinedIcon fontSize="large"/>
                    <Typography component="div" variant="subtitle2">Время уборки</Typography>
                </Box>
                <Typography variant="subtitle2" color="text.primary" align="center" component="div" sx={{ marginTop: '-10%'}}>2 - 4 часа</Typography>
                <Typography variant="subtitle2" color="text.primary" align="center" component="div" sx={{ marginTop: '20%'}}>От 40 руб./м2</Typography>
                <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px', marginTop: '26%', width: '100%'}}>
                    Рассчитать
                </Button>
            </Box>
        </Card>
    </div>
  );
}
