import { Avatar, Box, Divider, Typography, useMediaQuery, Card, Grid, Modal } from '@mui/material'
import NavBar from '../layout/NavBar'
import { Add } from '@mui/icons-material'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import { Folder } from '../components'

export default function FavoritesPage() {
    const matches = useMediaQuery('(min-width: 600px)')
    const [ folderArr, setFolderArr ] = useState([])
    const [ open, setOpen ] = useState(false)
    
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)



    // eslint-disable-next-line no-unused-vars
    function addFolder() { 
        setFolderArr([ ...folderArr, <Folder key={folderArr.length} /> ])
    }

    return (
        <>
            <Box sx={{ overflow: 'hidden' }}> 
                <Divider sx={{ bgcolor: '#673AB7', height: '.6vh', m: '.6vh 2% 0 2%', borderRadius:'3.1vh' }} variant="middle" />
                <Box sx={{ display: 'flex', height:'88vh' }}>
                    {matches && (
                        <NavBar buttonStyle={'Favorites'} />
                    )}
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
                                bgcolor: grey[200],
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
                                    <Stack spacing={2} display={'flex'} alignItems={'end'}>
                                        <Skeleton variant="rounded" width={210} height={60} />
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
                    <Box sx={{ height: 500, width: 500, bgcolor:'background.paper' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Box>
            </Modal>

        </>

    )
}