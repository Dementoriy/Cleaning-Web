import * as React from 'react';
import { Typography, Button, Stack } from "@mui/material";

export default function Report() {

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '20px', padding: '22px', paddingBottom: '50px',  width: '94%', marginRight: '17px'}}>
        <Typography variant="h4" color="primary" align='center' sx={{fontWeight: '500'}}>Экспорт</Typography>
        <Stack alignItems="center" spacing={3} mt={2}>
          <Typography variant="subtitle1" color="primary">
            Отчет по отфильтрованным заявкам в формате PDF. 
          </Typography>
          <Button variant="contained" color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}}>
          Сформировать отчет
          </Button>
        </Stack>
    </div>
  );
}