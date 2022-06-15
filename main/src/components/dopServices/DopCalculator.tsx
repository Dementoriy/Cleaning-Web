import React from 'react';
import {Box, Stack, InputLabel, MenuItem, FormControl, TextField, Typography, Button} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useNavigate, useLocation} from 'react-router-dom';

export default function DopCalculator() {
    const navigate = useNavigate();

    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const square = searchParams.get("square");
    const type = searchParams.get("type");
    const price = searchParams.get("price");
    const time = searchParams.get("time");

  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', paddingBottom: '40px', width: '100%'}}>
        <Typography variant="h5" color="primary" align='center'>Калькулятор</Typography>
        <Stack spacing={2.5} mt={2} alignItems="center">
            <TextField label="Площадь:" color='primary' size='small' sx={{ width: '80%'}} value={square}/>
            <Box width='80%'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{lineHeight: '0.8em'}}>Тип:</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Тип:"
                    sx={{height: '40px'}}
                    >
                    <MenuItem value={1}>Квартира</MenuItem>
                    <MenuItem value={2}>Дом</MenuItem>
                    <MenuItem value={3}>Офис</MenuItem>
                    <MenuItem value={4}>Другое</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField disabled label="Цена" color='primary' size='small' sx={{width: '80%'}} value={price}/>
            <TextField disabled label="≈Время" color='primary' size='small' sx={{width: '80%'}} value={time}/>
            <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}}  onClick={() => {navigate("/services")}}>
            Назад
            </Button>
        </Stack>
    </div>
  );
}