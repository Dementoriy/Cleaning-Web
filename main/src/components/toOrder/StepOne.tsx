import React from 'react';
import {Box, Stack, InputLabel, MenuItem, FormControl, TextField, Typography, Button, Card, CardHeader, CardContent, CardActions, Fab, Dialog, DialogActions, DialogContent, DialogContentText} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import { YMaps, Map } from 'react-yandex-maps';

export default function Stepper() {

    const [name, setName] = React.useState('');
  
    const handleChange = (event: SelectChangeEvent) => {
      setName(event.target.value as string);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '20px', padding: '22px',  width: '100%', marginRight: '17px'}}>
        <Stack direction='row' width='100%' justifyContent="center" mt={2}>
          <Button variant='text' color='primary' size="large">
            <Typography variant="h5" sx={{fontWeight: '500'}}>Разовая уборка</Typography>
          </Button>
          <Typography color='primary' variant="h5" mt='7px'>/</Typography>
          <Button variant='text' color='secondary' size='large'>
            <Typography variant="h5" sx={{fontWeight: '500'}}>Периодическая уборка</Typography>
          </Button>
        </Stack>
        <Stack direction='row' width='100%' mt={3} spacing={6} justifyContent="center">
          <Stack width='30%' spacing={2}>
            <Typography variant="h5" color="primary" align='center' sx={{fontWeight: '500'}}>Выбор адреса</Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Адрес</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={1}>Воровского 101, кв. 6.</MenuItem>
                <MenuItem value={2}>пр. Строителей 98, кв. 105.</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="datetime-local"
              label="Дата и время"
              type="datetime-local"
              defaultValue="2022-05-01T08:00:00"
              InputLabelProps={{
                shrink: true,
              }}
            />

          <TextField
            id="outlined-multiline-static"
            label="Комментарий"
            multiline
            rows={6}
          />

          </Stack>
          <Stack width='30%'>
            <Card sx={{ width: '100%', backgroundColor: '#B1A18B', borderRadius:"10px", marginTop: '5px'}}>
              <CardHeader
                action={
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                }
                title="Работа"
              />
              <CardContent sx={{ mt: '-5%'}}>
                <YMaps>
                  <div>
                    <Map defaultState={{ center: [58.60, 49.66], zoom: 11 }} style={{height: "300px"}} />
                  </div>
                </YMaps>
              </CardContent>
              <CardActions disableSpacing>
                  <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px', width: '100%'}} endIcon={<EditOutlinedIcon />}>
                    <Typography>Воровского 101, кв. 6</Typography>
                  </Button>
              </CardActions>
            </Card>
          </Stack>
        </Stack>
        
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Удалить адрес?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Нет</Button>
          <Button onClick={handleClose} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}