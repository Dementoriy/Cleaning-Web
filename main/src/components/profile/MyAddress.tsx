import * as React from 'react';
import {Button, Stack, TextField, Box, Card, Modal, CardHeader, CardContent, CardActions, Fab, Typography, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import { YMaps, Map } from 'react-yandex-maps';
import {Address} from "../../models/AddressModel";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import AddressService from '../../redux/services/AddressService';
import "../../assets/css/Scrollbar.css";

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
    }, [addresses])

  //   const myPlacemark = new YMaps.GeoObject({
  //     geometry: {
  //         type: "Point",
  //         coordinates: [55.76, 37.56]
  //     }
  // });
  //var myPlacemark = new YMaps.Placemark([55.8, 37.6]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
      setOpenModal(false);
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: '#F0EDE8',
    border: '2px solid #776D61',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px',  width: '100%', height: '100%'}}>
      <Typography variant="h5" color="primary" align='center'>Мои адреса</Typography>
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
                <Map defaultState={{ center: [58.60, 49.66], zoom: 11}} style={{height: "300px"}} />
              </div>
            </YMaps>
          </CardContent>
          <CardActions disableSpacing>
              <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px', width: '100%'}} endIcon={<EditOutlinedIcon />}>
                <Typography>
                  {address.FullAddress}
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
        <Fab color="secondary" aria-label="add"  onClick={handleModalOpen}>
          <AddIcon />
        </Fab>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // style={{marginLeft: '64%', marginBottom: '20%'}}
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
      <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <Typography variant="h5" color="primary" align='center'>Новый адрес</Typography>
                <Stack spacing={1} width={"50%"} marginTop={2}>
                  <TextField label="Район города" color='primary' size='small'/>
                  <TextField label="Населенный пункт" color='primary' size='small'/>
                  <TextField label="Улица" color='primary' size='small'/>
                  <TextField label="Дом" color='primary' size='small'/>
                  <TextField label="Корпус/строение" color='primary' size='small'/>
                  <TextField label="Квартира" color='primary' size='small'/>
                </Stack>
            </Box>
        </Modal>
    </div>
  );
}
