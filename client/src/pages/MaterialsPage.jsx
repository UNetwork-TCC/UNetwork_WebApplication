import { Box, Container, Link, Typography } from '@mui/material'

import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'
import { BuildOutlined, FilterList } from '@mui/icons-material'
import { File, FolderMaterials } from '../components'

export default function MaterialsPage() {
    const theme = useTheme()

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <Typography sx={{ fontSize: '2.5em', color: '#673AB7', fontWeight: 'bold' }}>Seus Materiais</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <FilterList sx={{ cursor: 'pointer', fontSize: '2em', ':hover': { color: 'text.secondary' } }} />
                        <BuildOutlined sx={{ ml: '1.5em', fontSize: '2em', transform: 'scaleX(-1)', ':hover': { color: 'text.secondary', cursor: 'pointer' } }} />
                        <Box sx={{ height: '75%', bgcolor: '#673AB7', fontSize: '1rem', borderRadius: '3.1vh', color: 'white', padding: '0.3em 1em', ml: '2em', ':hover': { cursor: 'pointer', bgcolor: '#673AB7', opacity: '0.85' } }}>CRIAR PASTA</Box>
                    </Box>
                </Container>
                <Box flexDirection='column' m={5} sx={{ display:'grid', gridTemplateColumns: 'auto auto auto', justifyItems:'center', rowGap:'2rem' }} >
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                </Box>

                <Box flexDirection='column' m={5} sx={{ml:'7.5%'}}>
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />

                </Box>
            </Box>
        </AppLayout>
    )
}
