import React from 'react';
import Services from './Services';
import Calculator from './Calculator';
import {Stack} from "@mui/material";

export default function ServicesGroup()
{
    return(
        <Stack direction="row" justifyContent="space-between" width='78%'>
            <div style={{width: "74%", height: "54%", marginTop: '17px'}}>
                <Services />
            </div>
            <div style={{width: "20%", margin: '17px 0px 0px 26px'}}>
                <Calculator />
            </div>
        </Stack>
    );
}