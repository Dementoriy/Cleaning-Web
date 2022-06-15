import React, { useState } from 'react';
import { Button, Typography, CardMedia, CardContent, Card, Box, Stack, TextField} from "@mui/material";
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import ServiceService from '../../redux/services/ServiceService';
import {Service} from "../../models/ServiceModel";
import "../../assets/css/Scrollbar.css";

export default function Services() {
    const [services, setServices] = React.useState<Service[]>([]);
    const [key, setKey] = useState<boolean>(false);

    React.useEffect(() => {
        if (key) return;
        if (services.length !== 0) return;
        ServiceService.GetService().then((res) => {
            setServices(res);
        })
        setKey(true);
    }, [services])

    return (
    <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', height: '100%', width: '100%'}} >
        <Typography variant="h5" color="primary" align='center'>Услуги</Typography>
        <Stack direction="row" alignItems="center" justifyContent={"center"} mt={1} mb={1}>
            <TextField label="Поиск" color='primary' size='small' sx={{width: '40%'}}></TextField>
        </Stack>
        <Stack spacing={2}>
            {services.map((service)=>(<>
                {service.IsMain &&
                <div key={service.ID}>
                <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", marginTop: "10px"}}>
                    <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120,  pl: "20px", pt: "4%" }}
                        image={service.Image}
                        alt="Service"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography color="primary" variant="h6">
                            {service.ServiceName}
                            </Typography>
                            <Typography variant="subtitle2">
                            {service.Description}
                            </Typography>
                        </CardContent>
                    </Box>
                    <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '20%', padding: '5px'}}>
                        <Stack direction={'row'} mt={5}>
                            <QueryBuilderOutlinedIcon fontSize="large"/>
                            <Typography variant="subtitle2" sx={{whiteSpace: 'nowrap'}}>Время уборки</Typography>
                        </Stack>
                        <Typography variant="subtitle2" color="text.primary" align="center" component="div" marginLeft="14%" mt="-10%">{service.ApproximateTime}</Typography>
                        <Typography variant="subtitle2" color="text.primary" align="center" component="div" sx={{ mt: '20%'}}>От {service.Price} руб./{service.UnitsTitle}</Typography>
                        <Button variant="contained" color="success" disableElevation sx={{ borderRadius: '10px', mt: '10%', width: '100%'}}>
                            Выбрать
                        </Button>
                    </Box>
                </Card>
                </div>}</>))}
        </Stack>
    </div>
  );
}