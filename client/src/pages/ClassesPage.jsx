import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import { Chat, Classes, SideBar } from '../components'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'
import { BuildOutlined, FilterList } from '@mui/icons-material'


export default function ClassesPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '10px', mt: '5px' }} variant="middle" />
            <Box sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar buttonStyle={'Classes'} />
                )}
                <Divider sx={{m: '10px 5px 0 0' }} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ mr: '5px' }}>
                    <Box sx={{ width: '75vw', }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '20px 0 10px 25px', alignItems: 'center', }}>
                            <Typography sx={!matches ? { fontSize: '15px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px', marginTop: '5px', } : { fontSize: '30px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px' }}>Suas Classes</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                <FilterList sx={{ color: '#D1C4E9', cursor: 'pointer' }} />
                                <BuildOutlined sx={{ color: '#D1C4E9', ml: '10px', transform: 'scaleX(-1)', cursor: 'pointer' }} />
                                <Box sx={{ height: '50%', bgcolor: '#673AB7', fontSize: '10px', borderRadius: '30px', color: 'white', padding: '3px 12px', ml: '10px', ':hover': { cursor: 'pointer' } }}>CRIAR CLASSES</Box>
                            </Box>
                        </Box >
                        <Box sx={{ display: 'flex', flexFlow:'row wrap' , m: '10px 0 10px 50px', alignItems: 'center', }}>
                            <Classes material={'Biologia'} description={'Classe de biologia'}/>
                            <Classes material={'Matemática'} description={'Classe de Matematica'}/>
                            <Classes material={'quimica'} description={'Classe de qu iiiiiiiiiiiiiiiiiiiiiiiiii'}/>
                            <Classes material={'Geografia'} description={'MRBEASTTTTTTTTTTTTTT '}/>
                            <Classes material={'PAM'} description={'É o PAMcadão'}/>
                            <Classes material={'Português'} description={'Só 6 pessoas se increveram na Cuco :c'}/>
                            <Classes material={'História'} description={'ZZZZZzzzZZzZZZZZ'}/>
                            <Classes material={'Filosofia'} description={'Só 5 pessoas assistiram a aula ;C by: Prof Guilherme'}/>
                            
                            
                            
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
