import { Box } from '@mui/material'
import CustomInput from '../layout/CustomInput'
import { Post } from '../components'
import { Add } from '@mui/icons-material'
import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'
import roubo from '../assets/img/paraPiada/roubo.jpg'


export default function Feed() {
    const theme = useTheme()

    return (
        <AppLayout withSidebars>
            <Box display='flex'justifyContent='start' alignItems='center' flexDirection='column' p={3} mt={5} width='70%' height='100%'>
                <Box width='100%'>
                    <CustomInput
                        sx={{ boxShadow: theme.shadows[5] }} 
                        fullWidth
                        width='100%'
                        bgcolor='white'
                        placeholder='No que estou pensando...'
                        color='primary.main'
                        iconColor='#dbdbdb'
                        icon={<Add />}
                    />
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' m={5}>
                    <Post title={'Roubos gerais'} name={'Filhos do jonatas'} date={'3 horas atrás'} content={'aaaaaaaaaaaaaaaaaa teste de tudoaaaaaaaaaaaa FLExivelllllllllllllllllllllllll  aaaaaaaaaaaaaaaaaaaa  aaaaaa'}/>
                    <Post title={'Piada'} name={'2ºADM'} date={'3 horas atrás'} content={<img src={roubo} duration={1000} />}/>

                </Box>
            </Box>
        </AppLayout>
    )
}
