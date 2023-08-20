import { Avatar, Box, Divider, Typography, Card, Grid, Modal, Button } from '@mui/material'
import { Add, DisabledByDefault, Send } from '@mui/icons-material'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { Folder } from '../components'
import AppLayout from '../layout/AppLayout'
import { grey } from '@mui/material/colors'

export default function FavoritesPage() {
    const [ folderArr, setFolderArr ] = useState([])
    const [ open, setOpen ] = useState(false)
    
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    function addFolder() { 
        setFolderArr([ ...folderArr, <Folder key={folderArr.length} /> ])
    }

    return (
        <AppLayout withSidebars>
            <Box sx={{ overflow: 'hidden' }}> 
                <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius:'3.1vh' }} variant="middle" />
                <Box sx={{ display: 'flex', height:'88vh' }}>
                    <Divider sx={{ m: '10px 5px 10px 0', }} variant="middle" orientation='vertical' flexItem />
                    <Box display={'flex'} flexDirection={'column'}></Box>
                    <Box p={1} sx={{ mr: '5px' }}>
                        <Box display={'flex'} sx={{ mr: '5px', cursor: 'pointer' }} onClick={handleOpen}>
                            <Avatar sx={{ padding: '10px', margin: '10px', width: 20, height: 20, bgcolor: 'primary.main' }}>
                                <Add sx={{ fontSize: '1em' }}/> 
                            </Avatar>
                            <Typography position={'relative'} top={8}>Adicionar Pasta</Typography>
                        </Box> 
                        <Box>
                            <Card sx={{
                                bgcolor: 'gless',
                                height: '70rem',
                                width: '65rem',
                                display: 'flex',
                                p: 8,
                                justifyContent: 'start',
                                flexDirection: 'column'
                            }}>
                                <Typography variant='h4' mb={2}>Pastas</Typography>
                                <Grid container rowSpacing={1} columnSpacing={3} gap={3} columns={4} width={'auto'}>
                                    <Stack spacing={2} display={'flex'} alignItems={'start'}>
                                        <Folder/>
                                        <Skeleton variant="rounded" width={210} height={60} />
                                        <Skeleton variant="rounded" width={210} height={60} />
                                    </Stack> 
                                    <Stack spacing={2} display={'flex'} alignItems={'end'}>
                                        <Skeleton variant="rounded" width={210} height={60} />
                                        <Skeleton variant="rounded" width={210} height={60} />
                                        <Skeleton variant="rounded" width={210} height={60} />
                                    </Stack>
                                </Grid>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box display='flex' justifyContent='center' alignItems='center' height={'100vh'}>
                    <Box p sx={{ height: 300, width: 400, bgcolor:'background.paper' }} >
                        <Box sx={{ cursor:'pointer' }}  display='flex' justifyContent='end'>
                            <DisabledByDefault onClick={handleClose} sx={{ width: '2rem', height: '1.5rem' }} />
                        </Box>
                       
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Title
                        </Typography>
                        <Box display={'flex'}>
                            <Button variant="outlined" sx={{ bgcolor: grey[200], width: '6rem', height: '1.5rem' }}>
                                Salvar
                                
                            </Button>
                            <Send sx={{ width: '1rem', height: '1rem' }}/>
                        </Box>
                    </Box>
                </Box>
            </Modal>

        </AppLayout>

    )
}