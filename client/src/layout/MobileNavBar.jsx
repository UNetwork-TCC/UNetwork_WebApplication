import { 
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper
} from "@mui/material";

import {
    Restore,
    Favorite,
    Archive
} from '@mui/icons-material'

import { useState } from "react";

export default function MobileNavBar() {
    const [value, setValue] = useState(0);

    return (
        <Box sxicon={{ pb: 7 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                <BottomNavigationAction label="Recents" icon={<Restore />} />
                <BottomNavigationAction label="Favorites" icon={<Favorite />} />
                <BottomNavigationAction label="Archive" icon={<Archive />} />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}