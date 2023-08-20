import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function ContactsArea({ children }) {
    return (
        <Box position='sticky' display='flex' alignItems='start' height='99%' maxHeight='99%' width='30%' sx={{ pt: '3%', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' }, }} >
            <Box width='100%'>
                {children}
            </Box>
        </Box>
    )
}
