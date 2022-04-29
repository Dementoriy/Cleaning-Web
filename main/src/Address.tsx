import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import {Button} from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
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
        <Fab color="primary" aria-label="add">
            <AddIcon />
        </Fab>
    </div>
  );
}
