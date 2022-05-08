import React from 'react';
import Services from './Services';
import DopServices from './DopServices';
import Calculator from './Calculator';
import {Stack} from "@mui/material";

export default function ServicesGroup()
{
    return(
        <Stack direction="row" spacing={3}>
            <Services />
            <Stack spacing={3} width='100%'>
                <Calculator />
                <DopServices />
            </Stack>
        </Stack>
    );
}