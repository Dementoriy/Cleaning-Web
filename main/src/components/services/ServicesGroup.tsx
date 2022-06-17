import React from 'react';
import Services from './Services';
import DopServices from './DopServices';
import {Stack} from "@mui/material";

export default function ServicesGroup()
{
    return(
        <Stack direction="row" justifyContent="space-between" width='78%'>
            <div style={{width: "64%", height: "54%", marginTop: '17px'}}>
                <Services />
            </div>
            <div style={{width: "30%", height: "54%", margin: '17px 0px 0px 26px'}}>
                <DopServices />
            </div>
        </Stack>
    );
}