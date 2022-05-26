import * as React from 'react';
import {Button, Stack, Card, CardHeader, CardContent, CardActions, Fab, Typography, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import { YMaps, Map } from 'react-yandex-maps';
import {Address} from "../../models/AddressModel";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import AddressService from '../../redux/services/AddressService';


  export default function MyAddress() {
    const user = useSelector((state: RootState) => state);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const [addresses, setAddresses] = React.useState<Address[]>([]);

    React.useEffect(() => {
        if (addresses.length !== 0) return;
        AddressService.GetAddress().then((res) => {
          setAddresses(res);
        })
        console.log(addresses);
    }, [addresses])

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '20px', padding: '22px', marginTop: '17px',  width: '60%', marginRight: '17px'}}>
      <Typography variant="h4" color="primary" align='center' style={{fontWeight: '500'}}>Мои адреса</Typography>
      <Stack spacing={2}>
      {addresses.map((address)=>(<div>
        <Card sx={{ width: '100%', backgroundColor: '#B1A18B', borderRadius:"10px", marginTop: '20px'}}>
          <CardHeader
            action={
            <IconButton aria-label="delete" onClick={handleClickOpen}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            }
            title={address.AddressName}
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
                <Typography>
                ул. {address.Street} {address.HouseNumber}, кв.{address.ApartmentNumber}
                </Typography>
              </Button>
          </CardActions>
        </Card>
        </div>))}
      </Stack>
      
      <Stack
        component="form"
        sx={{
          width: '100%',
          mt: '20px',
        }}
        noValidate
        autoComplete="off"
        alignItems="center"
      >
        <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
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
