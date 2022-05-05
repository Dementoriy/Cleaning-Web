import React from 'react';
import Profile from './Profile';
import Address from './Address';
import {Stack} from "@mui/material";

export default function ProfileGroup()
{
    return(
        <Stack direction="row" spacing={3}>
            <Profile />
            <Address />
        </Stack>
    );
}