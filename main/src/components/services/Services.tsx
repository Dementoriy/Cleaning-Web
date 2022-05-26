import React from 'react';
import { Button, Typography, CardMedia, CardContent, Card, Box, Stack} from "@mui/material";
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import ServiceService from '../../redux/services/ServiceService';
import {Service} from "../../models/ServiceModel";

export default function Services() {
    const [services, setServices] = React.useState<Service[]>([]);

    React.useEffect(() => {
        if (services.length !== 0) return;
        ServiceService.GetService().then((res) => {
            setServices(res);
        })
    }, [services])

    return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '20px', padding: '22px', marginTop: '17px', width: '130%'}}>
        <Typography variant="h4" color="primary" align='center' sx={{fontWeight: '500'}}>Услуги</Typography>
        <Stack spacing={2}>
            {services.map((service)=>(<div key={service.ID}>
                {service.IsMain &&
                <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", marginTop: "10px"}}>
                    <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120,  pl: "20px", pt: "6%" }}
                        image={service.Image}
                        alt="Service"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography color="primary" variant="h6" sx={{fontWeight: '500'}}>
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
                        <Typography variant="subtitle2" color="text.primary" align="center" component="div" sx={{ mt: '20%'}}>От {service.Price} руб./{service.Units.Unit}</Typography>
                        <Button variant="contained" color="success" disableElevation sx={{ borderRadius: '10px', mt: '26%', width: '100%'}}>
                            Выбрать
                        </Button>
                    </Box>
                </Card>
            }</div>))}
        </Stack>
    </div>
  );
}
