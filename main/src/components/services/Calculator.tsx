import React from 'react';
import {Box, Stack, InputLabel, MenuItem, FormControl, TextField, Typography, Button} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useNavigate} from 'react-router-dom';

export default function Calculator() {
    const navigate = useNavigate();

    const [name, setName] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

    //const square :string = '';
    //const square = (document.getElementById('#square') as HTMLInputElement).value;
    //let squareValue : string = (document.getElementById("#square") as HTMLInputElement).value;
    const squareValue = 20;

  return (
    <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', paddingBottom: '40px', width: '100%'}}>
        <Typography variant="h5" color="primary" align='center' sx={{fontWeight: '500'}}>Калькулятор</Typography>
        <Stack spacing={2.5} mt={2} alignItems="center">
            <TextField type='text' label="Площадь:" color='primary' size='small' sx={{fontWeight: '500', width: '80%'}} id="square" /*value={square} onChange={handleChange("square")}*/ />
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
            <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/dop-services?square=" + squareValue)}}>
            Доп. услуги
            </Button>
        </Stack>
    </div>
  );
}