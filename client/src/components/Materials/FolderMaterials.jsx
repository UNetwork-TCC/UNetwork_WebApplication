import { Box, Button, Link, Paper, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export default function FolderMaterials({ FolderName, id }) {
    return (
        <Paper elevation={6} sx={{
            margin: '0 0 0 0px', display: 'flex', flexDirection: 'column', bgcolor: 'white', width: '18em', height: '15em',
            borderRadius: '.6vh',
            // boxShadow:'5px 5px rgba(0,0,0,0.2)' /*Vitão, comenta esse boxShadow e vê se fica melhor na sua opiniao. Eu não consigo decidir a melhor, se é com bax-shadow, ou com elevation*/ 
        }}>
            <Box sx={{ width: '95%', height: '20%' }}>
                <MoreHorizIcon sx={{ cursor: 'pointer', m: '0.5em 0', float: 'right', fontSize: '1.8em', ':hover': { color: 'text.secondary' } }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '30%', mb: '7%' }}>
                <Box sx={{ bgcolor: 'gray', width: '25%', height: '100%' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Typography sx={{ fontSize: '1.2em', textTransform: 'uppercase', fontWeight: 'bold', color: 'black' }}>{FolderName}</Typography>
                <Link href={`#${id}`} >
                    <Button sx={{ color: 'black', textTransform: 'uppercase', fontSize: '1em', border: '1px solid #673AB7', borderRadius: '3.1vh', padding: '0 7px', mt: '10%', ':hover': { color: 'white', bgcolor: '#673AB7' } }}>Ver Arquivos</Button>
                </Link>

            </Box>
        </Paper>
    )
}
