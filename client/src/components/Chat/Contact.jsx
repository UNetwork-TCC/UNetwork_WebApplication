import { Box, Typography, useMediaQuery } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Contact({ username }) {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{ mb: '5%', display:'flex', alignItems:'center', ml:'4%', width:'100%', height:'9vh', fontSize:'10px', }}>
            <AccountCircleIcon sx={matches ? { fontSize: '8em', color:'gray',} : { fontSize: '45px', }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1.6em', width:'50%',maxWidth:'70%', }}>
                <Box>
                    <Typography sx={matches ? { fontSize: '1.8em', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>{username}</Typography>
                </Box>
                <Box sx={{display:'flex'}}>
                    <Typography sx={{ fontSize: '1.6em' }}>last mensage</Typography>
                </Box>
            </Box>
        </Box>
    )
}
