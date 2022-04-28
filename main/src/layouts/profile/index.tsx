import React from 'react';
import {Typography} from "@mui/material";
import { Card } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Profile() {
  return (
    <div>
        <Stack direction="row" spacing={2}>
            <Avatar alt="Avatar" src="/main/src/assets/image/ava.png" />
            <Stack spacing={1}>
                <Typography>Вафлев Адам Неадамович</Typography>
                <Typography>@Adam</Typography>
            </Stack>
        </Stack>
        <Stack>
            <Typography>Фамилия</Typography>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
            <TextField
                label="Фамилия"
                id="surname"
                defaultValue="Normal"
                variant="outlined"
                // color="#776D61"
            />
            </div>
            </Box>
        </Stack>
    </div>
  );
}

export default Profile;
