import React from 'react';
import Profile from './Profile';
import MyAddress from './MyAddress';
import {Stack} from "@mui/material";

export default function ProfileGroup()
{
    return(
        <Stack direction="row" spacing={3} width='100%'>
            <Profile />
            <MyAddress />
        </Stack>
    );
}