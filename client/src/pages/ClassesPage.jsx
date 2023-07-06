import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import { Chat, Classes, SideBar } from '../components'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'
import { BuildOutlined, FilterList } from '@mui/icons-material'


export default function ClassesPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{}}>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '5px', m: '5px 2% 0 2%', borderRadius: '30px' }} variant="middle" />
            <Box sx={{ display: 'flex', overflow: 'hidden', }}>
                {matches && (
                    <NavBar buttonStyle={'Classes'} />
                )}
                <Divider sx={{ m: '10px 5px 10px 0', }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ mr: '5px', height: '86vh', }}>
                    <Box sx={{ height: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '30px 5px 15px 50px', alignItems: 'center', }}>
                            <Typography sx={!matches ? { fontSize: '22.5px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px', marginTop: '5px', } : { fontSize: '5vh', color: '#673AB7', fontWeight: 'bold', }}>Suas Classes</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <FilterList sx={{ color: '#D1C4E9', cursor: 'pointer', fontSize: '4vh' }} />
                                <BuildOutlined sx={{ color: '#D1C4E9', ml: '30px', fontSize: '3.5vh', transform: 'scaleX(-1)', cursor: 'pointer' }} />
                                <Box sx={{ height: '75%', bgcolor: '#673AB7', fontSize: '1.5vh', borderRadius: '30px', color: 'white', padding: '3px 15px', ml: '30px', mr:'30px' ,':hover': { cursor: 'pointer' } }}>CRIAR CLASSE</Box>
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow: 'row wrap', maxHeight: '91%', m: '10px 0 0px 50px', alignItems: 'center', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' } }}>
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
