import { Avatar, Box, Divider, Typography, Card, Grid, Modal, Button, TextField, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { Add } from '@mui/icons-material'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { useEffect, useRef, useState } from 'react'
import { Folder } from '../components'
import AppLayout from '../layout/AppLayout'
import { grey } from '@mui/material/colors'
import CustomCheckBox from '../layout/CustomCheckBox'

export default function FavoritesPage() {
    const [ open, setOpen ] = useState(false)
    const ref = useRef()
    
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        document.addEventListener('keydown', e => {
            if(e.which == 27) {
                handleClose()  
            }
        })
    }, [])

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
                ref={ref}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disableAutoFocus
            >
                <Box p sx={{ height: '80vh', width: '35vw', bgcolor:'background.paper' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Nova Pasta
                        </Typography> 
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}> 
                        <TextField id="outline-basic" label="Título" fullWidth />
                        <Typography variant='subtitle2'> Colocar visibilidade para </Typography>
                        <FormGroup>
                            <CustomCheckBox caption='Isso deixará sua pasta pública' title='Público'/>
                            <CustomCheckBox caption='Isso deixará sua pasta privada' title='Privado'/>   
                        </FormGroup>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
                            <Button variant='outlined'fullWidth>
                                Cancelar
                            </Button>
                            <Button variant='outlined'fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>
                    
                </Box>
            </Modal>

        </AppLayout>

    )
}
