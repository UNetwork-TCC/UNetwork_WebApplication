import { Box, Typography, useMediaQuery } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Contact({ username }) {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{ mb: '5%', display:'flex', alignItems:'center', ml:'2%', width:'79vh', height:'9vh' }}>
            <AccountCircleIcon sx={matches ? { fontSize: '100px', color:'gray'} : { fontSize: '45px', }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '1.6vh' }}>
                <Box>
                    <Typography sx={matches ? { fontSize: '18px', fontWeight: 'bold', color: 'black' } : { fontSize: '12px', fontWeight: 'bold', color: 'black' }}>{username}</Typography>
                </Box>
                <Box sx={{display:'flex'}}>
                    <Typography sx={{ fontSize: '17px' }}>last mensage</Typography>
                </Box>
            </Box>
        </Box>
    )
}
