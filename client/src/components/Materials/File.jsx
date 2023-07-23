import { Box, Typography } from '@mui/material'

export default function File({fileName, description}) {
    return (
        <Box sx={{display:'flex', mb:'2%', cursor:'pointer'}}>
            <Box sx={{bgcolor:'#D1C4E9', height:'50px', width:'50px'}}>
            
            </Box>
            <Box sx={{ml:'1.5%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <Typography sx={{textTransform:'uppercase', color:'#673AB7', fontSize: '18px', fontWeight:'bold'}}>{fileName}</Typography>
                <Typography sx={{fontSize: '15px'}}>{description}</Typography>
            </Box>
        </Box>
    )
}
