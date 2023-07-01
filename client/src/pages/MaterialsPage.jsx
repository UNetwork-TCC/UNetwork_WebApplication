import { Box, Button, Divider, Typography, useMediaQuery } from '@mui/material'
import Header2 from '../layout/Header2'
import NavBar from '../layout/NavBar'
import { MobileHeader2, MobileNavBar } from '../layout'
import {
    FilterList,
    BuildOutlined
} from '@mui/icons-material'
import { File, Folder } from '../components'


export default function MaterialsPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Box>
            {matches ? <Header2 /> : <MobileHeader2 />}
            <Divider sx={{ bgcolor: '#673AB7', height: '10px', mt: '5px' }} variant="middle" />
            <Box sx={{ display: 'flex' }}>
                {matches && (
                    <NavBar buttonStyle={'Materials'} />
                )}
                <Divider sx={{ width: '2px'}} variant="middle" orientation='vertical' flexItem />
                <Box sx={{ width: '75vw', }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '20px 0 10px 25px', alignItems: 'center', }}>
                        <Typography sx={!matches ? { fontSize: '15px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px', marginTop: '5px', } : { fontSize: '30px', color: '#673AB7', fontWeight: 'bold', marginRight: '5px' }}>Seus Materiais</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <FilterList sx={{ color: '#D1C4E9', cursor:'pointer' }} />
                            <BuildOutlined sx={{ color: '#D1C4E9', ml: '10px', transform: 'scaleX(-1)', cursor:'pointer'}} />
                            <Box sx={{ height: '50%', bgcolor: '#673AB7', fontSize: '10px', borderRadius: '30px', color: 'white', padding: '3px 15px', ml: '10px', ':hover': { cursor: 'pointer' } }}>CRIAR PASTA</Box>
                        </Box>
                    </Box >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '20px 0 10px 50px', alignItems: 'center', }}>
                        <Folder FolderName={'nome_pasta'}/>
                        <Folder FolderName={'nome_pasta'}/>
                        <Folder FolderName={'nome_pasta'}/>
                        <Folder FolderName={'nome_pasta'}/>
                    </Box>
                    <Box sx={{ml:'50px', mt:'4%'}}>
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'}/>
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'}/>
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'}/>
                        <File description={'Descrição do arquivos(opcional)'} fileName={'arquivo_nome'}/>
                    </Box>

                </Box>

            </Box>
            {!matches && (
                <MobileNavBar />
            )}

        </Box>

    )
}
