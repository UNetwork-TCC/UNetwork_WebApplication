import { Box, Divider, Typography } from '@mui/material'
import Image from 'mui-image'
import { Topic } from '../../layout'

import discoverFeature from '../../assets/svg/Home/DiscoverFeature.svg'
import discoverFeature2 from '../../assets/svg/Home/DiscoverFeature2.svg'
import discoverFeature3 from '../../assets/svg/Home/DiscoverFeature3.svg'
import discoverFeature3Decoration from '../../assets/svg/Home/DiscoverFeature3Decoration.svg'

import { Animation } from 'react-animate-style'
import { AnimateOnScroll } from '../Misc'

import { Person, Group } from '@mui/icons-material'
import { CustomDivider } from '../../layout'

export default function DiscoverSection() {
    return (
        <Box>
            <Box m={2.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                    <Animation animationIn='fadeInUp' isVisible animationInDelay={300}>
                        <Typography variant="h3">Descubra</Typography>
                        <CustomDivider />
                    </Animation>
                </Box>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll animateOnce animation='fadeInLeft' duration={1500}>
                    <Box sx={{ width: '99%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Image style={{ userSelect: 'none' }} height={600} width={600} src={discoverFeature} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title='Conexões e Conhecimentos'
                            text='Conecte-se instantaneamente com pessoas afins na UNetwork! Encontre novos amigos, compartilhe conhecimentos e crie laços!'
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll animateOnce animation='fadeInRight' duration={1500}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title='Compartilhe Momentos'
                            text='Compartilhe, inspire e conecte-se com outros apaixonados por momentos inesquecíveis'
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                    <Box mb={5} sx={{ width: '50%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Image style={{ userSelect: 'none' }} height={600} width={700} src={discoverFeature2} />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' flexDirection='column' alignItems='center' p={5} mt={20}>
                <AnimateOnScroll animateOnce style={{ flexDirection: 'column' }} animation='fadeInUp' duration={1500}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title='Fique atualizado diariamente!'
                            text='Sua timeline estará sempre atualizada de acordo com seus interesses.'
                            boxStyle={{ textAlign: 'center' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                    <Box sx={{ postion: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Image style={{ userSelect: 'none', marginLeft: '100px', marginTop: '20px', zIndex: 2 }} height={700} width={1100} src={discoverFeature3} />
                        <Box position='relative' top={300} display='flex' justifyContent='center' alignItems='center'>
                            <Box>
                                <Typography color='secondary.dark' variant='h3'>+5K</Typography>
                                <Box display='flex'>
                                    <Person sx={{ m: '5px 10px 0 0' }} />
                                    <Typography variant='h5'>Membros</Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ m: '0 75px' }} />
                            <Box>
                                <Typography color='secondary.dark' variant='h3'>+200</Typography>
                                <Box display='flex'>
                                    <Group sx={{ m: '5px 10px 0 0' }} />
                                    <Typography variant='h5'>Classes</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </AnimateOnScroll>
                <Box mb={5} sx={{ width: '100vw', postion: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ userSelect: 'none', position: 'relative', bottom: 600, zIndex: 1 }} height={1600} width='100%' src={discoverFeature3Decoration} />
                </Box>
            </Box>
        </Box>
    )
}