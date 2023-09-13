import { Box, Button, Container, FormControl, Modal, TextField, Typography, useMediaQuery } from '@mui/material'

import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'
import { File, FilterAndConfig, FolderMaterials } from '../components'
import { useEffect, useState } from 'react'
import CustomCheckBox from '../layout/CustomCheckBox'

export default function MaterialsPage() {
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
            if (e.code == 27) {
                handleClose()
            }
        })
    }, [])


    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <Typography sx={{ fontSize: '2.5em', color: '#673AB7', fontWeight: 'bold' }}>Seus Materiais</Typography>
                    <FilterAndConfig text={'CRIAR PASTA'} handleOpen={handleOpen}/>
                </Container>
                <Box flexDirection='column' m={5} sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', justifyItems: 'center', rowGap: '2rem' }} >
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                    <FolderMaterials FolderName={'teste'} />
                </Box>

                <Box flexDirection='column' m={5} sx={{ ml: '7.5%' }}>
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                    <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />

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
                <Box p sx={{ height: matches ? '45  vh' : '40vh', width: '35vw', bgcolor: 'background.paper' }} borderRadius={2} >
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
                            <Button onClick={handleClose} variant='outlined' fullWidth>
                                Cancelar
                            </Button>
                            <Button onClick={createFolder} variant='outlined' fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </AppLayout>
    )
}
