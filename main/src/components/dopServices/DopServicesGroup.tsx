import React from 'react';
import DopServices from './DopServices';
import DopCalculator from './DopCalculator';
import {Stack} from "@mui/material";

export default function DopServicesGroup()
{
    return(
        <Stack direction="row" spacing={3}>
            <DopServices />
            <DopCalculator />
        </Stack>
    );
}