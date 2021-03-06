import React, { useState } from 'react';
import {Box, Card, CardContent, CardMedia, TextField, Typography, Stack} from '@mui/material';
import ServiceService from '../../redux/services/ServiceService';
import {Service} from "../../models/ServiceModel";
import "../../assets/css/Scrollbar.css";

export default function DopServices() {
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

    const [search, setSearch] = React.useState<string>();
    const getDopSearch = (search : string) =>{
      ServiceService.getDopSearch(search).then((res) => {
        setServices(res);
    })}

  return (
    <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', height: "650px", width: '100%'}}>
        <Typography variant="h5" color="primary" align='center'>Дополнительные услуги</Typography>
        <Stack direction="row" alignItems="center" justifyContent={"center"} mt={1} mb={1}>
            <TextField label="Поиск" color='primary' size='small' sx={{width: '60%'}} onChange={e => {setSearch(e.target.value); getDopSearch(e.target.value)}}></TextField>
        </Stack>
        
        <Stack spacing={2}>
        {services.map((service)=>(<>
                {!service.IsMain &&
            <div key={service.ID}>
            <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px" }}>
                <CardMedia
                    component="img"
                    sx={{ width: 80, height: 80,  pl: "10px", pt: "10%" }}
                    image={service.Image}
                    alt="Service"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h6" color="primary">
                        {service.ServiceName}
                        </Typography>
                        <Typography variant="subtitle2">
                        {service.Description} 
                        </Typography>
                        <Typography variant="subtitle2">
                        От {service.Price} руб./{service.UnitsTitle}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            </div>}</>))}
        </Stack>
    </div>
  );
}
