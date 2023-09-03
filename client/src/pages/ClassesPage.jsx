import { Box, Container, Link, Typography } from '@mui/material'

import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'
import { BuildOutlined, FilterList } from '@mui/icons-material'
import { Classes } from '../components'

export default function ClassesPage() {
    const theme = useTheme()

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <Typography sx={{ fontSize: '2.5em', color: '#673AB7', fontWeight: 'bold' }}>Seus Classes</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <FilterList sx={{ cursor: 'pointer', fontSize: '2em', ':hover': { color: 'text.secondary' } }} />
                        <BuildOutlined sx={{ ml: '1.5em', fontSize: '2em', transform: 'scaleX(-1)', ':hover': { color: 'text.secondary', cursor: 'pointer' } }} />
                        <Box sx={{ height: '75%', bgcolor: '#673AB7', fontSize: '0.9rem', borderRadius: '3.1vh', color: 'white', padding: '0.3em 1em', ml: '2em', textTransform:'uppercase',':hover': { cursor: 'pointer', bgcolor: '#673AB7', opacity: '0.85' } }}>Criar uma equipe ou ingressar nela</Box>
                    </Box>
                </Container>
                <Box flexDirection='column' m={5} sx={{ display:'grid', gridTemplateColumns: 'auto auto auto', justifyItems:'center', rowGap:'2rem' }} >
                    <Classes Class={{name:'Os lambisgoia'}} />
                    <Classes Class={{name:'Lar Ternura'}} />
                    <Classes Class={{name:'Fofoqueiros'}} />
                    <Classes Class={{name:'Maconheiros da paz e da guerra'}} />
                    <Classes Class={{name:'Os programadores'}} />
                    <Classes Class={{name:'Os revoltados'}} />
                    
                </Box>
                
            </Box>
        </AppLayout>
    )
}
