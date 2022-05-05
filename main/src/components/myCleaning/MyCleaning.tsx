import React from 'react';
import { Button, Typography, Stack, CardContent, Card, Box, Rating, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";

export default function MyCleaning() {
    const [value, setValue] = React.useState<number | null>(0);

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', width: '48%', minWidth: '810px'}}>
        <Typography variant="h4" color="primary" align='center' sx={{fw: '500'}}>Мои уборки</Typography>
        <Box sx={{ borderBottom: '3px solid #776D61'}}>
            <Typography variant="h5" color="primary">
            Активные заявки
            </Typography>
        </Box>
        <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
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
            <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '50%', padding: '5px'}}>
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
                <Stack spacing={1} direction={'row'} marginTop={'2%'} justifyContent="flex-end">
                    <Button variant="contained" color="success" size="small" disableElevation sx={{ borderRadius: '10px'}}>
                        Подробнее
                    </Button>
                    <Button variant="contained" color="success" size="small" disableElevation sx={{ borderRadius: '10px'}} onClick={handleClickOpen}>
                        Отменить
                    </Button>
                </Stack>
            </Box>
        </Card>
        <Box sx={{ borderBottom: '3px solid #776D61', marginTop: '20px'}}>
            <Typography variant="h5" color="primary">
            Архив заявок
            </Typography>
        </Box>
        <Card sx={{ display: 'flex', border: "3px solid #776D61", borderRadius: "10px", mt: "10px"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
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
            <Box sx={{flexDirection: 'column', backgroundColor: '#D8D0C5', borderLeft: '3px solid #776D61', width: '50%', padding: '5px'}}>
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
                    <Button variant="contained" color="success" size="small" disableElevation sx={{ borderRadius: '10px'}}>
                    Подробнее
                    </Button>
                </Stack>
            </Box>
        </Card>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Отменить заявку?
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
