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


export default function MyCleaning() {

    const [orders, setOrders] = React.useState<Order[]>([]);

    const [key, setKey] = useState<boolean>(false);

    React.useEffect(() => {
      if (key) return;
        if (orders.length !== 0) return;
        OrderService.GetOrder().then((res) => {
            setOrders(res);
            console.log(res);
        })
        setKey(true);
    }, [orders])

    const [ratingValue, setRatingValue] = React.useState<number | null>(0);
    const [rating, setRating] = React.useState<Order>();

    const [values, setValues] = React.useState<Order>({
        ID: 0,
        Status: "",
        Address: { ID: 0, RoomType: "", Сoefficient: 0, AddressName: "", FullAddress: "", СurrentAddress: false},
        Date: "",
        FinalPrice: 0,
        ApproximateTime: "",
        Comment: "",
        Rating: null,
        ProvidedServices : [],
        Consumables : []
      });
      const handleChange =
        (prop: keyof Order) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };
    const AddRating = (order: Order) => {
        const rating : Order = {
            ID: order.ID,
            Status: order.Status,
            Address: order.Address,
            Date: order.Date,
            FinalPrice: order.FinalPrice,
            ApproximateTime: order.ApproximateTime,
            Comment: order.Comment,
            Rating: ratingValue,
            ProvidedServices : order.ProvidedServices,
            Consumables : order.Consumables
        }
        OrderService.addRating(rating!).then((res: any) => {
            setRating(res!);
        })
        }

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const handleDialogOpen = () => {
        setOpenDialog(true);
    };
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
            setCoefficient(res.Address.Сoefficient);
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
            <Typography variant="h5" color="primary" align='center'>Мои уборки</Typography>
            <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                    Активные заявки
                </Typography>
            </Box>
            <Stack spacing={2}>
                {orders.map((order) =>
                    (order.Status !== 'Отменена' && order.Status !== 'Завершена')  &&
                    <Card sx={{display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px"}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography variant="subtitle1">
                                    {order.Address.FullAddress}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Тип помещения: {order.Address.RoomType}
                                </Typography>
                                {order.ProvidedServices.map((ps) => (<>
                                    {ps.Service.IsMain &&
                                        <>
                                            <Typography variant="subtitle1">
                                                Тип уборки: {ps.Service.ServiceName}
                                            </Typography>

                                            <Typography variant="subtitle1">
                                                Площадь: {ps.Amount}
                                            </Typography>
                                        </>
                                    }</>))}
                                    <Typography variant="subtitle1">Дополнительные услуги:</Typography>
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
                                    Уборка запланирована на:
                                </Typography>
                                <Typography variant="subtitle1">
                                    {order.Date}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Статус заявки: {order.Status}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Время на уборку: {order.ApproximateTime}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Итог: {order.FinalPrice} руб.
                                </Typography>
                            </Stack>
                            <Stack spacing={1} direction={'row'} marginTop={'2%'} justifyContent="flex-end">
                                <Button variant="contained" color="success" size="small" disableElevation
                                        sx={{borderRadius: '10px'}} onClick={(e) => {handleModalOpen(order.ID)}}>
                                    Подробнее
                                </Button>
                                <Button variant="contained" color="success" size="small" disableElevation
                                        sx={{borderRadius: '10px'}} onClick={handleDialogOpen}>
                                    Отменить
                                </Button>
                            </Stack>
                        </Box>
                        
                    </Card>
                )}
            </Stack>
            <Box sx={{borderBottom: '3px solid #776D61', marginTop: '20px'}}>
                <Typography variant="h5" color="primary">
                    Архив заявок
                </Typography>
            </Box>
            <Stack spacing={2}>
                {orders.map((order) => (order.Status === 'Отменена' || order.Status === 'Завершена')  &&
                    <Card sx={{display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px"}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography variant="subtitle1">
                                    {order.Address.FullAddress}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Тип помещения: {order.Address.RoomType}
                                </Typography>
                                {order.ProvidedServices.map((ps) => (<>
                                    {ps.Service.IsMain &&
                                        <>
                                            <Typography variant="subtitle1">
                                                Тип уборки: {ps.Service.ServiceName}
                                            </Typography>

                                            <Typography variant="subtitle1">
                                                Площадь: {ps.Amount}
                                            </Typography>
                                        </>
                                    }</>))}
                                    <Typography variant="subtitle1">Дополнительные услуги:</Typography>
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
                                    Уборка запланирована на:
                                </Typography>
                                <Typography variant="subtitle1">
                                    {order.Date}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Статус заявки: {order.Status}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Время на уборку: {order.ApproximateTime}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Итог: {order.FinalPrice} руб.
                                </Typography>
                            </Stack>
                            <Stack spacing={4} direction={'row'} marginTop={'2%'} justifyContent="flex-end">
                                <Rating name="simple-controlled" value={ratingValue} onChange={(event, newValue) => {
                                    setRatingValue(newValue);
                                }}
                                onClick={(e) => {AddRating(order)}}
                                />
                                <Button variant="contained" color="success" size="small" disableElevation
                                        sx={{borderRadius: '10px'}} onClick={(e) => {handleModalOpen(order.ID)}} >
                                    Подробнее
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
                        Отменить заявку?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Нет</Button>
                    <Button onClick={handleCloseDialog} autoFocus>
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
                <Box sx={style} className='section'>
                    <Typography variant="h5" color="primary" align='center'>Полная информация</Typography>
                    <Stack direction="row" spacing={6} padding={4}>
                        <Stack spacing={2} width={"50%"}>
                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h6" color="primary">
                                    Место уборки
                                </Typography>
                            </Box>
                            <TextField label="Адрес" color='primary' size='small' value={fullAddress}/>
                            <TextField label="Тип помещения" color='primary' size='small' value={roomType}/>

                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h6" color="primary">
                                    Время уборки
                                </Typography>
                            </Box>
                            <TextField label="Уборка запланирована на" color='primary' size='small' value={date}/>
                            <TextField label="Уборка займет" color='primary' size='small' value={approximateTime} />
                            <TextField label="Статус заявки" color='primary' size='small' value={status}/>
                        </Stack>
                        <Stack spacing={2} width={"50%"}>
                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h6" color="primary">
                                    Услуга
                                </Typography>
                            </Box>
                            {providedServices.map((ps) => (<>
                            {ps.Service.IsMain &&
                                <Stack direction="row" spacing={2}>
                                    <TextField label="Тип уборки" color='primary' size='small' sx={{width:'80%'}} value={ps.Service.ServiceName}/>
                                    <Stack direction="row" spacing={2}>
                                        <TextField label="Площадь" color='primary' size='small' value={ps.Amount}/>
                                        <TextField label="Цена" color='primary' size='small' value={ps.Amount * ps.Service.Price * coefficient!}/>
                                    </Stack>
                                </Stack>
                            }</>))}
                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h6" color="primary">
                                    Дополнительные услуги
                                </Typography>
                            </Box>
                            
                            {providedServices.map((ps) => (<>
                            {!ps.Service.IsMain &&
                            <Stack direction="row" spacing={2}>
                                <TextField label="Доп. услуга" color='primary' size='small' sx={{width:'80%'}} value={ps.Service.ServiceName}/>
                                <Stack direction="row" spacing={2}>
                                    <TextField label="Количество" color='primary' size='small' value={ps.Amount}/>
                                    <TextField label="Цена" color='primary' size='small' value={ps.Amount * ps.Service.Price * coefficient!}/>
                                </Stack>
                            </Stack>
                            }</>))}

                            <TextField
                                id="outlined-multiline-static"
                                label="Средства уборки"
                                multiline
                                rows={6}
                                value={consumables.map((consumable) => (
                                    " " + consumable.Name
                                ))}
                            />

                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                            <Typography variant="h6" color="primary">
                                Итог
                            </Typography>
                            </Box>
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                                <div></div>
                                <TextField label="Итоговая цена" color='primary' size='small' sx={{ width: '30%'}} value={finalPrice}/>
                            </Stack>
                            <TextField
                                id="outlined-multiline-static"
                                label="Комментарий"
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
