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

    const [ Materials, setMaterials ] = useState([])

    const [ MaterialsAttributes, setMaterialsAttributes ] = useState({
        title: '',
        visibility: 'public',
        code: '',
        setPassword: '',
        getPassword: ''
    })

    const [ checkedButtons, setCheckedButtons ] = useState({
        public: true,
        private: false
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const createMaterials = () => {
        // ...

        if (MaterialsAttributes.visibility && MaterialsAttributes.title) {
            setMaterials([
                ...Materials,
                MaterialsAttributes
            ])
            handleClose()
        }
        else alert('preencha todos os campos!')
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
            <Box display='flex' justifyContent='start' flexDirection='column' width='100%' height='100%' p={3} mt={5} fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography sx={{ fontSize: '2rem', color: '#673AB7', fontWeight: 'bold' }}>Seus Materiais</Typography>
                    <FilterAndConfig text={'CRIAR PASTA'} handleOpen={handleOpen}/>
                </Container>
                
                <Box display={'flex'} justifyContent={'start'} flexDirection={'column'}>
                    <Box flexDirection='column' m={5} sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', justifyItems: 'center', rowGap: '4rem', columnGap: '2rem' }} >
                        <FolderMaterials FolderName={'teste'} />
                        <FolderMaterials FolderName={'teste'} />
                        <FolderMaterials FolderName={'teste'} />
                        <FolderMaterials FolderName={'teste'} />
                        <FolderMaterials FolderName={'teste'} />
                        <FolderMaterials FolderName={'teste'} />
                        {Materials.map(e => (
                            <FolderMaterials FolderName={e.title} key={e.title} />
                        ))}
                    </Box>
                    <Box display={ 'grid' } gridTemplateColumns={ 'auto auto' } gridTemplateRows={ 'auto' } flexDirection={ 'column' } m={5} >
                        <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                        <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                        <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                        <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                        <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />
                        <File fileName={'teste'} description={'segundo adm rouba em olimpiadas'} />

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
                <Box p sx={{ height: matches ? '45  vh' : '40vh', width: '35vw', bgcolor: 'background.paper' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Nova Pasta
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                        <TextField
                            onChange={e => setMaterialsAttributes({ ...MaterialsAttributes, title: e.target.value })}
                            id="outline-basic"
                            label="Título"
                            value={MaterialsAttributes.title}
                            fullWidth
                        />
                        <Typography variant='subtitle2'> Colocar visibilidade para </Typography>
                        <FormControl>
                            <CustomCheckBox
                                onClick={
                                    () => {
                                        setCheckedButtons({ public: !checkedButtons.public })
                                        setMaterialsAttributes({ ...MaterialsAttributes, visibility: 'public' })
                                    }}
                                checked={checkedButtons.public}
                                caption='Isso deixará sua pasta pública'
                                title='Público'
                            />
                            <CustomCheckBox
                                onClick={
                                    () => {
                                        setCheckedButtons({ private: !checkedButtons.private })
                                        setMaterialsAttributes({ ...MaterialsAttributes, visibility: 'private' })
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
                            <Button onClick={createMaterials} variant='outlined' fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </AppLayout>
    )
}
