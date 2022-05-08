import React from 'react';
import Stepper from './Stepper';
import StepOne from './StepOne';
import {Stack} from "@mui/material";

export default function ToOrderGroup()
{
    return(
        <Stack spacing={3} width='78%'>
            <Stepper />
            <StepOne />
        </Stack>
    );
}