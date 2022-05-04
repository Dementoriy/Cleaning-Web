import React from 'react';
import SignIn from './SignIn';
import SignOn from './SignOn';
import {Stack} from "@mui/material";

function Auth()
{
    return(
        <Stack direction="row" spacing={3}>
            <SignOn />
            <SignIn />
        </Stack>
    );
}
export default Auth;