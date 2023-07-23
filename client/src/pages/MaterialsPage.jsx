import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'
import {
    FilterList,
    BuildOutlined
} from '@mui/icons-material'
import { File, Folder, SideBar } from '../components'
import { Link } from 'react-router-dom'


export default function MaterialsPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box sx={{ overflow: 'hidden' }}>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius: '3.1vh' }} variant="middle" />
            <Box sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar buttonStyle={'Materials'} />
                )}
                <Divider sx={{}} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ width: '100%', height: '88.5vh', mr:'5vh' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '3.1vh .5vh 1.6vh 5.1vh', alignItems: 'center', }}>
                        <Typography sx={!matches ? { fontSize: '2.3vh', color: '#673AB7', fontWeight: 'bold', marginRight: '.6vh', marginTop: '.6vh', } : { fontSize: '50px', color: '#673AB7', fontWeight: 'bold', }}>Seus Materiais</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <FilterList sx={{ color: '#D1C4E9', cursor: 'pointer', fontSize: '40px' }} />
                            <BuildOutlined sx={{ color: '#D1C4E9', ml: '3.1vh', fontSize: '30px', transform: 'scaleX(-1)', cursor: 'pointer' }} />
                            <Link>
                                <Box sx={{ height: '75%', bgcolor: '#673AB7', fontSize: '15px', borderRadius: '3.1vh', color: 'white', padding: '.4vh 1.6vh', ml: '3.1vh', ':hover': { cursor: 'pointer' } }}>CRIAR PASTA</Box>                          
                            </Link>
                        </Box>
                    </Box >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '2.1vh 0 1.1vh 5.1vh', alignItems: 'center', }}>
                        <Folder FolderName={'nome_pasta'} />
                        <Folder FolderName={'nome_pasta'} />
                        <Folder FolderName={'nome_pasta'} />
                        <Folder FolderName={'nome_pasta'} />
                    </Box>
                    <Box sx={{ ml: '5.1vh', mt: '2%', maxHeight: '55%', overflow: 'scroll', '::-webkit-scrollbar': { display: 'none' } }}>
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'} />
                    </Box>

                </Box>

            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
