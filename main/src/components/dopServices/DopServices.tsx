import React from 'react';
import {Box, Checkbox, FormGroup, FormControlLabel, Card, CardContent, CardMedia, TextField, Typography, Stack} from '@mui/material';
import ServiceService from '../../redux/services/ServiceService';
import {Service} from "../../models/ServiceModel";

export default function DopServices() {
    const [services, setServices] = React.useState<Service[]>([]);

    React.useEffect(() => {
        if (services.length !== 0) return;
        ServiceService.GetService().then((res) => {
            setServices(res);
        })
    }, [services])
  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', height: '100%', width: '100%', overflowY: 'auto'}}>
        <Typography variant="h5" color="primary" align='center' sx={{fontWeight: '500'}}>Дополнительные услуги</Typography>
        <Stack spacing={2}>
        {services.map((service)=>(<>
                {!service.IsMain &&
            <div key={service.ID}>
            <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px" }}>
                <CardMedia
                    component="img"
                    sx={{ width: 80, height: 80,  pl: "10px", pt: "6%" }}
                    image={service.Image}
                    alt="Service"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h6" color="primary" sx={{fontWeight: '500'}}>
                        {service.ServiceName}
                        </Typography>
                        <Typography variant="subtitle2">
                        {service.Description} 
                        </Typography>
                        <Typography variant="subtitle2">
                        От {service.Price} руб./{service.Units.Unit}
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '30%', padding: '8px'}}>
                    <Box marginTop={1}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox  color='primary'/>} label="Выбрать"/>
                            <TextField label="Количество" color='primary' size='small' sx={{fontWeight: '500', mt: '10%', width: '98%'}} />
                        </FormGroup>
                    </Box>
                </Box>
            </Card>
            </div>}</>))}
        </Stack>
    </div>
  );
}
