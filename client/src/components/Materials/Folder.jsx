import { Box, Button, Link, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export default function Folder({ FolderName, id }) {
    return (
        <Box sx={{ margin:'0 10px 10px 0px',display: 'flex', flexDirection: 'column', bgcolor: 'whitesmoke', width: '15vw', height: '25vh', borderRadius: '.6vh',boxShadow:'5px 5px rgba(0,0,0,0.1)' }}>
            <MoreHorizIcon sx={{ width: '27vw', cursor:'pointer', m:'1vh 0', height:'15%'}} />
            <Box sx={{ display: 'flex', justifyContent: 'center', width:'100%', height:'40%'}}>
                <Box sx={{ bgcolor: '#D1C4E9', width: '6.8vh', height: '6.8vh' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography sx={{ fontSize: '2vh', textTransform: 'uppercase', fontWeight: 'bold' }}>{FolderName}</Typography>
                <Link href={`#${id}`} >
                    <Button sx={{ color:'#673AB7',textTransform: 'uppercase', fontSize: '1.6vh', float: 'right', border: '1px solid #673AB7', borderRadius: '3.1vh', padding:'0 .8vh', mt:'10%', ':hover':{color:'white', bgcolor:'#673AB7'}}}>Ver Arquivos</Button>
                </Link>

            </Box>
        </Box>
    )
}
