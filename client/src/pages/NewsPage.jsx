import { Box, Divider, Typography, useMediaQuery, } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { Link, Route } from 'react-router-dom'
import { Notice } from '../components'
import { MobileHeader2, MobileNavBar } from '../layout'
import BigNotice from '../components/News/BigNotice'


export default function NewsPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '5px', m: '5px 2% 0 2%', borderRadius:'30px' }} variant="middle" />
            <Box sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar buttonStyle={'News'} />
                )}
                <Divider sx={{m: '10px 5px 10px 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ m: '2vw 0 0 1vh', }}>
                    <Box sx={{ mr: '5px' }}>
                        <Box display={'flex'} width={'78vw'} sx={{ justifyContent: 'space-between', }}>
                            <BigNotice Title={'CULTURA'} description={'Bahia, um dos maiores centros religiosos do Brasil'} />
                            <BigNotice Title={'ATUALIDADE'} description={'FIm do Dólar? Colapso Financeiro? Entenda a Nova Ordem Mundial'} />
                            <BigNotice Title={'ATUALIDADE'} description={'FIm do Dólar? Colapso Financeiro? Entenda a Nova Ordem Mundial'} />
                        </Box>
                        <Box sx={{display:'flex', mt:'3vh'}}>
                            <Box>
                                <Notice title={'URGENTE'} description={'Tiroteio e Massacre no dia 20 de junho na Escola Técnica Uirapuru'} cor={'673Ab7'}/>
                                <Notice title={'FOFOCA'} description={'Israel Junior Pacheco, historiador formado na USP, assume ser maconheiro'} cor={'2196F3'}/>
                            </Box>
                            <Box>
                                <Notice title={'TECNOLOGIA'} description={'Meta lança modelo de IA especialista em gerar músicas'}  cor={'673Ab7'}/>
                                <Notice title={'FOFOCA'} description={'Israel Junior Pacheco, historiador formado na USP, assume ser maconheiro'} cor={'2196F3'}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
