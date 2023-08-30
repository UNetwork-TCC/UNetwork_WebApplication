import { Avatar, Box } from '@mui/material'
import CustomInput from '../layout/CustomInput'
import { Post } from '../components'
import { Add, AttachFile } from '@mui/icons-material'
import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'
import roubo from '../assets/img/paraPiada/roubo.jpg'
import james from '../assets/img/paraPiada/james.jpg'
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'


export default function Home() {
    const theme = useTheme()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (!localStorage.getItem('user'))
    //         navigate('/auth')
    // })

    return (
        <AppLayout withSidebars>
            <Box display='flex'justifyContent='start' alignItems='center' flexDirection='column' p={3} mt={5} width='70%' height='100%'>
                <Box width='100%'>
                    <CustomInput
                        sx={{ boxShadow: theme.shadows[4] }} 
                        fullWidth
                        width='100%'
                        bgcolor='white'
                        placeholder='No que estou pensando...'
                        color='primary.main'
                        iconColor='#dbdbdb'
                        icon={<Add />}
                    />
                    <Box sx={{ position: 'relative', width: '50px', bottom: 47, right: '4rem', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <input type='file' id='file' accept='image/*' style={{ display: 'none' }} />
                        <Avatar component='label' htmlFor='file' sx={{ cursor: 'pointer', transition: '.3s', bgcolor: 'primary.main', ':hover': { bgcolor: 'primary.light' } }}>
                            <AttachFile />
                        </Avatar>
                    </Box>
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' m={5}>
                    <Post 
                        title={'Roubos gerais'}
                        date={'3 horas atrás'}
                        content={'aaaaaaaaaaaaaaaaaa teste de tudoaaaaaaaaaaaa FLExivelllllllllllllllllllllllll  aaaaaaaaaaaaaaaaaaaa  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}
                        user={{ name: 'Filhos do Jhonatas' }}
                    />
                    <Post 
                        title={'Piada'} 
                        date={'3 horas atrás'} 
                        content='Simplesmente roubado velho:'
                        user={{ name: '3°DS' }}
                        img={roubo}    
                    />

                    <Post 
                        title={'Piada'} 
                        date={'3 horas atrás'} 
                        content='Ô JÂIMESS 🗣🗣, EU QUERO UMA SALADA DE FRUATA 🍌🍏🍇🍓🤤. OLHA QUE HABILIDADE 😏🤠🧐 OLHA QUE HABILIDADE 😏🤠🧐 EU QUERO UMA SALADA DE FRUTA, JAMES 😉🍏🍇. NO CAPRICHO 😋👌🏼. DE 5 🖐🏼, DE 7 🖐🏼✌🏼, DE 10 🖐🏼🤚🏼 ? ME DA UMA DE 5 🤚🏼. AQUI, TÁ NA MÃO 👨🏼‍🍳🤝🍹. TÁ AQUI 🍹. ISSO JAMES, MUITO OBRIGADO 😎🤝. BRIGADO 👌🏼👍🏼. DEUS ABENÇOE 🙏🏼🙏🏼. 👉🏼👉🏼👉🏼ESSE É O JÂIMESS👈🏼👈🏼👈🏼😎😎. HÃÃ ? 🤨🤨. DA SALADA DE FRUTA 🍇🍹👨🏼‍🍳 O ARTIXTA DE CIRCO 🎪 😃'
                        user={{ name: '3°DS' }}
                        img={james}    
                    />
                </Box>
            </Box>
        </AppLayout>
    )
}
