import React from 'react';
import Stepper from './Stepper';
import DopServices from '../../dopServices/DopServices';
import Calculator from '../stepThree/Calculator';
import {Stack} from "@mui/material";

export default function ToOrderGroupThree()
{
    return(
        <Stack spacing={3} width='78%'>
            <Stepper />
            <Stack direction="row" justifyContent="space-between">
                <div style={{width: "74%", height: "44%" }}>
                    <DopServices />
                </div>
                <div style={{width: "20%", marginLeft: "26px"}}>
                    <Calculator />
                </div>
            </Stack>
        </Stack>
    );
}