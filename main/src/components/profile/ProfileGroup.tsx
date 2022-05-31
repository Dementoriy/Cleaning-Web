import React from 'react';
import Profile from './Profile';
import MyAddress from './MyAddress';
import {Stack} from "@mui/material";

export default function ProfileGroup()
{
    return(
        <Stack direction="row" justifyContent="space-between" width='78%'>
            <div style={{width: "60%", height: "54%" }}>
                <Profile />
            </div>
            <div style={{width: "34%", height: "54%" , margin: "17px 0px 0px 0px"}}>
                <MyAddress />
            </div>
        </Stack>
    );
}