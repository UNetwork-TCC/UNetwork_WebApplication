import { Menu } from '@mui/icons-material'
import { Box, type SxProps } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useState, type ReactElement } from 'react'

export default function SideBar({
    children,
    sx,
    width,
    menuClick
}: {
    children: React.ReactNode,
    sx?: SxProps,
    width?: string | number,
    menuClick: () => void
}) : ReactElement {

    return (
        <Box display='flex' alignItems='start' sx={sx} height='100%' width={width ?? '15%'}>
            <Box p={5} width='100%'>
                {children}
            </Box>
            <Box sx={{ height: '100%', minWidth: '1px', bgcolor: grey[400] }} />
            <Menu onClick={menuClick} sx={{ m: 2.5, cursor: 'pointer', zIndex: 2 }} />
        </Box>
    )
}
