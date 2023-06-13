import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,

} from '@mui/material'



import {
    Restore,
    Favorite,
    Archive,
    AccountCircle,
    MenuBook,
    Chat,
    Bookmark,
    Groups,
    Newspaper,
    ClearOutlined
} from '@mui/icons-material'

import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function MobileNavBar() {
    const [value, setValue] = useState(0)
    const navigate = useNavigate()
    return (
        <Box sx={{}} >
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    <BottomNavigationAction label="Materiais" icon={<MenuBook />} onClick={() => navigate('/Materials')}/>
                    <BottomNavigationAction label="Conversas" icon={<Chat />} onClick={() => navigate('/Chat')}/>
                    <BottomNavigationAction label="Favoritos" icon={<Bookmark />} onClick={() => navigate('/Favorites')} />
                    <BottomNavigationAction label="Classes" icon={<Groups />} onClick={() => navigate('/Classes')}/>
                    <BottomNavigationAction label="Notícias" icon={<Newspaper />} onClick={() => navigate('/News')}/>
                </BottomNavigation>
            </Paper>
        </Box>
    )
}