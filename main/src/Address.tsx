import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import {Button, Stack} from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

  export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);
    
  return (
    <div style={{backgroundColor: '#FFFFFF', opacity: '70%', borderRadius: '50px', padding: '22px', marginTop: '17px', marginRight: '17px',width: '33%'}}>
        <Typography variant="h4" color="primary" align='center' style={{fontWeight: '500'}}>Мои адреса</Typography>
        <Card sx={{ width: '100%', backgroundColor: '#B1A18B', borderRadius:"10px", marginTop: '5px'}}>
        <CardHeader
            action={
            <IconButton aria-label="delete">
                <DeleteOutlineOutlinedIcon />
            </IconButton>
            }
            title="Работа"
        />
        <CardMedia
            component="img"
            height="200"
            image="./assets/image/map.jpg"
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
    </div>
  );
}
