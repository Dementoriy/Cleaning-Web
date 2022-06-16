import React, { useState } from 'react';
import {Button, Stack, TextField, Box, Card, Modal, CardHeader, CardContent, CardActions, Fab, Typography, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, InputLabel, MenuItem } from "@mui/material";
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
import Select, { SelectChangeEvent } from '@mui/material/Select';

  export default function MyAddress() {
    const user = useSelector((state: RootState) => state);
    const [open, setOpen] = React.useState<boolean>(false);
    const handleClickOpen = (id: number, fullAddress: string, roomType: string) => {
      setAddressId(id);
      setFullAddress(fullAddress);
      setRoomType(roomType);
      setAddressName(addressName);
      setOpen(true);
    };
    // const handleClickOpen = (fullAddress: string, roomType: string) => {
    //   setOpen(true);
      
    // };

  const deleteAddress = (id: number) => {
    const delAddress : Address = {
      ID: id,
      RoomType: "",
      Сoefficient: 0,
      AddressName: "",
      FullAddress: "",
      СurrentAddress: false
    };
    AddressService.delClientAddress(delAddress!).then((res: any) => {
      setAddresses(res!);
    });
    handleClose();
  }

    const handleClose = () => {
      setOpen(false);
    };

    const [addresses, setAddresses] = React.useState<Address[]>([]);
    const [key, setKey] = useState<boolean>(false);

    React.useEffect(() => {
      if (key) return;
        AddressService.GetAddresses().then((res : any) => {
          setAddresses(res.addresses);
        })
        setKey(true);
    }, [addresses])

  //   const myPlacemark = new YMaps.GeoObject({
  //     geometry: {
  //         type: "Point",
  //         coordinates: [55.76, 37.56]
  //     }
  // });
  //var myPlacemark = new YMaps.Placemark([55.8, 37.6]);
  
  const [addressId, setAddressId] = React.useState<number>();
  const [fullAddress, setFullAddress] = React.useState<string>();
  const [roomType, setRoomType] = React.useState<string>();
  const [addressName, setAddressName] = React.useState<string>();

  const [openChangeModal, setOpenChangeModal] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleChangeModalOpen = (id: number, fullAddress: string, roomType: string, addressName: string) => {
    setAddressId(id);
    setFullAddress(fullAddress);
    setRoomType(roomType);
    setAddressName(addressName);
    setOpenChangeModal(true);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const closeChangeModal = () => {
    setOpenChangeModal(false);
};
  const handleCloseModal = () => {
      setOpenModal(false);
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: '#F0EDE8',
    border: '2px solid #776D61',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    paddingBottom: "100px"
  };

  const [changeType, setChangeType] = React.useState('');
  const [type, setType] = React.useState('');
  
  const сhangeTypeAddress = (event: SelectChangeEvent) => {
    setChangeType(event.target.value as string);
  };
  const сhangeType = (event: SelectChangeEvent) => {
      setType(event.target.value as string);
  };

  const [values, setValues] = React.useState<Address>({
    ID: 0,
    RoomType: "Квартира",
    Сoefficient: 0,
    AddressName: "Квартира",
    FullAddress: "",
    СurrentAddress: false
  });
  const handleChange =
        (prop: keyof Address) => (event: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...values, [prop]: event.target.value });
        };

  const changeClientAddress = () => {
    const changeAddress : Address = {
      ID: addressId!,
      RoomType: roomType!,
      Сoefficient: 0,
      AddressName: values.AddressName,
      FullAddress: values.FullAddress,
      СurrentAddress: false
    };
    AddressService.changeAddress(changeAddress!).then((res: any) => {
      setAddresses(res!);
    });
    closeChangeModal();
  }
  const newClientAddress = () => {
    const newAddress : Address = {
      ID: addressId!,
      RoomType: type,
      Сoefficient: 0,
      AddressName: type,
      FullAddress: values.FullAddress,
      СurrentAddress: false
    };
    AddressService.addAddress(newAddress!).then((res: any) => {
      setAddresses(res!);
    });
    handleCloseModal();
  }

  

  return (
    <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px',  width: '100%', height: '100%'}}>
      <Typography variant="h5" color="primary" align='center'>Мои адреса</Typography>
      <Stack spacing={2}>
      {addresses.map((address)=>(<>
        <Card sx={{ width: '100%', backgroundColor: '#B1A18B', borderRadius:"10px", marginTop: '20px'}}>
          <CardHeader
            action={
            <IconButton aria-label="delete" onClick={(e) => {handleClickOpen(address.ID, address.FullAddress, address.RoomType)}}>
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
              <Button variant="contained" color="secondary" disableElevation sx={{ borderRadius: '10px', width: '100%'}} endIcon={<EditOutlinedIcon />} onClick={(e) => {handleChangeModalOpen(address.ID, address.FullAddress, address.RoomType, address.AddressName)}}>
                <Typography>
                  {address.FullAddress}
                </Typography>
              </Button>
          </CardActions>
        </Card>
        </>))}
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
          <Button onClick={(e) => {deleteAddress(addressId!)}} autoFocus>
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
            <Box sx={style} >
              <Typography variant="h5" color="primary" align='center'>Новый адрес</Typography>
                <Stack spacing={2} width={"100%"} mt={2} alignItems="center" justifyContent={"center"}>
                  <Stack direction="row" spacing={2} width={"100%"} alignItems="center" justifyContent={"center"}>
                    <TextField label="Адрес" color='primary' size='small' sx={{width:'40%'}} onChange={handleChange('FullAddress')}/>
                    <Box width='15%'>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label" style={{lineHeight: '0.8em'}}>Тип:</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          label="Тип:"
                          onChange={сhangeType}
                          sx={{height: '40px'}}
                          >
                          <MenuItem value={"Квартира"}>Квартира</MenuItem>
                          <MenuItem value={"Дом"}>Дом</MenuItem>
                          <MenuItem value={"Офис"}>Офис</MenuItem>
                          <MenuItem value={"Другое"}>Другое</MenuItem>
                          </Select>
                      </FormControl>
                    </Box>
                    <Button variant="contained" color="secondary" size="medium" disableElevation sx={{ borderRadius: '10px'}} onClick={newClientAddress}>
                    Добавить
                    </Button>
                  </Stack>
                  <Stack alignItems="center" justifyContent={"center"} style={{height: "400px", width: "600px", backgroundColor: '#B1A18B', borderRadius:"10px" }}>
                    <YMaps>
                      <div>
                        <Map defaultState={{ center: [58.60, 49.66], zoom: 12}} style={{height: "360px", width: "560px"}} />
                      </div>
                    </YMaps>
                  </Stack>
                </Stack>
            </Box>
        </Modal>
        <Modal
            open={openChangeModal}
            onClose={closeChangeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
              <Typography variant="h5" color="primary" align='center'>Изменение адрес</Typography>
                <Stack spacing={2} width={"100%"} mt={2} alignItems="center" justifyContent={"center"}>
                  <Stack direction="row" spacing={2} width={"100%"} alignItems="center" justifyContent={"center"}>
                    <TextField label="Адрес" color='primary' size='small' sx={{width:'40%'}} defaultValue={fullAddress} onChange={handleChange('FullAddress')}/>
                    <TextField label="Название" color='primary' size='small' sx={{width:'20%'}} defaultValue={addressName} onChange={handleChange('AddressName')}/>
                    <Box width='15%'>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label" style={{lineHeight: '0.8em'}}>Тип:</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={roomType}
                          label="Тип:"
                          onChange={сhangeTypeAddress}
                          sx={{height: '40px'}}
                          >
                          <MenuItem value={"Квартира"}>Квартира</MenuItem>
                          <MenuItem value={"Дом"}>Дом</MenuItem>
                          <MenuItem value={"Офис"}>Офис</MenuItem>
                          <MenuItem value={"Другое"}>Другое</MenuItem>
                          </Select>
                      </FormControl>
                    </Box>
                    <Button variant="contained" color="secondary" size="medium" disableElevation sx={{ borderRadius: '10px'}} onClick={changeClientAddress}>
                    Изменить
                    </Button>
                  </Stack>
                  <Stack alignItems="center" justifyContent={"center"} style={{height: "400px", width: "600px", backgroundColor: '#B1A18B', borderRadius:"10px" }}>
                    <YMaps>
                      <div>
                        <Map defaultState={{ center: [58.60, 49.66], zoom: 12}} style={{height: "360px", width: "560px"}} />
                      </div>
                    </YMaps>
                  </Stack>
                </Stack>
            </Box>
        </Modal>
    </div>
  );
}
