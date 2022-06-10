import React from 'react';
import Filters from './Filters';
import Report from './Report';
import MyCleaning from './MyCleaning'
import {Stack} from "@mui/material";

function MyCleaningGroup()
{
    return(
        <Stack direction="row" justifyContent="space-between" width='78%'>
            <div style={{width: "66%", height: "54%", marginTop: "17px"}}>
                <MyCleaning />
            </div>
            <Stack spacing={10} width='28%' sx={{marginTop: "17px"}}>
                <div style={{ height: "33%"}}>
                    <Filters />
                </div>
                <div style={{ height: "16%"}}>
                    <Report />
                </div>
            </Stack>
        </Stack>
    );
}
export default MyCleaningGroup;