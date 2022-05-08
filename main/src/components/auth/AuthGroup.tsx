import React from 'react';
import SignIn from './SignIn';
import SignOn from './SignOn';
import {Stack} from "@mui/material";

export default function Auth()
{
    return(
        <Stack direction="row" spacing={3} width='100%'>
            <SignOn />
            <SignIn />
        </Stack>
    );
}