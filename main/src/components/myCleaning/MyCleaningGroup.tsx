import React from 'react';
import Filters from './Filters';
import Report from './Report';
import MyCleaning from './MyCleaning'
import {Stack} from "@mui/material";

function MyCleaningGroup()
{
    return(
        <Stack direction="row" spacing={3}>
            <MyCleaning />
            <Stack spacing={3} width='100%'>
                <Filters />
                <Report />
            </Stack>
        </Stack>
    );
}
export default MyCleaningGroup;