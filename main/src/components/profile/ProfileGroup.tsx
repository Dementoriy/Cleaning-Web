import React from 'react';
import Profile from './Profile';
import MyAddress from './MyAddress';
import {Stack} from "@mui/material";

export default function ProfileGroup()
{
    return(
        <Stack direction="row" justifyContent="space-between" width='78%'>
            <div style={{width: "60%", height: "54%", marginTop: "17px"}}>
                <Profile />
            </div>
            <div style={{width: "34%", height: "54%", marginTop: "17px"}}>
                <MyAddress />
            </div>
        </Stack>
    );
}