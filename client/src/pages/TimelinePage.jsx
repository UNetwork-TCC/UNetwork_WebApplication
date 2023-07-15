import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import { Post } from '../components'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'
import Clips from '../components/Timeline/Clips'
import Suggestion from '../components/Timeline/Suggestion'


export default function TimelinePage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{overflow:'hidden'}}>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius:'3.1vh' }} variant="middle" />
            <Box sx={{ display: 'flex', }}>
                {matches && (
                    <NavBar />
                )}
                <Divider sx={{ m: '1.1vh 0 1.1vh 0'}} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ width: '55%', height: '88vh', }}>
                    <Box sx={{ width: '100%', height: '20%', pt:'1.5%',bgcolor:'white', display:'flex', '::-webkit-scrollbar': { display: 'none' }, overflowY:'scroll'}}>
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        <Clips username={'Você'} />
                        
                    </Box>
                    <Divider sx={{mb:'1%'}} flexItem />
                    <Box sx={{m:'0 2%', overflow:'scroll', maxHeight:'80.5%', '::-webkit-scrollbar': { display: 'none' }}}>
                        <Post username={'O repetente'} data={'2ºDS'} date={'A 10mil anos atras'} description={'Ô JÂIMESS 🗣🗣, EU QUERO UMA SALADA DE FRUTA 🍌🍏🍇🍓🤤. OLHA QUE HABILIDADE 😏🤠🧐 OLHA QUE HABILIDADE 😏🤠🧐 EU QUERO UMA SALADA DE FRUTA, JAMES 😉🍏🍇. NO CAPRICHO 😋👌🏼. DE 5 🖐🏼, DE 7 🖐🏼✌🏼, DE 10 🖐🏼🤚🏼 ? ME DA UMA DE 5 🤚🏼. AQUI, TÁ NA MÃO 👨🏼‍🍳🤝🍹. TÁ AQUI 🍹. ISSO JAMES, MUITO OBRIGADO 😎🤝. BRIGADO 👌🏼👍🏼. DEUS ABENÇOE 🙏🏼🙏🏼. 👉🏼👉🏼👉🏼ESSE É O JÂIMESS👈🏼👈🏼👈🏼😎😎. HÃÃ ? 🤨🤨. DA SALADA DE FRUTA 🍇🍹👨🏼‍🍳 O ARTIXTA DE CIRCO 🎪 😃'}/>
                        <Post username={'O repetente'} data={'2ºDS'} date={'A 10mil anos atras'} description={'Ô JÂIMESS 🗣🗣, EU QUERO UMA SALADA DE FRUTA 🍌🍏🍇🍓🤤. OLHA QUE HABILIDADE 😏🤠🧐 OLHA QUE HABILIDADE 😏🤠🧐 EU QUERO UMA SALADA DE FRUTA, JAMES 😉🍏🍇. NO CAPRICHO 😋👌🏼. DE 5 🖐🏼, DE 7 🖐🏼✌🏼, DE 10 🖐🏼🤚🏼 ? ME DA UMA DE 5 🤚🏼. AQUI, TÁ NA MÃO 👨🏼‍🍳🤝🍹. TÁ AQUI 🍹. ISSO JAMES, MUITO OBRIGADO 😎🤝. BRIGADO 👌🏼👍🏼. DEUS ABENÇOE 🙏🏼🙏🏼. 👉🏼👉🏼👉🏼ESSE É O JÂIMESS👈🏼👈🏼👈🏼😎😎. HÃÃ ? 🤨🤨. DA SALADA DE FRUTA 🍇🍹👨🏼‍🍳 O ARTIXTA DE CIRCO 🎪 😃'}/>
                        <Post username={'O repetente'} data={'2ºDS'} date={'A 10mil anos atras'} description={'Ô JÂIMESS 🗣🗣, EU QUERO UMA SALADA DE FRUTA 🍌🍏🍇🍓🤤. OLHA QUE HABILIDADE 😏🤠🧐 OLHA QUE HABILIDADE 😏🤠🧐 EU QUERO UMA SALADA DE FRUTA, JAMES 😉🍏🍇. NO CAPRICHO 😋👌🏼. DE 5 🖐🏼, DE 7 🖐🏼✌🏼, DE 10 🖐🏼🤚🏼 ? ME DA UMA DE 5 🤚🏼. AQUI, TÁ NA MÃO 👨🏼‍🍳🤝🍹. TÁ AQUI 🍹. ISSO JAMES, MUITO OBRIGADO 😎🤝. BRIGADO 👌🏼👍🏼. DEUS ABENÇOE 🙏🏼🙏🏼. 👉🏼👉🏼👉🏼ESSE É O JÂIMESS👈🏼👈🏼👈🏼😎😎. HÃÃ ? 🤨🤨. DA SALADA DE FRUTA 🍇🍹👨🏼‍🍳 O ARTIXTA DE CIRCO 🎪 😃'}/>
                    </Box>
                </Box>
                <Divider sx={{ m: '1.1vh 0px 1.1vh 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ width: '25%', height: '88vh', position: 'relative', zIndex: '2', bgcolor: 'white', pt: '3.1vh', }}>
                    <Typography sx={{ color: '#673AB7', fontSize: '2.3vh', mb: '1.6vh', ml: '.8vh', fontWeight:'bold'}}>Sugestões para você</Typography>
                    <Box sx={{overflow:'scroll', maxHeight:'94%', '::-webkit-scrollbar': { display: 'none' }}}>
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
