import { Avatar, Box, Divider, Typography, Card, Grid, Modal, Button, TextField, FormControl, useMediaQuery, useTheme } from '@mui/material'
import { Add } from '@mui/icons-material'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { Folder } from '../components'
import AppLayout from '../layout/AppLayout'
import CustomCheckBox from '../layout/CustomCheckBox'

export default function FavoritesPage() {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ open, setOpen ] = useState(false)
    
    const [ folderAttributes, setFolderAttributes ] = useState({
        title: '',
        visibility: ''
    })

    const [ checkedButtons, setCheckedButtons ] = useState({
        public: true,
        private: false
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const createFolder = () => {
        // ...

        console.log(folderAttributes)

        if (folderAttributes.visibility && folderAttributes.title)
            handleClose()
    }

    useEffect(() => {
        document.addEventListener('keydown', e => {
            if(e.code == 27) {
                handleClose()  
            }
        })
    }, [])

    return (
        <AppLayout withSidebars>
            <Box> 
                <Box sx={{ display: 'flex', height:'88vh' }}>
                    <Box p={1}>
                        <Box>
                            <Card sx={{
                                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
                                boxShadow: '1px 1px 3px grey',
                                height: '70rem',
                                width: '65rem',
                                display: 'flex',
                                p: 8,
                                justifyContent: 'start',
                                flexDirection: 'column'
                            }}>
                                <Box display='flex' mb={2} sx={{ cursor: 'pointer' }} onClick={handleOpen}>
                                    <Avatar sx={{ padding: '10px', margin: '10px', width: 20, height: 20, bgcolor: 'primary.main' }}>
                                        <Add sx={{ fontSize: '1em' }}/> 
                                    </Avatar>
                                    <Typography position={'relative'} top={8}>Adicionar Pasta</Typography>
                                </Box> 
                                <Typography variant='h4' mb={2}>Pastas</Typography>
                                <Grid container gap={3} columns={4} width={'auto'}>
                                    <Folder title={'pintamanhangaba'} subtitle={'memes'}/>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
                                    <Folder></Folder>
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
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disableAutoFocus
            >
                <Box p sx={{ height: matches ? '45  vh' : '40vh', width: '35vw', bgcolor:'background.paper' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Nova Pasta
                        </Typography> 
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}> 
                        <TextField 
                            onChange={e => setFolderAttributes({ ...folderAttributes, title: e.target.value })} 
                            id="outline-basic" 
                            label="Título"
                            value={folderAttributes.title}
                            fullWidth
                         />
                        <Typography variant='subtitle2'> Colocar visibilidade para </Typography>
                        <FormControl>
                            <CustomCheckBox 
                                onClick={
                                    () => {
                                        setCheckedButtons({ public: !checkedButtons.public })
                                        setFolderAttributes({ ...folderAttributes, visibility: 'public' })
                                    }} 
                                checked={checkedButtons.public} 
                                caption='Isso deixará sua pasta pública' 
                                title='Público'
                            />
                            <CustomCheckBox 
                                onClick={
                                    () => {
                                        setCheckedButtons({ private: !checkedButtons.private })
                                        setFolderAttributes({ ...folderAttributes, visibility: 'private' })
                                    }}
                                checked={checkedButtons.private}
                                caption='Isso deixará sua pasta privada' 
                                title='Privado'
                            />   
                        </FormControl>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} >
                            <Button onClick={handleClose} variant='outlined'fullWidth>
                                Cancelar
                            </Button>
                            <Button onClick={createFolder} variant='outlined'fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>
                    
                </Box>
            </Modal>

        </AppLayout>

    )
}
