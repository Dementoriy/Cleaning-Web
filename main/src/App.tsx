import React from 'react';
import {TextField, Typography, Avatar, Stack, Button, Grid, Paper} from "@mui/material";

import { createTheme, ThemeProvider, makeStyles } from '@mui/material/styles';

import '@fontsource/raleway/300.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/700.css';
import { ClassNames } from '@emotion/react';


// const useStyles = makeStyles((theme) => ({
//   root:{
//   },
//   textField: {
//     backgroundColor: '#FFFFFF',
//     opacity: '60%',
//     borderRadius: '5px'
//   }
// }))

function App() {
  // const classes = useStyles();

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '48%'}}>
        <Stack direction="row" spacing={2}>
            <Avatar alt="Avatar" src="./assets/image/ava.png" sx={{ width: 120, height: 120 }}/>
            <Stack spacing={1} sx={{ fontWeight: 600 }}>
              <Typography color="primary" variant="h4">Вафлев Адам Неадамович</Typography>
              <Typography color="secondary" variant="h5">@Adam</Typography>
            </Stack>
        </Stack>
        <Stack
          component="form"
          sx={{
            width: '60%',
            marginTop: '30px',
            fontFamily: 'Raleway'
          }}
          spacing={3}
          noValidate
          autoComplete="off"
        >
          <TextField label="Фамилия" focused size='small' /*sx={{borderColor: '#776D61', input: { color: '#776D61', borderColor: '#776D61', backgroundColor: '#FFFFFF', opacity: '60%', borderRadius: '5px' } }}*/ />
          <TextField label="Имя" focused size='small' /*className={classes.textField}*/ />
          <TextField label="Отчество" focused size='small'/>
          <TextField label="Номер телефона" focused size='small' />
        </Stack>
        <Grid container>
          <Grid item>
            <Button variant="outlined" size="large" sx={{mt: '10px'}}>Сохранить</Button>
          </Grid>
        </Grid>
    </div>
  );
}

// const innerTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#E3D9D3',
//     },
//   },
// });

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