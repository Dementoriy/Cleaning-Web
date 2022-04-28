import React from 'react';
import {TextField, Typography, Avatar, Stack, Button} from "@mui/material";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import '@fontsource/raleway/300.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';

function App() {
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '880px'}}>
        <Stack direction="row" spacing={2}>
            <Avatar alt="Avatar" src="./assets/image/ava.png" sx={{ width: 120, height: 120 }}/>
            <Stack spacing={1}>
                <Typography variant="h4">Вафлев Адам Неадамович</Typography>
                <Typography variant="h5">@Adam</Typography>
            </Stack>
        </Stack>
        <Stack
          component="form"
          sx={{
            width: '60ch',
            marginTop: '30px',
            fontFamily: 'Raleway'
          }}
          spacing={3}
          noValidate
          autoComplete="off"
        >
          <ThemeProvider theme={outerTheme}>
            <TextField label="Фамилия" focused size='small' /*sx={{borderColor: '#776D61', input: { color: '#776D61', borderColor: '#776D61', backgroundColor: '#FFFFFF', opacity: '60%', borderRadius: '5px' } }}*/ />
            <TextField label="Имя" focused size='small' />
            <TextField label="Отчество" focused size='small'/>
            <TextField label="Номер телефона" focused size='small'/>
            <TextField label="Почта" focused size='small'/>
          </ThemeProvider>
          
        </Stack>
        <ThemeProvider theme={outerTheme}>
          <Button variant="outlined" size="large" sx={{mt: '10px'}}>Сохранить</Button>
        </ThemeProvider>
    </div>
  );
}

const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#776D61',
    },
  },
});

const innerTheme = createTheme({
  palette: {
    primary: {
      main: '#E3D9D3',
    },
  },
});

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#776D61',
//     },
//     secondary: {
//       main: '#E3D9D3',
//     },
//   },
// });

export default App;