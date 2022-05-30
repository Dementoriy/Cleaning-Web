import React from 'react';
import Services from './Services';
import Calculator from './Calculator';
import {Stack} from "@mui/material";

export default function ServicesGroup()
{
    return(
        <Stack direction="row" spacing={3}>
            <Services />
            <Calculator />
        </Stack>
    );
}