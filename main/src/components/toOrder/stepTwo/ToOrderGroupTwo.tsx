import React from 'react';
import Stepper from './Stepper';
import Services from '../../services/Services';
import Calculator from './Calculator';
import {Stack} from "@mui/material";

export default function ToOrderGroupTwo()
{
    return(
        <Stack spacing={3} width='78%'>
            <Stepper />
            <Stack direction="row" justifyContent="space-between">
                <div style={{width: "74%", height: "47%"}}>
                    <Services />
                </div>
                <div style={{width: "20%", marginLeft: "26px"}}>
                    <Calculator />
                </div>
            </Stack>
        </Stack>
    );
}