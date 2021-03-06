import React, { useState } from 'react';
import {
    Button,
    Typography,
    Stack,
    CardContent,
    Card,
    Box,
    Rating,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Modal,
    TextField
} from "@mui/material";
import OrderService from '../../redux/services/OrderService';
import {Order} from "../../models/OrderModel";
import {ProvidedServices} from "../../models/ProvidedServicesModel";
import {Address} from "../../models/AddressModel";
import { Consumable } from '../../models/ConsumableModel';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";


export default function MyCleaning() {

    const state = useSelector((state: RootState) => state);
    const [key, setKey] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    React.useEffect(() => {
      if (key) return;
        OrderService.GetOrder().then((res) => {
        dispatch(res);
        })
        setKey(true);
    }, [dispatch, key])

    const [ratingValue, setRatingValue] = React.useState<number | null>();

    const AddRating = (order: Order, newValue: number) => {
        const rating : Order = {
            ID: order.ID,
            Status: "",
            Address: { ID: 0, RoomType: "", –°oefficient: 0, AddressName: "", FullAddress: "", –°urrentAddress: false},
            Date: "",
            FinalPrice: 0,
            ApproximateTime: "",
            Comment: "",
            Rating: newValue!,
            ProvidedServices : [],
            Consumables : []
        }
        OrderService.addRating(rating!).then((res: any) => {
            dispatch(res);
        })
        }

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    

    const handleDialogOpen = (id: number) => {
        setOrderId(id);
        setOpenDialog(true);
      };

      const cancellOrder = (id: number) => {
        const cancOrder : Order = {
            ID: id,
            Status: "",
            Address: { ID: 0, RoomType: "", –°oefficient: 0, AddressName: "", FullAddress: "", –°urrentAddress: false},
            Date: "",
            FinalPrice: 0,
            ApproximateTime: "",
            Comment: "",
            Rating: null,
            ProvidedServices : [],
            Consumables : []
        };
        OrderService.cancellOrder(cancOrder!).then((res: any) => {
            dispatch(res);
        });
        handleCloseDialog();
      }

    const handleModalOpen = (orderId: number) => {
        OrderService.GetOrderById(orderId).then((res: any) => {
            setFullAddress(res.Address.FullAddress);
            setRoomType(res.Address.RoomType);
            setDate(res.Date);
            setApproximateTime(res.ApproximateTime);
            setFinalPrice(res.FinalPrice);
            setComment(res.Comment);
            setStatus(res.Status);
            setProvidedServices(res.ProvidedServices);
            setAddress(res.Address);
            setConsumables(res.Consumables);
            setCoefficient(res.Address.–°oefficient);
        })
        setOpenModal(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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
        height: '80%',
        bgcolor: '#F0EDE8',
        border: '2px solid #776D61',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4
    };

    const [orderId, setOrderId] = React.useState<number>();
    const [fullAddress, setFullAddress] = React.useState<string>();
    const [roomType, setRoomType] = React.useState<string>();
    const [date, setDate] = React.useState<string>();
    const [approximateTime, setApproximateTime] = React.useState<string>();
    const [finalPrice, setFinalPrice] = React.useState<number>();
    const [comment, setComment] = React.useState<string>();
    const [status, setStatus] = React.useState<string>();
    const [providedServices, setProvidedServices] = React.useState<ProvidedServices[]>([]);
    const [address, setAddress] = React.useState<Address>();
    const [consumables, setConsumables] = React.useState<Consumable[]>([]);
    const [coefficient, setCoefficient] = React.useState<number>(1.2);

    return (
        <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', width: "100%", height: "100%"}}>
            <Typography variant="h5" color="primary" align='center'>–ú–ĺ–ł —É–Ī–ĺ—Ä–ļ–ł</Typography>
            <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                    –ź–ļ—ā–ł–≤–Ĺ—č–Ķ –∑–į—Ź–≤–ļ–ł
                </Typography>
            </Box>
            <Stack spacing={2}>
                {state.orders.map((order) =>
                    (order.Status !== '–ě—ā–ľ–Ķ–Ĺ–Ķ–Ĺ–į' && order.Status !== '–ó–į–≤–Ķ—Ä—ą–Ķ–Ĺ–į')  &&
                    <Card sx={{display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px"}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography variant="subtitle1">
                                    {order.Address.FullAddress}
                                </Typography>
                                <Typography variant="subtitle1">
                                    –Ę–ł–Ņ –Ņ–ĺ–ľ–Ķ—Č–Ķ–Ĺ–ł—Ź: {order.Address.RoomType}
                                </Typography>
                                {order.ProvidedServices.map((ps) => (<>
                                    {ps.Service.IsMain &&
                                        <>
                                            <Typography variant="subtitle1">
                                                –Ę–ł–Ņ —É–Ī–ĺ—Ä–ļ–ł: {ps.Service.ServiceName}
                                            </Typography>

                                            <Typography variant="subtitle1">
                                                –ü–Ľ–ĺ—Č–į–ī—Ć: {ps.Amount}
                                            </Typography>
                                        </>
                                    }</>))}
                                    <Typography variant="subtitle1">–Ē–ĺ–Ņ–ĺ–Ľ–Ĺ–ł—ā–Ķ–Ľ—Ć–Ĺ—č–Ķ —É—Ā–Ľ—É–≥–ł:</Typography>
                                    <Stack direction="row">
                                        {order.ProvidedServices.map((ps) => (<>
                                        {!ps.Service.IsMain &&
                                            <Stack direction="row"> 
                                                <Typography>{ps.Service.ServiceName},</Typography>
                                                <div style={{width: '5px'}} />
                                            </Stack>
                                        }</>))}   
                                    </Stack>
                            </CardContent>
                        </Box>
                        <Box sx={{
                            flexDirection: 'column',
                            backgroundColor: '#D8D0C5',
                            borderLeft: '3px solid #776D61',
                            width: '50%',
                            padding: '5px'
                        }}>
                            <Stack spacing={0.5}>
                                <Typography variant="subtitle2">
                                    –£–Ī–ĺ—Ä–ļ–į –∑–į–Ņ–Ľ–į–Ĺ–ł—Ä–ĺ–≤–į–Ĺ–į –Ĺ–į:
                                </Typography>
                                <Typography variant="subtitle1">
                                    {order.Date}
                                </Typography>
                                <Typography variant="subtitle2">
                                    –°—ā–į—ā—É—Ā –∑–į—Ź–≤–ļ–ł: {order.Status}
                                </Typography>
                                <Typography variant="subtitle2">
                                    –í—Ä–Ķ–ľ—Ź –Ĺ–į —É–Ī–ĺ—Ä–ļ—É: {order.ApproximateTime}
                                </Typography>
                                <Typography variant="subtitle2">
                                    –ė—ā–ĺ–≥: {order.FinalPrice} —Ä—É–Ī.
                                </Typography>
                            </Stack>
                            <Stack spacing={1} direction={'row'} marginTop={'2%'} justifyContent="flex-end">
                                <Button variant="contained" color="success" size="small" disableElevation
                                        sx={{borderRadius: '10px'}} onClick={(e) => {handleModalOpen(order.ID)}}>
                                    –ü–ĺ–ī—Ä–ĺ–Ī–Ĺ–Ķ–Ķ
                                </Button>
                                <Button variant="contained" color="success" size="small" disableElevation
                                        sx={{borderRadius: '10px'}}
                                        onClick={(e) => {handleDialogOpen(order.ID)}}>
                                    –ě—ā–ľ–Ķ–Ĺ–ł—ā—Ć
                                </Button>
                            </Stack>
                        </Box>
                        
                    </Card>
                )}
            </Stack>
            <Box sx={{borderBottom: '3px solid #776D61', marginTop: '20px'}}>
                <Typography variant="h5" color="primary">
                    –ź—Ä—Ö–ł–≤ –∑–į—Ź–≤–ĺ–ļ
                </Typography>
            </Box>
            <Stack spacing={2}>
                {state.orders.map((order) => (order.Status === '–ě—ā–ľ–Ķ–Ĺ–Ķ–Ĺ–į' || order.Status === '–ó–į–≤–Ķ—Ä—ą–Ķ–Ĺ–į')  &&
                    <Card sx={{display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px"}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography variant="subtitle1">
                                    {order.Address.FullAddress}
                                </Typography>
                                <Typography variant="subtitle1">
                                    –Ę–ł–Ņ –Ņ–ĺ–ľ–Ķ—Č–Ķ–Ĺ–ł—Ź: {order.Address.RoomType}
                                </Typography>
                                {order.ProvidedServices.map((ps) => (<>
                                    {ps.Service.IsMain &&
                                        <>
                                            <Typography variant="subtitle1">
                                                –Ę–ł–Ņ —É–Ī–ĺ—Ä–ļ–ł: {ps.Service.ServiceName}
                                            </Typography>

                                            <Typography variant="subtitle1">
                                                –ü–Ľ–ĺ—Č–į–ī—Ć: {ps.Amount}
                                            </Typography>
                                        </>
                                    }</>))}
                                    <Typography variant="subtitle1">–Ē–ĺ–Ņ–ĺ–Ľ–Ĺ–ł—ā–Ķ–Ľ—Ć–Ĺ—č–Ķ —É—Ā–Ľ—É–≥–ł:</Typography>
                                    <Stack direction="row">
                                        {order.ProvidedServices.map((ps) => (<>
                                        {!ps.Service.IsMain &&
                                            <Typography>{ps.Service.ServiceName}, </Typography>
                                        }</>))}   
                                    </Stack>
                            </CardContent>
                        </Box>
                        <Box sx={{
                            flexDirection: 'column',
                            backgroundColor: '#D8D0C5',
                            borderLeft: '3px solid #776D61',
                            width: '50%',
                            padding: '5px'
                        }}>
                            <Stack spacing={0.5}>
                                <Typography variant="subtitle2">
                                    –£–Ī–ĺ—Ä–ļ–į –∑–į–Ņ–Ľ–į–Ĺ–ł—Ä–ĺ–≤–į–Ĺ–į –Ĺ–į:
                                </Typography>
                                <Typography variant="subtitle1">
                                    {order.Date}
                                </Typography>
                                <Typography variant="subtitle2">
                                    –°—ā–į—ā—É—Ā –∑–į—Ź–≤–ļ–ł: {order.Status}
                                </Typography>
                                <Typography variant="subtitle2">
                                    –í—Ä–Ķ–ľ—Ź –Ĺ–į —É–Ī–ĺ—Ä–ļ—É: {order.ApproximateTime}
                                </Typography>
                                <Typography variant="subtitle2">
                                    –ė—ā–ĺ–≥: {order.FinalPrice} —Ä—É–Ī.
                                </Typography>
                            </Stack>
                            <Stack spacing={4} direction={'row'} marginTop={'2%'} justifyContent="flex-end">
                                {order.Status !== "–ě—ā–ľ–Ķ–Ĺ–Ķ–Ĺ–į" ? 
                                <Rating name="simple-controlled" defaultValue={order.Rating!} onChange={(event, newValue) => {
                                    setRatingValue(newValue);
                                    console.log(newValue);
                                    AddRating(order, newValue!);
                                }}
                                /> : <></>}

                                <Button variant="contained" color="success" size="small" disableElevation
                                        sx={{borderRadius: '10px'}} onClick={(e) => {handleModalOpen(order.ID)}} >
                                    –ü–ĺ–ī—Ä–ĺ–Ī–Ĺ–Ķ–Ķ
                                </Button>
                            </Stack>
                        </Box>

                    </Card>
                )}
            </Stack>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        –ě—ā–ľ–Ķ–Ĺ–ł—ā—Ć –∑–į—Ź–≤–ļ—É?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>–Ě–Ķ—ā</Button>
                    <Button onClick={(e) => {cancellOrder(orderId!)}} autoFocus>
                        –Ē–į
                    </Button>
                </DialogActions>
            </Dialog>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='section'>
                    <Typography variant="h5" color="primary" align='center'>–ü–ĺ–Ľ–Ĺ–į—Ź –ł–Ĺ—Ą–ĺ—Ä–ľ–į—Ü–ł—Ź</Typography>
                    <Stack direction="row" spacing={6} padding={4}>
                        <Stack spacing={2} width={"50%"}>
                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h6" color="primary">
                                    –ú–Ķ—Ā—ā–ĺ —É–Ī–ĺ—Ä–ļ–ł
                                </Typography>
                            </Box>
                            <TextField label="–ź–ī—Ä–Ķ—Ā" color='primary' size='small' value={fullAddress}/>
                            <TextField label="–Ę–ł–Ņ –Ņ–ĺ–ľ–Ķ—Č–Ķ–Ĺ–ł—Ź" color='primary' size='small' value={roomType}/>

                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h6" color="primary">
                                    –í—Ä–Ķ–ľ—Ź —É–Ī–ĺ—Ä–ļ–ł
                                </Typography>
                            </Box>
                            <TextField label="–£–Ī–ĺ—Ä–ļ–į –∑–į–Ņ–Ľ–į–Ĺ–ł—Ä–ĺ–≤–į–Ĺ–į –Ĺ–į" color='primary' size='small' value={date}/>
                            <TextField label="–£–Ī–ĺ—Ä–ļ–į –∑–į–Ļ–ľ–Ķ—ā" color='primary' size='small' value={approximateTime} />
                            <TextField label="–°—ā–į—ā—É—Ā –∑–į—Ź–≤–ļ–ł" color='primary' size='small' value={status}/>
                        </Stack>
                        <Stack spacing={2} width={"50%"}>
                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h6" color="primary">
                                    –£—Ā–Ľ—É–≥–į
                                </Typography>
                            </Box>
                            {providedServices.map((ps) => (<>
                            {ps.Service.IsMain &&
                                <Stack direction="row" spacing={2}>
                                    <TextField label="–Ę–ł–Ņ —É–Ī–ĺ—Ä–ļ–ł" color='primary' size='small' sx={{width:'80%'}} value={ps.Service.ServiceName}/>
                                    <Stack direction="row" spacing={2}>
                                        <TextField label="–ü–Ľ–ĺ—Č–į–ī—Ć" color='primary' size='small' value={ps.Amount}/>
                                        <TextField label="–¶–Ķ–Ĺ–į" color='primary' size='small' value={ps.Amount * ps.Service.Price * coefficient!}/>
                                    </Stack>
                                </Stack>
                            }</>))}
                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h6" color="primary">
                                    –Ē–ĺ–Ņ–ĺ–Ľ–Ĺ–ł—ā–Ķ–Ľ—Ć–Ĺ—č–Ķ —É—Ā–Ľ—É–≥–ł
                                </Typography>
                            </Box>
                            
                            {providedServices.map((ps) => (<>
                            {!ps.Service.IsMain &&
                            <Stack direction="row" spacing={2}>
                                <TextField label="–Ē–ĺ–Ņ. —É—Ā–Ľ—É–≥–į" color='primary' size='small' sx={{width:'80%'}} value={ps.Service.ServiceName}/>
                                <Stack direction="row" spacing={2}>
                                    <TextField label="–ö–ĺ–Ľ–ł—á–Ķ—Ā—ā–≤–ĺ" color='primary' size='small' value={ps.Amount}/>
                                    <TextField label="–¶–Ķ–Ĺ–į" color='primary' size='small' value={ps.Amount * ps.Service.Price * coefficient!}/>
                                </Stack>
                            </Stack>
                            }</>))}

                            <TextField
                                id="outlined-multiline-static"
                                label="–°—Ä–Ķ–ī—Ā—ā–≤–į —É–Ī–ĺ—Ä–ļ–ł"
                                multiline
                                rows={6}
                                value={consumables.map((consumable) => (
                                    " " + consumable.Name
                                ))}
                            />

                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                            <Typography variant="h6" color="primary">
                                –ė—ā–ĺ–≥
                            </Typography>
                            </Box>
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                                <div></div>
                                <TextField label="–ė—ā–ĺ–≥–ĺ–≤–į—Ź —Ü–Ķ–Ĺ–į" color='primary' size='small' sx={{ width: '30%'}} value={finalPrice}/>
                            </Stack>
                            <TextField
                                id="outlined-multiline-static"
                                label="–ö–ĺ–ľ–ľ–Ķ–Ĺ—ā–į—Ä–ł–Ļ"
                                multiline
                                rows={6}
                                value={comment}
                            />

                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
