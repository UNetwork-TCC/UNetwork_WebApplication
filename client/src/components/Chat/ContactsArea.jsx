import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function ContactsArea({ children }) {
    return (
        <Box position='sticky' display='flex' alignItems='start' height='96%' maxHeight='99%' width='30%' sx={{ mt: '2%', 
        overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' }, overflowX:'hidden', 
        boxSizing:'border-box'} }  >
            <Box width='100%' >
                {children}
            </Box>
        </Box>
    )
}
