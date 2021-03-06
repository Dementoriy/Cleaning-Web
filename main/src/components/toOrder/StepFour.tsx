import React from 'react';
import {Stack, Button, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import {selected, line} from './StepperStyle';
import {FinalOrderInfo} from './StepThree';
import OrderService from '../../redux/services/OrderService';
import {Client} from "../../models/ClientModel";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import moment from 'moment';
 
export default function StepFour() {
  const client = useSelector((state: RootState) => state);
  const [user, setUser] = React.useState<Client>(client.client.client!);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const finalOrderInfo: FinalOrderInfo = location.state as FinalOrderInfo;

  const info = () => {
    console.log(finalOrderInfo);
  }

  const Pay = (() => {
    OrderService.addOrder(finalOrderInfo).then((res) => {
      dispatch(res);
  });
    handleDialogOpen();
  })

  const [dateStart, setDateStart] = React.useState<string>('');
  const [dateFinish, setDateFinish] = React.useState<string>('');
  const [dateTimeStart, setDateTimeStart] = React.useState<string>('');
  const [dateTimeFinish, setDateTimeFinish] = React.useState<string>('');
  const [count, setCount] = React.useState<number>();

  React.useEffect(() => {
    if(finalOrderInfo.dateTimeEnd != null)
    {
      var dateS : Date = new Date(Date.parse(finalOrderInfo.dateTime));
      var dateF : Date = new Date(Date.parse(finalOrderInfo.dateTimeEnd));

      setDateStart(moment(dateS).format('YYYY-MM-DD'));
      setDateFinish(moment(dateF).format('YYYY-MM-DD'));
      setDateTimeStart(moment(dateS).format("DD-MM-YYYY hh:mm"));
      setDateTimeFinish(moment(dateF).format("DD-MM-YYYY"));

      const days = moment(dateFinish).diff(moment(dateStart), 'days');
      if(Math.floor((days+1)%finalOrderInfo.periodicity) > 0)
      {
        setCount(Math.floor((days+3)/finalOrderInfo.periodicity));
        console.log(days);
      }
      else {
        setCount(Math.floor((days+1)/finalOrderInfo.periodicity));
      }
      finalOrderInfo.count = count!;
      }
    else
    {
      setCount(1);
      finalOrderInfo.count = 1;
    }
    console.log(finalOrderInfo);
  })

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Stack spacing={3} width='78%'>
      <div style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px', marginTop: '17px', width: '100%', marginRight: '17px'}}>
        <Typography variant="h5" color="primary" align='center'>???????????????????? ????????????</Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ width: '90%', marginLeft: '5%', marginTop: '8px' }}>
          <div style={selected}>
            <h6>1</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>?????????? ?? ????????</Typography>
          <div style={line}></div>

          <div style={selected}>
            <h6>2</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>?????????? ????????????</Typography>
          <div style={line}></div>

          <div style={selected}>
            <h6>3</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>??????. ????????????</Typography>
          <div style={line}></div>

          <div style={selected}>
            <h6>4</h6>
          </div>
          <Typography variant="h6" color="primary" align='center'>????????????</Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ width: '56%', marginLeft: '22%', marginTop: '10px' }}>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={() => {navigate("/to-order-one")}}>
            ????????????
          </Button>
          <Button variant='contained' color="secondary" size="large" disableElevation sx={{ borderRadius: '10px'}} onClick={Pay}>
            ????????????????
          </Button>
        </Stack>
      </div>
      <div className='section' style={{backgroundColor: '#F0EDE8', borderRadius: '20px', padding: '22px',  width: '100%', marginRight: '17px', height: '38%'}}>
        <Box>
          <Typography variant="h5" color="primary" align='center'>???????????????????? ?? ????????????</Typography>
          <Stack direction="row" spacing={6} padding={4}>
            <Stack spacing={1} width={"50%"}>
              <Box sx={{borderBottom: '3px solid #776D61'}}>
                  <Typography variant="h5" color="primary">
                      ?????????? ????????????
                  </Typography>
              </Box>
              <TextField label="??????????" color='primary' size='small' value={finalOrderInfo.address.FullAddress}/>
              <TextField label="?????? ??????????????????" color='primary' size='small' value={finalOrderInfo.address.RoomType}/>

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  ?????????? ????????????
                </Typography>
              </Box>
              <>{
                (finalOrderInfo.dateTimeEnd === undefined) ?
                (<>
                  <TextField label="???????????? ?????????????????????????? ????" color='primary' size='small' value={moment(finalOrderInfo.dateTime).format("hh:mm DD-MM-YYYY")}/>
                  <TextField label="???????????? ????????????" color='primary' size='small' value={finalOrderInfo.time}/>
                  <TextField label="???????????? ????????????" color='primary' size='small' value={"????????????????????????"}/>
                </>) :
                (<>
                  <TextField label="???????????? ??" color='primary' size='small' value={moment(finalOrderInfo.dateTime).format("hh:mm DD-MM-YYYY")}/>
                  <TextField label="???????????? ????" color='primary' size='small' value={moment(finalOrderInfo.dateTimeEnd).format("DD-MM-YYYY")}/>
                  <TextField label="???????????? ????????????" color='primary' size='small' value={finalOrderInfo.time}/>
                  <TextField label="???????????? ????????????" color='primary' size='small' value={"????????????????????????"}/>
                </>)
              }</>
              
            </Stack>
            <Stack spacing={1} width={"50%"}>
              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  ????????????
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <TextField label="?????? ????????????" color='primary' size='small' sx={{ width: '50%'}} value={finalOrderInfo.service.ServiceName}/>
                <Stack direction="row" spacing={2} sx={{ width: '50%'}}>
                  <TextField label="??????????????" color='primary' size='small' sx={{ width: '50%'}} value={finalOrderInfo.square}/>
                  <TextField label="????????" color='primary' size='small' sx={{ width: '50%'}} value={finalOrderInfo.square * finalOrderInfo.service.Price * finalOrderInfo.address.??oefficient}/>
                </Stack>
              </Stack>

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  ???????????????????????????? ????????????
                </Typography>
              </Box>

                {finalOrderInfo.dopService.map((ps, index) => (
                  <Stack direction="row" spacing={2}>
                    <TextField label="??????. ????????????" color='primary' size='small' sx={{ width: '50%'}} value={ps.ServiceName}/>
                    <Stack direction="row" spacing={2} sx={{ width: '50%'}}>
                      <TextField label="????????????????????" color='primary' size='small' sx={{ width: '50%'}} value={finalOrderInfo.amount[index]}/>
                      <TextField label="????????" color='primary' size='small' sx={{ width: '50%'}} value={finalOrderInfo.amount[index] * ps.Price * finalOrderInfo.address.??oefficient}/>
                    </Stack>
                  </Stack>
                ))}
                

              <Box sx={{borderBottom: '3px solid #776D61'}}>
                <Typography variant="h5" color="primary">
                  ????????
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <TextField label="???????????????????? ????????????" color='primary' size='small' sx={{ width: '25%'}} 
                  value={count}/>
                <TextField label="????????" color='primary' size='small' sx={{ width: '25%'}} value={finalOrderInfo.price}/>
                <TextField label="???????????????? ????????" color='primary' size='small' sx={{ width: '25%'}}
                value={finalOrderInfo.periodicity === undefined ?
                  finalOrderInfo.price : finalOrderInfo.price * count!
                }/>
              </Stack>
              <TextField
                id="outlined-multiline-static"
                label="??????????????????????"
                multiline
                rows={6}
                value={finalOrderInfo.comment}
                disabled
              />
            </Stack>
          </Stack>
        </Box>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ???????????? ?????????????? ????????????????! ???????????????? ?????? ?????????????????? ???? ?????????? {user.email}. ?????????????? ?? "?????? ????????????"?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {navigate("/to-order-one")}}>??????</Button>
            <Button onClick={() => {navigate("/my-cleaning")}} autoFocus>????</Button>
        </DialogActions>
      </Dialog>
    </Stack>
    
  );
}