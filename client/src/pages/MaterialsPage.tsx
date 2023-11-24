import { Box, Button, Container, FormControl, IconButton, MenuItem, Modal, Stack, TextField, Typography, useMediaQuery } from '@mui/material'

import { File, FilterAndConfig, FolderMaterials } from '$components'
import { type ReactElement, useEffect, useState } from 'react'
import { AppLayout, CustomCheckBox, CustomMenu } from '$layout'
import { type material } from 'types/dataTypes'
import { useTheme } from '@mui/material'
import { FilterList } from '@mui/icons-material'

export default function MaterialsPage(): ReactElement {
    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ open, setOpen ] = useState(false)

    const [ materials, setMaterials ] = useState<material[]>([
        {
            title: 'Bernardo',
            visibility: 'Bernardo',
            code: 'Bernardo',
            setPassword: 'Bernardo',
            getPassword: 'Bernardo'
        },

        {
            title: 'Alberto',
            visibility: 'Alberto',
            code: 'Alberto',
            setPassword: 'Alberto',
            getPassword: 'Alberto'
        },
        
        {
            title: 'Papá',
            visibility: 'Papá',
            code: 'Papá',
            setPassword: 'Papá',
            getPassword: 'Papá'
        }
    ]) 
    const filteredMaterials = ():void => {
        setMaterials(
            materials.sort((a, b) => {
                if (a.title < b.title) return -1
                if (a.title > b.title) return 1
                return 0
            })
        )
    }

    const [ materialsAttributes, setMaterialsAttributes ] = useState<material>({
        title: '',
        visibility: 'public',
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

        if (materialsAttributes.visibility && materialsAttributes.title) {
            setMaterials([
                ...materials,
                materialsAttributes
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

    const onClickEvents = {
        item1: () => {
            filteredMaterials()
            handleClose()
        },

        item2: () => {
            console.log('tcchau')
            handleClose()
        }
    }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<ReactElement[]>([])

    const openOptions = Boolean(anchorEl)

    const handleClick = (e: any, elements: string[], onClickEventListeners = elements.map(() => handleClose), icons: ReactElement[] = []): void => {
        const mapedElements = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons?.[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    return (
        <AppLayout>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', justifyItems:'center' }}>
                    <Typography sx={{ fontSize: '2rem', color: '#673AB7', fontWeight: 'bold' }}>Seus Materiais</Typography>
                    <FilterAndConfig text='CRIAR PASTA' handleOpen={handleOpen}/>
                </Container>
                
                <Box display={'flex'} justifyContent={'start'} flexDirection={'column'}>
                    <Box flexDirection='column' m={5} sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', justifyItems: 'center', rowGap: '4rem' }} >
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        <FolderMaterials folderName={'teste'} />
                        {materials.map((e) => (
                            <FolderMaterials folderName={e.title} key={e.title} />
                        ))}
                    </Box>
                    <Box display={ 'grid' } gridTemplateColumns={ 'auto auto' } gridTemplateRows={ 'auto' } flexDirection={ 'column' } m={5} justifyItems={'center'} >
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
                <Box p={1} sx={{ height: matches ? '45  vh' : '40vh', width: '35vw', bgcolor: 'background.paper' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Nova Pasta
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                        <TextField
                            onChange={e => { setMaterialsAttributes({ ...materialsAttributes, title: e.target.value }) }}
                            id="outline-basic"
                            label="Título"
                            value={materialsAttributes.title}
                            fullWidth
                        />
                        <Typography variant='subtitle2'> Colocar visibilidade para </Typography>
                        <FormControl>
                            <CustomCheckBox
                                onClick={
                                    () => {
                                        setCheckedButtons(state => ({ ...state, public: !state.public }))
                                        setMaterialsAttributes({ ...materialsAttributes, visibility: 'public' })
                                    }}
                                checked={checkedButtons.public}
                                caption='Isso deixará sua pasta pública'
                                title='Público'
                            />
                            <CustomCheckBox
                                onClick={
                                    () => {
                                        setCheckedButtons(state => ({ ...state, private: !state.private }))
                                        setMaterialsAttributes({ ...materialsAttributes, visibility: 'private' })
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
