import React from 'react';
import Stepper from './Stepper';
import Payment from './Payment';
import {Stack} from "@mui/material";

export default function ToOrderGroupFour()
{
    return(
        <Stack spacing={3} width='78%'>
            <Stepper />
            <Payment />
        </Stack>
    );
}