import React from 'react';
import Profile from './App';
import Address from './Address';
import {Stack} from "@mui/material";

function Auth()
{
    return(
        <Stack direction="row" spacing={3}>
            <Profile />
            <Address />
        </Stack>
    );
}
export default Auth;