import { Box, Divider, Typography, useMediaQuery, } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { Link, Route } from 'react-router-dom'
import { Notice } from '../components'
import { MobileHeader2, MobileNavBar } from '../layout'


export default function NewsPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '10px', mt: '5px', }} variant="middle" />
            <Box classname='tudo' sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar buttonStyle={'News'}/>
                )}
                <Divider sx={{ bgcolor: 'gray', m: '0 5px 0 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ mr: '5px' }}>
                    <Box sx={{ m: '3vh 0 2vh 2vw' }}>
                        <Typography sx={{ fontSize: '3vw', color: '#673AB7' }}>UNews</Typography>
                    </Box>
                    <Box sx={{ bgcolor: 'lightGray', width: '25vw', height: '35vh', m: '0 0 3vw 2vw', borderRadius: '10px 10px 10px 10px' }} />

                    <Notice cor={'673Ab7'} description={'Tiroteio e Massacre no dia 20 de junho na Escola Técnica Uirapuru'} />
                    <Notice cor={'2196F3'} description={'Israel Junior Pacheco, historiador formado na USP, assume ser maconheiro'} />
                </Box>
            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
