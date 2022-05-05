import React from 'react';
import {Box, Stack, InputLabel, MenuItem, FormControl, TextField, Typography} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Calculator() {

    const [name, setName] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', paddingBottom: '40px', width: '33%', minWidth: '450px'}}>
        <Typography variant="h4" color="primary" align='center' sx={{fw: '500'}}>Калькулятор</Typography>
        <Stack spacing={2} mt={1} alignItems="center">
            <TextField label="Площадь:" color='primary' size='small' sx={{fw: '500', width: '80%'}} />
            <Box width='80%'>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Тип:</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Age"
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
            <TextField disabled label="Цена:" color='primary' size='small' sx={{fw: '500', width: '80%'}} />
            <TextField disabled label="≈Время:" color='primary' size='small' sx={{fw: '500', width: '80%'}} />     
        </Stack>
    </div>
  );
}