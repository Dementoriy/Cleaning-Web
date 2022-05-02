import React from 'react';
import { useTheme } from '@mui/material/styles';
import {Box, Checkbox, FormGroup, FormControlLabel, Card, CardContent, CardMedia, TextField, Typography} from '@mui/material';

import '@fontsource/raleway/300.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';

export default function MediaControlCard() {
    const theme = useTheme();
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '33%'}}>
        <Typography variant="h4" color="primary" align='center' style={{fontWeight: '500'}}>Дополнительные услуги</Typography>
        <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", marginTop: "10px" }}>
            <CardMedia
                component="img"
                sx={{ width: 80, height: 80,  padding: "30px" }}
                image="./assets/image/service1.png"
                alt="Service5"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '48%'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" sx={{fontWeight: '500'}}>
                    Дезинфекция
                    </Typography>
                    <Typography variant="subtitle2">
                    Дезинфекция воздуха и поверхностей. 
                    </Typography>
                    <Typography variant="subtitle2">
                    От 40 руб./м2 
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '30%', padding: '5px'}}>
                <Box marginTop={1}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  color='secondary'/>} label="Дезинфекция"/>
                        <TextField label="Количество" color='primary' size='small' sx={{fontWeight: '500', marginTop: '10%'}} />
                    </FormGroup>
                </Box>
            </Box>
        </Card>
    </div>
  );
}
