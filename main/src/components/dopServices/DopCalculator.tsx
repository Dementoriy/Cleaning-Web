import React from 'react';
import {Box, Stack, InputLabel, MenuItem, FormControl, TextField, Typography, Button} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useNavigate} from 'react-router-dom';

export default function DopCalculator() {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '20px', padding: '22px', marginTop: '17px', paddingBottom: '40px', width: '60%', marginRight: '17px', height: '26%'}}>
        <Typography variant="h4" color="primary" align='center' sx={{fontWeight: '500'}}>Калькулятор</Typography>
        <Stack spacing={2} mt={1} alignItems="center">
            <TextField label="Площадь:" color='primary' size='small' sx={{fontWeight: '500', width: '80%'}} />
            <Box width='80%'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{lineHeight: '0.8em'}}>Тип:</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Тип:"
                    onChange={handleChange}
                    sx={{height: '40px'}}
                    >
                    <MenuItem value={1}>Квартира</MenuItem>
                    <MenuItem value={2}>Дом</MenuItem>
                    <MenuItem value={3}>Офис</MenuItem>
                    <MenuItem value={4}>Другое</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField disabled label="Цена" color='primary' size='small' sx={{fontWeight: '500', width: '80%'}} />
            <TextField disabled label="≈Время" color='primary' size='small' sx={{fontWeight: '500', width: '80%'}} />
            <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}}  onClick={() => {navigate("/services")}}>
            Назад
            </Button>
        </Stack>
    </div>
  );
}