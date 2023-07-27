import { Box, Button, Link, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export default function Folder({ FolderName, id }) {
    return (
        <Box sx={{ margin:'0 10px 10px 0px',display: 'flex', flexDirection: 'column', bgcolor: 'whitesmoke', width: '15vw', height: '25vh', borderRadius: '.6vh',boxShadow:'5px 5px rgba(0,0,0,0.1)' }}>
            <Box sx={{width: '14vw', height:'20%'}}>
                <MoreHorizIcon sx={{ cursor:'pointer', m:'1vh 0', float:'right', fontSize:'30px'}} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width:'100%', height:'30%', mb:'7%' }}>
                <Box sx={{ bgcolor: '#D1C4E9', width: '25%', height: '100%' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography sx={{ fontSize: '20px', textTransform: 'uppercase', fontWeight: 'bold' }}>{FolderName}</Typography>
                <Link href={`#${id}`} >
                    <Button sx={{color:'#673AB7',textTransform: 'uppercase', fontSize: '15px', border: '1px solid #673AB7', borderRadius: '3.1vh', padding:'0 7px', mt:'10%', ':hover':{color:'white', bgcolor:'#673AB7'}}}>Ver Arquivos</Button>
                </Link>

            </Box>
        </Box>
    )
}
