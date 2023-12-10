import { Avatar, Box, Typography, Card, Grid, Button, TextField, FormControl, useMediaQuery, useTheme } from '@mui/material'
import { Add } from '@mui/icons-material'
import { type ReactElement, useEffect, useState } from 'react'
import { AppLayout, CustomCheckBox, FormModal } from '$layout'
import { Folder } from '$components'
import { type folder } from '$types'
import { blue } from '@mui/material/colors'

export default function FavoritesPage(): ReactElement {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ open, setOpen ] = useState(false)

    const [ folders, setFolders ] = useState<folder[]>([])

    const [ folderAttributes, setFolderAttributes ] = useState<folder>({
        title: '',
        subtitle: '',
        visibility: 'public'
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

    const createFolder = (): void => {
        // ...

        if (folderAttributes.visibility && folderAttributes.title) {
            setFolders([
                ...folders,
                folderAttributes
            ])
            handleClose()
        }
        else alert('preencha todos os campos!')
    }

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const code: any = e.code

            if (Number(code) === 27) {
                handleClose()
            }
        })
    }, [])

    return (
        <AppLayout>
            <Box display={'flex'} width={'100%'} height={'100%'}  alignContent={'center'}>
                <Box sx={{ display: 'flex', height:'100%', width:'100%', justifyContent:'center' }}>
                    <Box p={0} height={'100%'}>
                        <Box height={'100%'}>
                            <Card sx={{
                                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
                                boxShadow: '1px 1px 3px grey',
                                minHeight:'calc(100vh - 9.5rem)',
                                width: '67rem',
                                display: 'flex',
                                p: 8,
                                justifyContent: 'start',
                                flexDirection: 'column',
                                [theme.breakpoints.down('lg')]:{ width:'50rem', pt: 4 },
                                overflow: 'scroll'
                                // '::-webkit-scrollbar': { display: 'none' }
                                
                            }}>
                                <Box display='flex' mb={2} sx={{ cursor: 'pointer', [theme.breakpoints.down('lg')]: { width:'30%' } }} width={'22%'} onClick={handleOpen}>
                                    <Avatar sx={{ padding: '10px', margin: '10px', width: 20, height: 20, bgcolor: 'primary.main' }}>
                                        <Add sx={{ fontSize: '1em' }} />
                                    </Avatar>
                                    <Typography position={'relative'} top={8} sx={{ [ theme.breakpoints.down('xl')]: { top:10 , fontSize:'1.2rem' }, 
                                        [ theme.breakpoints.down('lg')]: { top:11, fontSize:'1.1rem' } }}>Adicionar Pasta</Typography>
                                </Box>
                                <Typography variant='h4' mb={2}>Pastas</Typography>
                                <Grid container gap={3} columns={4} width={'auto'}>
                                    {folders.map(e => (
                                        <Folder title={e.title} subtitle={!e.subtitle ? e.title : e.subtitle} key={e.title} />
                                    ))}
                                </Grid>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <FormModal
                open={open}
                onClose={handleClose}
                title='Nova Pasta'
                sx={{}}
            >
                <>
                    <TextField
                        onChange={e => { setFolderAttributes({ ...folderAttributes, title: e.target.value }) }}
                        label="Título"
                        value={folderAttributes.title}
                        fullWidth
                    />
                    <TextField
                        onChange={e => { setFolderAttributes({ ...folderAttributes, subtitle: e.target.value }) }}
                        label="Tópico (opicional)"
                        value={folderAttributes.subtitle}
                        fullWidth
                    />
                    <Typography variant='subtitle2'> Colocar visibilidade para </Typography>
                    <FormControl>
                        <CustomCheckBox
                            onClick={
                                () => {
                                    setCheckedButtons(state => ({ ...state, public: !state.public }))
                                    setFolderAttributes({ ...folderAttributes, visibility: 'public' })
                                }}
                            checked={checkedButtons.public}
                            caption='Isso deixará sua pasta pública'
                            title='Público'
                        />
                        <CustomCheckBox
                            onClick={
                                () => {
                                    setCheckedButtons(state => ({ ...state, private: !state.private }))
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
                        <Button type='submit' onClick={createFolder} variant='outlined' fullWidth>
                            Criar
                        </Button>
                    </Box>
                </>
            </FormModal>

        </AppLayout>

    )
}
