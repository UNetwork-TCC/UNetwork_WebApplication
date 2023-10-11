import { Box, Button, Container, FormControl, Modal, TextField, Typography, useMediaQuery } from '@mui/material'

import { File, FilterAndConfig, FolderMaterials } from '$components'
import { type ReactElement, useEffect, useState } from 'react'
import { AppLayout, CustomCheckBox } from '$layout'
import { type material } from 'types/dataTypes'
import { useTheme } from '@mui/material'

export default function MaterialsPage(): ReactElement {
    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ open, setOpen ] = useState(false)

    const [ Materials, setMaterials ] = useState<material[]>([])

    const [ MaterialsAttributes, setMaterialsAttributes ] = useState<material>({
        title: '',
        visibility: '',
        code: '',
        setPassword: '',
        getPassword: ''
    })

    const [ checkedButtons, setCheckedButtons ] = useState<{
        public: boolean,
        private: boolean
    }>({
        public: true,
        private: false
    })

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const createMaterials = (): void => {
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
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const code: string = e.code

            if (Number(code) === 27) {
                handleClose()
            }
        })
    }, [])

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography sx={{ fontSize: '2rem', color: '#673AB7', fontWeight: 'bold' }}>Seus Materiais</Typography>
                    <FilterAndConfig text={'CRIAR PASTA'} handleOpen={handleOpen}/>
                </Container>
                
                <Box display={'flex'} justifyContent={'start'} flexDirection={'column'}>
                    <Box flexDirection='column' m={5} sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', justifyItems: 'center', rowGap: '4rem', columnGap: '11rem' }} >
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        {Materials.map((e) => (
                            <FolderMaterials folderName={e.title} key={e.title} />
                        ))}
                    </Box>
                    <Box display={ 'grid' } gridTemplateColumns={ 'auto auto' } gridTemplateRows={ 'auto' } flexDirection={ 'column' } m={5} >
                        <File fileName={'teste'} description={'teste'} />
                        <File fileName={'teste'} description={'teste'} />
                        <File fileName={'teste'} description={'teste'} />
                        <File fileName={'teste'} description={'teste'} />
                        <File fileName={'teste'} description={'teste'} />
                        <File fileName={'teste'} description={'teste'} />

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
                <Box p={1} sx={{ height: matches ? '45  vh' : '40vh', width: '35vw', bgcolor: 'background.paper' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Nova Pasta
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                        <TextField
                            onChange={e => { setMaterialsAttributes({ ...MaterialsAttributes, title: e.target.value }) }}
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
                                        setCheckedButtons(state => ({ ...state, public: !state.public }))
                                        setMaterialsAttributes({ ...MaterialsAttributes, visibility: 'public' })
                                    }}
                                checked={checkedButtons.public}
                                caption='Isso deixará sua pasta pública'
                                title='Público'
                            />
                            <CustomCheckBox
                                onClick={
                                    () => {
                                        setCheckedButtons(state => ({ ...state, private: !state.private }))
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
