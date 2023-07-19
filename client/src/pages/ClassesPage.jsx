import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import { Classes, } from '../components'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'
import { BuildOutlined, FilterList } from '@mui/icons-material'


export default function ClassesPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{}}>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius: '3.1vh' }} variant="middle" />
            <Box sx={{ display: 'flex', overflow: 'hidden', }}>
                {matches && (
                    <NavBar buttonStyle={'Classes'} />
                )}
                <Divider sx={{ m: '1.1vh .6vh 1.1vh 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ mr: '.6vh', height: '86vh', }}>
                    <Box sx={{ height: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '3.1vh .6vh 1.6vh 5.1vh', alignItems: 'center', }}>
                            <Typography sx={!matches ? { fontSize: '2.35vh', color: '#673AB7', fontWeight: 'bold', marginRight: '.6vh', marginTop: '.6vh', } : { fontSize: '5vh', color: '#673AB7', fontWeight: 'bold', }}>Suas Classes</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <FilterList sx={{ color: '#D1C4E9', cursor: 'pointer', fontSize: '4vh' }} />
                                <BuildOutlined sx={{ color: '#D1C4E9', ml: '3.1vh', fontSize: '3.5vh', transform: 'scaleX(-1)', cursor: 'pointer' }} />
                                <Box sx={{ height: '75%', bgcolor: '#673AB7', fontSize: '1.5vh', borderRadius: '3.1vh', color: 'white', padding: '.4vh 1.6vh', ml: '3.1vh', mr:'3.1vh' ,':hover': { cursor: 'pointer' } }}>CRIAR CLASSE</Box>
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow: 'row wrap', maxHeight: '91%', m: '1.1vh 0 0 5.1vh', alignItems: 'center', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' } }}>
                            <Classes material={'Biologia'} description={'Classe de biologia'} />
                            <Classes material={'Matemática'} description={'Classe de Matematica'} />
                            <Classes material={'Química'} description={'Classe de qu iiiiiiiiiiiiiiiiiiiiiiiiii'} />
                            <Classes material={'Geografia'} description={'MRBEASTTTTTTTTTTTTTT '} />
                            <Classes material={'PAM'} description={'É o PAMcadão'} />
                            <Classes material={'Português'} description={'Só 6 pessoas se increveram na Cuco :c'} />
                            <Classes material={'História'} description={'ZZZZZzzzZZzZZZZZ'} />
                            <Classes material={'Filosofia'} description={'Só 5 pessoas assistiram a aula ;C by: Prof Guilherme'} />
                            <Classes material={'Filosofia'} description={'Só 5 pessoas assistiram a aula ;C by: Prof Guilherme'} />
                            <Classes material={'Filosofia'} description={'Só 5 pessoas assistiram a aula ;C by: Prof Guilherme'} />
                            <Classes material={'Filosofia'} description={'Só 5 pessoas assistiram a aula ;C by: Prof Guilherme'} />
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
