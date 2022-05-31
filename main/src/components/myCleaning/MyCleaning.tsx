import React from 'react';
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

let key = false;

export default function MyCleaning() {

    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        if (key) return;
        OrderService.GetOrder().then((res) => {
            setOrders(res);
            console.log(res);
        })
        key = true;
    }, [orders])

    const [value, setValue] = React.useState<number | null>(0);

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const handleDialogOpen = () => {
        setOpenDialog(true);
    };
    const handleModalOpen = () => {
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
        bgcolor: '#F0EDE8',
        border: '2px solid #776D61',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div style={{
            backgroundColor: '#F0EDE8',
            borderRadius: '20px',
            padding: '22px',
            marginTop: '17px',
            width: '250%'
        }}>
            <Typography variant="h5" color="primary" align='center' sx={{fontWeight: '500'}}>Мои уборки</Typography>
            <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                    Активные заявки
                </Typography>
            </Box>
            <Stack spacing={2}>
                {orders.map((order) => (<div key={order.ID}>
                    <Card sx={{display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px"}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography variant="subtitle1">
                                    {order.Address.FullAddress}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Тип помещения: {order.Address.RoomType}
                                </Typography>
                                {order.ProvidedServices.map((service) => (<>
                                    {service.Service.IsMain &&
                                        <>
                                            <Typography variant="subtitle1">
                                                Тип уборки: {service.Service.ServiceName}
                                            </Typography>

                                            <Typography variant="subtitle1">
                                                Площадь: {service.Amount}
                                            </Typography>
                                        </>
                                    }</>))}

                                <Typography variant="subtitle1">
                                    Дополнительные услуги: мойка окон, химчистка.

                                </Typography>
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
                                    Уборка запланирована на {order.Date}
                                </Typography>
                                <Typography variant="subtitle2">
                                    Время прибытия:
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
                                        sx={{borderRadius: '10px'}} onClick={handleModalOpen}>
                                    Подробнее
                                </Button>
                                <Button variant="contained" color="success" size="small" disableElevation
                                        sx={{borderRadius: '10px'}} onClick={handleDialogOpen}>
                                    Отменить
                                </Button>
                            </Stack>
                        </Box>
                    </Card>
                </div>))}
            </Stack>
            <Box sx={{borderBottom: '3px solid #776D61', marginTop: '20px'}}>
                <Typography variant="h5" color="primary">
                    Архив заявок
                </Typography>
            </Box>
            <Stack spacing={2}>
                <Card sx={{display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px"}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography variant="subtitle1">
                                Дом. Воровского 101, кв. 6.
                            </Typography>
                            <Typography variant="subtitle1">
                                Тип помещения: Квартира
                            </Typography>
                            <Typography variant="subtitle1">
                                Тип уборки: Генеральная уборка
                            </Typography>
                            <Typography variant="subtitle1">
                                Площадь: 40м2
                            </Typography>
                            <Typography variant="subtitle1">
                                Дополнительные услуги: мойка окон, химчистка.
                            </Typography>
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
                                Уборка запланирована на 18.04.2022
                            </Typography>
                            <Typography variant="subtitle2">
                                Время прибытия: 11:00
                            </Typography>
                            <Typography variant="subtitle2">
                                Статус заявки: назначен выезд.
                            </Typography>
                            <Typography variant="subtitle2">
                                Время на приборку: 4 часа
                            </Typography>
                            <Typography variant="subtitle2">
                                Итог: 3000 руб.
                            </Typography>
                        </Stack>
                        <Stack spacing={1} direction={'row'} marginTop={'2%'} justifyContent="space-between">
                            <Rating name="simple-controlled" value={value} onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            />
                            <Button variant="contained" color="success" size="small" disableElevation
                                    sx={{borderRadius: '10px'}} onClick={handleModalOpen}>
                                Подробнее
                            </Button>
                        </Stack>
                    </Box>
                </Card>
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
                <Box sx={style}>
                    <Typography variant="h4" color="primary" align='center' sx={{fontWeight: '500'}}>Полная
                        информация</Typography>

                    <Stack direction="row" spacing={6} padding={4}>
                        <Stack spacing={1} width={"50%"}>
                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h5" color="primary">
                                    Место уборки
                                </Typography>
                            </Box>
                            <TextField label="Адрес" color='primary' size='small'
                                       sx={{fontWeight: '500', width: '100%'}}/>
                            <TextField label="Тип помещения" color='primary' size='small'
                                       sx={{fontWeight: '500', width: '100%'}}/>

                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h5" color="primary">
                                    Время уборки
                                </Typography>
                            </Box>
                            <TextField label="Уборка запланирована на" color='primary' size='small'
                                       sx={{fontWeight: '500', width: '100%'}}/>
                            <TextField label="Время уборки" color='primary' size='small'
                                       sx={{fontWeight: '500', width: '100%'}}/>
                            <TextField label="Статус заявки" color='primary' size='small'
                                       sx={{fontWeight: '500', width: '100%'}}/>
                        </Stack>
                        <Stack spacing={1} width={"50%"}>
                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h5" color="primary">
                                    Услуга
                                </Typography>
                            </Box>
                            <TextField label="Тип уборки" color='primary' size='small'
                                       sx={{fontWeight: '500', width: '100%'}}/>
                            <TextField label="Площадь" color='primary' size='small'
                                       sx={{fontWeight: '500', width: '100%'}}/>

                            <Box sx={{borderBottom: '3px solid #776D61'}}>
                                <Typography variant="h5" color="primary">
                                    Дополнительные услуги
                                </Typography>
                            </Box>
                            <Stack direction="row" spacing={2}>
                                <TextField label="Доп. услуга" color='primary' size='small'
                                           sx={{fontWeight: '500', width: '100%'}}/>
                                <TextField label="Количество" color='primary' size='small'
                                           sx={{fontWeight: '500', width: '100%'}}/>
                            </Stack>

                            <TextField
                                id="outlined-multiline-static"
                                label="Расходуемые средства"
                                multiline
                                rows={6}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
