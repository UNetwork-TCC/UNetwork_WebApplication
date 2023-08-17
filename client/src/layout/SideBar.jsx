import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function SideBar({ children, sx, width }) {
    return (
        <Box position='sticky' display='flex' alignItems='start' sx={sx} height='100%' width={width || '15%'}>
            <Box p={5} width='100%'>
                {children}
            </Box>
            <Box sx={{ height: '100%', width: '1px', bgcolor: grey[400] }}></Box>
        </Box>
    )
}
