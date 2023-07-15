import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import { Post } from '../components'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'
import Clips from '../components/Timeline/Clips'
import Suggestion from '../components/Timeline/Suggestion'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'

export default function TimelinePage() {

    const slides = {
        width: '10.8vh'
    }

    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{ overflow: 'hidden' }}>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius: '3.1vh' }} variant="middle" />
            <Box sx={{ display: 'flex', }}>
                {matches && (
                    <NavBar />
                )}
                <Divider sx={{ m: '1.1vh 0 1.1vh 0' }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ width: '55%', height: '88vh', }}>

                    <CarouselProvider totalSlides={12} naturalSlideWidth={0}  orientation='horizontal' style={{ display: 'flex', }} step={5} touchEnabled isIntrinsicHeight dragEnabled>

                        {/* mensagem para o totalSlides: a quantida de totalSlides vai ser a quantidade total de tag 'Slide' que tem no carousel,
                         depois tirar 9 (que é a quantidade de slides padrão que vai aparecer nos clips naturalmente), e adicionar +1 (que vai 
                         servir pra ficar um espaço idelal no final) */}

                        <ButtonBack style={{ height: '5vh', marginTop: '5vh', borderRadius: '10.1vh', padding: '0 1vh' }}><ArrowBackIosNew /></ButtonBack>

                        <Box sx={{ pl: '5vh', maxWidth: '95%', height: '20%', pt: '1.5%', display: 'flex', '::-webkit-scrollbar': { display: 'none' }, overflowX: 'hidden' }}>
                            {/* para fazer com que o scroll do componente volte a funcionar (ou nao funcionar), é so trocar na box acima, o oveflow para scroll (mas ai vai quebrar la no final dos 'clips'), (e hidden para não funcionar a rolagem) */}
                            <Slider moveThreshold={'1000px'}><Slide index={0} style={slides}><Clips username={'1'} /></Slide></Slider>
                            <Slider><Slide index={1} style={slides}><Clips username={'2'} /></Slide></Slider>
                            <Slider><Slide index={2} style={slides}><Clips username={'3'} /></Slide></Slider>
                            <Slider><Slide index={3} style={slides}><Clips username={'4'} /></Slide></Slider>
                            <Slider><Slide index={4} style={slides}><Clips username={'5'} /></Slide></Slider>
                            <Slider><Slide index={5} style={slides}><Clips username={'6'} /></Slide></Slider>
                            <Slider><Slide index={6} style={slides}><Clips username={'7'} /></Slide></Slider>
                            <Slider><Slide index={7} style={slides}><Clips username={'8'} /></Slide></Slider>
                            <Slider><Slide index={8} style={slides}><Clips username={'9'} /></Slide></Slider>
                            <Slider><Slide index={9} style={slides}><Clips username={'10'} /></Slide></Slider>
                            <Slider><Slide index={10} style={slides}><Clips username={'11'} /></Slide></Slider>
                            <Slider><Slide index={11} style={slides}><Clips username={'12'} /></Slide></Slider>
                            <Slider><Slide index={12} style={slides}><Clips username={'13'} /></Slide></Slider>
                            <Slider><Slide index={13} style={slides}><Clips username={'14'} /></Slide></Slider>
                            <Slider><Slide index={14} style={slides}><Clips username={'15'} /></Slide></Slider>
                            <Slider><Slide index={15} style={slides}><Clips username={'16'} /></Slide></Slider>
                            <Slider><Slide index={16} style={slides}><Clips username={'17'} /></Slide></Slider>
                            <Slider><Slide index={17} style={slides}><Clips username={'18'} /></Slide></Slider>
                            <Slider><Slide index={17} style={slides}><Clips username={'19'} /></Slide></Slider>
                            <Slider><Slide index={17} style={slides}><Clips username={'20'} /></Slide></Slider>

                        </Box>
                        <ButtonNext style={{ height: '5vh', marginTop: '5vh', borderRadius: '10.1vh', padding: '0 1vh' }}><ArrowForwardIos /></ButtonNext>
                    </CarouselProvider>


                    <Divider sx={{ mb: '1%' }} flexItem />
                    <Box sx={{ m: '0 2%', overflow: 'scroll', maxHeight: '80.5%', '::-webkit-scrollbar': { display: 'none' } }}>
                        <Post username={'O repetente'} data={'2ºDS'} date={'A 10mil anos atras'} description={'Ô JÂIMESS 🗣🗣, EU QUERO UMA SALADA DE FRUTA 🍌🍏🍇🍓🤤. OLHA QUE HABILIDADE 😏🤠🧐 OLHA QUE HABILIDADE 😏🤠🧐 EU QUERO UMA SALADA DE FRUTA, JAMES 😉🍏🍇. NO CAPRICHO 😋👌🏼. DE 5 🖐🏼, DE 7 🖐🏼✌🏼, DE 10 🖐🏼🤚🏼 ? ME DA UMA DE 5 🤚🏼. AQUI, TÁ NA MÃO 👨🏼‍🍳🤝🍹. TÁ AQUI 🍹. ISSO JAMES, MUITO OBRIGADO 😎🤝. BRIGADO 👌🏼👍🏼. DEUS ABENÇOE 🙏🏼🙏🏼. 👉🏼👉🏼👉🏼ESSE É O JÂIMESS👈🏼👈🏼👈🏼😎😎. HÃÃ ? 🤨🤨. DA SALADA DE FRUTA 🍇🍹👨🏼‍🍳 O ARTIXTA DE CIRCO 🎪 😃'} />
                        <Post username={'O repetente'} data={'2ºDS'} date={'A 10mil anos atras'} description={'Ô JÂIMESS 🗣🗣, EU QUERO UMA SALADA DE FRUTA 🍌🍏🍇🍓🤤. OLHA QUE HABILIDADE 😏🤠🧐 OLHA QUE HABILIDADE 😏🤠🧐 EU QUERO UMA SALADA DE FRUTA, JAMES 😉🍏🍇. NO CAPRICHO 😋👌🏼. DE 5 🖐🏼, DE 7 🖐🏼✌🏼, DE 10 🖐🏼🤚🏼 ? ME DA UMA DE 5 🤚🏼. AQUI, TÁ NA MÃO 👨🏼‍🍳🤝🍹. TÁ AQUI 🍹. ISSO JAMES, MUITO OBRIGADO 😎🤝. BRIGADO 👌🏼👍🏼. DEUS ABENÇOE 🙏🏼🙏🏼. 👉🏼👉🏼👉🏼ESSE É O JÂIMESS👈🏼👈🏼👈🏼😎😎. HÃÃ ? 🤨🤨. DA SALADA DE FRUTA 🍇🍹👨🏼‍🍳 O ARTIXTA DE CIRCO 🎪 😃'} />
                        <Post username={'O repetente'} data={'2ºDS'} date={'A 10mil anos atras'} description={'Ô JÂIMESS 🗣🗣, EU QUERO UMA SALADA DE FRUTA 🍌🍏🍇🍓🤤. OLHA QUE HABILIDADE 😏🤠🧐 OLHA QUE HABILIDADE 😏🤠🧐 EU QUERO UMA SALADA DE FRUTA, JAMES 😉🍏🍇. NO CAPRICHO 😋👌🏼. DE 5 🖐🏼, DE 7 🖐🏼✌🏼, DE 10 🖐🏼🤚🏼 ? ME DA UMA DE 5 🤚🏼. AQUI, TÁ NA MÃO 👨🏼‍🍳🤝🍹. TÁ AQUI 🍹. ISSO JAMES, MUITO OBRIGADO 😎🤝. BRIGADO 👌🏼👍🏼. DEUS ABENÇOE 🙏🏼🙏🏼. 👉🏼👉🏼👉🏼ESSE É O JÂIMESS👈🏼👈🏼👈🏼😎😎. HÃÃ ? 🤨🤨. DA SALADA DE FRUTA 🍇🍹👨🏼‍🍳 O ARTIXTA DE CIRCO 🎪 😃'} />
                    </Box>
                </Box>
                <Divider sx={{ m: '1.1vh 0px 1.1vh 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ width: '25%', height: '88vh', position: 'relative', zIndex: '2', bgcolor: 'white', pt: '3.1vh', }}>
                    <Typography sx={{ color: '#673AB7', fontSize: '2.3vh', mb: '1.6vh', ml: '.8vh', fontWeight: 'bold' }}>Sugestões para você</Typography>
                    <Box sx={{ overflow: 'scroll', maxHeight: '94%', '::-webkit-scrollbar': { display: 'none' } }}>
                        <Suggestion username={'USERNAME'} />
                        <Suggestion username={'USERNAME'} />
                        <Suggestion username={'USERNAME'} />
                        <Suggestion username={'USERNAME'} />
                        <Suggestion username={'USERNAME'} />
                        <Suggestion username={'USERNAME'} />
                        <Suggestion username={'USERNAME'} />
                        <Suggestion username={'USERNAME'} />
                    </Box>
                </Box>

            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
