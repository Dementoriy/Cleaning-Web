import * as React from 'react';
import {Button, Stack, Card, CardHeader, CardMedia, CardContent, CardActions, Fab, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';

  export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', marginRight: '17px',width: '33%'}}>
        <Typography variant="h4" color="primary" align='center' style={{fontWeight: '500'}}>Мои адреса</Typography>
        <Card sx={{ width: '100%', backgroundColor: '#B1A18B', borderRadius:"10px", marginTop: '5px'}}>
        <CardHeader
            action={
            <IconButton aria-label="delete" onClick={handleClickOpen}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
            
            }
            title="Работа"
        />
        <CardMedia
            component="img"
            height="200"
            image="/assets/image/map.jpg"
            alt="map"
        />
        <CardContent>
        </CardContent>
        <CardActions disableSpacing>
            <Button variant="contained" color="secondary" disableElevation style={{ borderRadius: '10px', width: '100%'}} endIcon={<EditOutlinedIcon />}>
                <Typography>Воровского 101, кв. 6</Typography>
            </Button>
        </CardActions>
        </Card>
        <Stack
          component="form"
          sx={{
            width: '100%',
            marginTop: '20px',
          }}
          noValidate
          autoComplete="off"
          alignItems="center"
        >
          <Fab color="primary" aria-label="add">
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
