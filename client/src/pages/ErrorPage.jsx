import { Box, Button, Typography } from '@mui/material'
import Image from 'mui-image'
import { useNavigate } from 'react-router-dom'
import '../styles/resetOverflow.css'

// Svg imports
import topDecoration from '../assets/svg/TopDecoration.svg'
import bottomDecoration from '../assets/svg/BottomDecoration.svg'
import errorSvg from '../assets/svg/ErrorSvg.svg'


function ErrorPage() {
    const navigate = useNavigate()

    return (
        <Box  height='100vh' display='flex' justifyContent='center' alignItems={'center'} flexDirection='column'>
            <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' position='absolute'>
                <Image duration={0.3} src={topDecoration} />
            </Box>
            <Box sx={{ pointerEvents: 'none' }} width='100%' height='100%' position='absolute' top={'62%'}>
                <Image duration={0.3} src={bottomDecoration} />
            </Box>
            <Box p m display='flex' alignItems='center' width='70%' height='50%'>
                <Box>
                    <Image duration={0.3} style={{ position: 'relative' }} src={errorSvg} />
                </Box>
                <Box m={5} height='50%' width='5px' bgcolor='divider'></Box>
                <Box m={3} display='flex' flexDirection='column' height='80%'>
                    <Box display='flex' flexDirection='column'>
                        <Typography m variant="h1" color='secondary.main' fontSize='9rem' fontWeight={900}>404</Typography>
                        <Typography m variant="h4" fontWeight={900}>Essa página não existe</Typography>
                        <Typography m variant="h5">Você pode ficar e relaxar aqui ou voltar ao começo.</Typography>
                    </Box>
                    <Box>
                        <Button onClick={() => navigate('/')} sx={{ marginLeft: '8px', marginTop: '25px', borderRadius: '15px' }} variant="contained">Volte para o início</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ErrorPage