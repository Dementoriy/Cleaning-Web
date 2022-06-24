import React from 'react';
import Filters from './Filters';
import MyCleaning from './MyCleaning'
import {Stack} from "@mui/material";

function MyCleaningGroup()
{
    return(
        <Stack direction="row" justifyContent="space-between" width='78%'>
            <div style={{width: "66%", height: "54%", marginTop: "17px"}}>
                <MyCleaning />
            </div>
            <div style={{ width: '28%', height: "33%", marginTop: "17px"}}>
                <Filters />
            </div>
        </Stack>
    );
}
export default MyCleaningGroup;