import React from 'react';
import {Box, Checkbox, FormGroup, FormControlLabel, Card, CardContent, CardMedia, TextField, Typography} from '@mui/material';

export default function DopServices() {
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', paddingBottom: '40px', width: '33%', minWidth: '450px'}}>
        <Typography variant="h4" color="primary" align='center' sx={{fw: '500'}}>Дополнительные услуги</Typography>
        <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px" }}>
            <CardMedia
                component="img"
                sx={{ width: 80, height: 80,  pl: "10px", pt: "6%" }}
                image="./image/service5.png"
                alt="Service5"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" color="primary" sx={{fw: '500'}}>
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
            <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '30%', padding: '8px'}}>
                <Box marginTop={1}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox  color='primary'/>} label="Дезинфекция"/>
                        <TextField label="Количество" color='primary' size='small' sx={{fw: '500', mt: '10%', width: '98%'}} />
                    </FormGroup>
                </Box>
            </Box>
        </Card>
    </div>
  );
}