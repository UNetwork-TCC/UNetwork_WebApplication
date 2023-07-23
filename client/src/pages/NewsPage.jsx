import { Box, Divider, useMediaQuery, } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { Notice } from '../components'
import { MobileHeader2, MobileNavBar } from '../layout'
import BigNotice from '../components/News/BigNotice'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'


export default function NewsPage() {
    const matches = useMediaQuery('(min-width: 600px)')

    
    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius: '3.1vh' }} variant="middle" />
            <Box sx={{ display: 'flex', width:'100vw' }}>
                {matches && (
                    <NavBar buttonStyle={'News'} />
                )}
                <Divider sx={{ m: '1.1vh .6vh 1.1vh 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ m: '2vw 0 0 1vh', width: '100%',}}>
                    <Box sx={{ mr: '.6vh', width:'100%',  }}>
                        <Box sx={{ maxWidth:'80%', }}>
                            <CarouselProvider totalSlides={3} orientation='horizontal' style={{ display: 'flex', maxWidth:'100%', minWidth:'83%'}} step={1} touchEnabled isIntrinsicHeight dragEnabled>

                                {/* mensagem para o parametro de totalSlides: a quantia de totalSlides tem que ser a quantidade total da tag 'Slide' que tem no carrosel,
depois tirar 9 (que é a quantidade de slides padrão que vai aparecer nos clips naturalmente), e adicionar +1 (que vai 
servir pra aparecer o ultimo 'clips') */}

                                <ButtonBack style={{ height: '6%', marginTop: '12.5vh', border: '0px solid gray', borderRadius: '10.1vh', padding: '0 0', background: 'none' }} ><ArrowBackIosNew sx={{ fontSize: '2.7vh' }} /></ButtonBack>
                                <Box sx={{maxWidth: '100%', height: '50%', pt: '1.5%', display: 'flex', '::-webkit-scrollbar': { display: 'none' }, overflowX: 'scroll' }}>
                                    {/* para fazer com que o scroll do componente volte a funcionar (ou nao funcionar), é so trocar na box acima, o oveflow para scroll (mas ai vai quebrar la no final dos 'clips'), (e hidden para não funcionar a rolagem) */}
                                    <Slider><Slide index={0}><BigNotice Title={'CULTURA'} description={'Bahia, um dos maiores centros religiosos do Brasil'} /></Slide></Slider>
                                    <Slider><Slide index={1}><BigNotice Title={'ATUALIDADE'} description={'FIm do Dólar? Colapso Financeiro? Entenda a Nova Ordem Mundial'} /></Slide></Slider>
                                    <Slider><Slide index={2}><BigNotice Title={'ATUALIDADE'} description={'FIm do Dólar? Colapso Financeiro? Entenda a Nova Ordem Mundial'} /></Slide></Slider>
                                    <Slider><Slide index={3}><BigNotice Title={'ATUALIDADE'} description={'FIm do Dólar? Colapso Financeiro? Entenda a Nova Ordem Mundial'} /></Slide></Slider>
                                    <Slider><Slide index={4}><BigNotice Title={'ATUALIDADE'} description={'FIm do Dólar? Colapso Financeiro? Entenda a Nova Ordem Mundial'} /></Slide></Slider>
                                
                                    

                                </Box>
                                <ButtonNext style={{ height: '5vh', marginTop: '12.5vh', border: '0px solid gray', borderRadius: '10.1vh', padding: '0 1vh', background: 'none' }}><ArrowForwardIos sx={{ fontSize: '2.7vh' }} /></ButtonNext>
                            </CarouselProvider>
                            
                        </Box>
                        <Box sx={{ display: 'flex', mt: '0vh', width: '100%', ml: '2%' }}>
                            <Box>
                                <Notice title={'URGENTE'} description={'Tiroteio e Massacre no dia 20 de junho na Escola Técnica Uirapuru'} cor={'673Ab7'} />
                                <Notice title={'FOFOCA'} description={'Israel Junior Pacheco, historiador formado na USP, assume ser maconheiro'} cor={'2196F3'} />
                            </Box>
                            <Box>
                                <Notice title={'TECNOLOGIA'} description={'Meta lança modelo de IA especialista em gerar músicas'} cor={'673Ab7'} />
                                <Notice title={'FOFOCA'} description={'Israel Junior Pacheco, historiador formado na USP, assume ser maconheiro'} cor={'2196F3'} />
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
