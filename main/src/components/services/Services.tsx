import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Typography, CardMedia, CardContent, Card, Box, Stack} from "@mui/material";
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';

export default function Services() {
    const theme = useTheme();
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '20px', padding: '22px', marginTop: '17px', width: '130%'}}>
        <Typography variant="h4" color="primary" align='center' sx={{fontWeight: '500'}}>Услуги</Typography>
        <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", marginTop: "10px"}}>
            <CardMedia
                component="img"
                sx={{ width: 120, height: 120,  pl: "20px", pt: "6%" }}
                image="./image/service1.png"
                alt="Service1"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography color="primary" variant="h6" sx={{fontWeight: '500'}}>
                    Экспресс-уборка
                    </Typography>
                    <Typography variant="subtitle2">
                    Сухая, влажная уборка полов, плинтусов. Протирка пыли на доступных поверхностях. Чистка и дезинфекция сантехники. Протирка фасадов кухонного гарнитура. Чисткка стеновой панели фартука. Мытьё кухонной плиты снаружи. Удаление пыли с кухонной техники. Мытьё посуды "Одна заполненная раковина" Проветривание помещения Вынос мусора.
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '20%', padding: '5px'}}>
                <Stack direction={'row'} mt={5}>
                    <QueryBuilderOutlinedIcon fontSize="large"/>
                    <Typography variant="subtitle2" sx={{whiteSpace: 'nowrap'}}>Время уборки</Typography>
                </Stack>
                <Typography variant="subtitle2" color="text.primary" align="center" component="div" marginLeft="14%" mt="-10%">2 - 4 часа</Typography>
                <Typography variant="subtitle2" color="text.primary" align="center" component="div" sx={{ mt: '20%'}}>От 40 руб./м2</Typography>
                <Button variant="contained" color="success" disableElevation sx={{ borderRadius: '10px', mt: '26%', width: '100%'}}>
                    Рассчитать
                </Button>
            </Box>
        </Card>
    </div>
  );
}
