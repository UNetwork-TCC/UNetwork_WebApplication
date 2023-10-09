import { Box, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function File({
    fileName,
    description 
} : {
    fileName: string,
    description: string
}) : ReactElement {
    return (
        <Box sx={{ display:'flex', mb:'1em', cursor:'pointer', height:'4em', width:'30rem', bgcolor:'white' }}>
            <Box sx={{ bgcolor:'#D1C4E9', height:'100%', width:'3.5rem' }}>
            
            </Box>
            <Box sx={{ ml:'1em', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <Typography sx={{ textTransform:'uppercase', fontSize: '1rem', fontWeight:'bold', color:'black' }}>{fileName}</Typography>
                <Typography sx={{ fontSize: '1rem', color:'black' }}>{description}</Typography>
            </Box>
        </Box>
    )
}
