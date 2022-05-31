import React from 'react';
import DopServices from './DopServices';
import DopCalculator from './DopCalculator';
import {Stack} from "@mui/material";

export default function DopServicesGroup()
{
    return(
        <Stack direction="row" justifyContent="space-between" width='78%'>
            <div style={{width: "74%", height: "54%", marginTop: '17px'}}>
                <DopServices />
            </div>
            <div style={{width: "20%", margin: '17px 0px 0px 26px'}}>
                <DopCalculator />
            </div>
        </Stack>
    );
}