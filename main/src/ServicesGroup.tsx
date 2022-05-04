import React from 'react';
import Services from './Services';
import DopServices from './DopServices';
import {Stack} from "@mui/material";

function ServicesGroup()
{
    return(
        <Stack direction="row" spacing={3}>
            <Services />
            <DopServices />
        </Stack>
    );
}
export default ServicesGroup;