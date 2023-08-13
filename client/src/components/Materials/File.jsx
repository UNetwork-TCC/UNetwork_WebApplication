import { Box, Typography } from '@mui/material'

export default function File({ fileName, description }) {
    return (
        <Box sx={{ display:'flex', mb:'1em', cursor:'pointer', height:'4em', width:'40%', bgcolor:'white'}}>
            <Box sx={{ bgcolor:'#D1C4E9', height:'100%', width:'13%' }}>
            
            </Box>
            <Box sx={{ ml:'1em', display:'flex', flexDirection:'column', justifyContent:'center',}}>
                <Typography sx={{ textTransform:'uppercase', fontSize: '1rem', fontWeight:'bold', color:'black', }}>{fileName}</Typography>
                <Typography sx={{ fontSize: '1rem', color:'black' }}>{description}</Typography>
            </Box>
        </Box>
    )
}
