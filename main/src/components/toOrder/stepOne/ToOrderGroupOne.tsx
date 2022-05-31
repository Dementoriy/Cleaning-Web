import React from 'react';
import Stepper from './Stepper';
import StepOne from './StepOne';
import {Stack} from "@mui/material";

export default function ToOrderGroupOne()
{
    return(
        <Stack spacing={3} width='78%'>
            <Stepper />
            <div style={{height: '38%'}}>
                <StepOne />
            </div>
        </Stack>
    );
}