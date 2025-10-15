'use client';

import { AddPhotoAlternate, Close, Search } from '@mui/icons-material'
import { CustomInput, LoadingBackdrop } from '@/layout'
import { Alert, Avatar, Box, Button, Card, FormControl, IconButton, InputLabel, ListSubheader, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { useEffect, type ReactElement, useState, type ChangeEvent } from 'react'
import { ForumIcon, ForumWrapper } from '@/components'
import { type Topic, type Forum  } from '@/types'
import { ForumIconSkeleton } from '@/layout/skeletons'
import { useCreateForumMutation, useFetchForumsMutation } from '@/features/forum'
import { useAppSelector } from '@/store'
import { MenuItem } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useUploadFileMutation } from '@/features/file'

interface ForumFormData {
    title: string
    description: string
    topic: Topic
}

export default function ForumHome(): ReactElement {
    const theme = useTheme()

    const user = useAppSelector(state => state.auth.user)

    const [ open, setOpen ] = useState<boolean>(false)
    const [ loadingOpen, setLoadingOpen ] = useState<boolean>(false)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => {
        setOpen(false)
        setFormData({ title: '', description: '', topic: 'Outro' })
        setFormErrors({ title: false, description: false, topic: false })
        setImage(undefined)
    }

    const handleLoadingClose = (): void => { setLoadingOpen(false) }

    const [ fetchForums, { isLoading, data: forums } ] = useFetchForumsMutation()
    const [ createForum ] = useCreateForumMutation()
    const [ uploadPicture ] = useUploadFileMutation()

    const [ image, setImage ] = useState<File | undefined>()
    const [ formData, setFormData ] = useState<ForumFormData>({
        title: '',
        description: '',
        topic: 'Outro'
    })
    const [ formErrors, setFormErrors ] = useState({
        title: false,
        description: false,
        topic: false
    })

    const handleInputChange = (field: keyof ForumFormData) => (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: unknown } }
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }))
        setFormErrors(prev => ({
            ...prev,
            [field]: false
        }))
    }

    const validateForm = (): boolean => {
        const errors = {
            title: !formData.title.trim(),
            description: !formData.description.trim(),
            topic: !formData.topic
        }
        setFormErrors(errors)
        return !errors.title && !errors.description && !errors.topic
    }

    const handleSubmit = async (): Promise<void> => {
        if (!validateForm()) {
            return
        }

        handleClose()
        setLoadingOpen(true)

        try {
            if (image) {
                const reader = new FileReader()
                reader.readAsDataURL(image)

                reader.addEventListener('load', async () => {
                    const { data }: any = await uploadPicture({
                        file64Based: reader.result as string,
                        userId: user?._id ?? '',
                        at: { id: 'null', type: 'forum' }
                    })

                    await createForum({
                        title: formData.title,
                        description: formData.description,
                        topic: formData.topic,
                        createdBy: user._id,
                        image: data.src
                    })

                    setLoadingOpen(false)
                })
            } else {
                await createForum({
                    title: formData.title,
                    description: formData.description,
                    topic: formData.topic,
                    createdBy: user._id
                })
                setLoadingOpen(false)
            }
        } catch (error) {
            console.error('Error creating forum:', error)
            setLoadingOpen(false)
        }
    }

    useEffect(() => {
        (async () => {
            await fetchForums(null)
        })()
    }, [ fetchForums ])

    useEffect(() => {
        (async () => {
            if (!loadingOpen) {
                await fetchForums(null)
            }
        })()
    }, [ loadingOpen ])

    return (
        <>
            <Box
                sx={{ overflowX: 'hidden' }}
                overflow='auto'
                display='flex'
                width='100%'
                flexDirection='column'
                p={{ xs: 1.5, sm: 2, md: 2.5 }}
            >
                <Box
                    mb={{ xs: 2, sm: 3 }}
                    display='flex'
                    flexDirection='column'
                    gap={{ xs: 2, sm: 3 }}
                >
                    <Box display='flex' justifyContent={'center'} px={{ xs: 2, sm: 3 }}>
                        <CustomInput
                            sx={{ boxShadow: theme.shadows[4] }}
                            fullWidth
                            placeholder='Pesquisar fóruns...'
                            color='primary.main'
                            iconColor={theme.palette.mode === 'light' ? '#dbdbdb' : undefined}
                            icon={<Search />}
                        />
                    </Box>
                    <Box ml={{ xs: '2%', sm: '4%', lg: '2%', xl: '2%' }}>
                        <Button
                            variant='contained'
                            onClick={handleOpen}
                            sx={{ fontSize: { xs: '0.875rem', sm: '1rem', lg: '1rem', xl: '1rem' }, borderRadius: '10px' }}
                        >
                            Criar Fórum
                        </Button>
                    </Box>
                </Box>
                <ForumWrapper>
                    {isLoading ? (
                        <Stack width='100rem' gap={2}>
                            {[ 0, 1, 2, 3, 4, 5, 6, 7, 8 ].map(item => (
                                <ForumIconSkeleton key={item} />
                            ))}
                        </Stack>
                    ) : Array.isArray(forums)
                        ? forums.map((forum: Forum) => (
                            <ForumIcon
                                key={forum._id}
                                id={forum._id}
                                title={forum.title}
                                topic={forum.topic}
                                usersIn={forum.usersIn}
                                userId={forum.createdBy ?? ''}
                            />
                        ))
                        : null
                    }
                </ForumWrapper>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                disableAutoFocus
                disableEnforceFocus
                disableRestoreFocus
            >
                <Card
                    sx={{
                        minHeight: { xs: 'auto', md: '45vh' },
                        width: { xs: '95vw', sm: '80vw', md: '60vw', lg: '35vw' },
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        bgcolor: 'background.paper',
                        p: { xs: 0.5, sm: 1 },
                        borderRadius: 2,
                        boxShadow: theme.shadows[10]
                    }}
                >
                    <Box p={0}>
                        <Typography variant="h6" component="h2" m={'1rem'} sx={{ fontSize: {lg: '1.5rem', xl: '1.5rem'} }}>
                            Criar Fórum
                        </Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' p={2} gap={2}>
                        <TextField
                            label='Título'
                            name='title'
                            type='text'
                            fullWidth
                            required
                            value={formData.title}
                            onChange={handleInputChange('title')}
                            inputProps={{ maxLength: 50 }}
                            helperText={`${formData.title.length}/50`}
                            error={formErrors.title}
                        />

                        <FormControl error={formErrors.topic}>
                            <InputLabel htmlFor='topic'>Tópico *</InputLabel>
                            <Select
                                type='text'
                                id='topic'
                                required
                                name='topic'
                                fullWidth
                                value={formData.topic}
                                onChange={handleInputChange('topic')}
                                label='Tópico *'
                            >
                                <ListSubheader>Escola</ListSubheader>
                                <MenuItem value='Escola'>Escola</MenuItem>
                                <MenuItem value='Trabalho/Atividade'>Trabalho/Atividade</MenuItem>
                                <MenuItem value='Tutoria'>Tutoria</MenuItem>
                                <MenuItem value='Professores'>Professores</MenuItem>
                                <MenuItem value='Funcionários'>Funcionários</MenuItem>
                                <MenuItem value='Eventos'>Eventos</MenuItem>
                                <MenuItem value='TCC'>TCC</MenuItem>
                                <ListSubheader>Cursos</ListSubheader>
                                <MenuItem value='Desenvolvimento de Sistemas'>Desenvolvimento de Sistemas</MenuItem>
                                <MenuItem value='Administração'>Administração</MenuItem>
                                <MenuItem value='Nutrição'>Nutrição</MenuItem>
                                <MenuItem value='Enfermagem'>Enfermagem</MenuItem>
                                <ListSubheader>Vida</ListSubheader>
                                <MenuItem value='Vida Pessoal'>Vida Pessoal</MenuItem>
                                <MenuItem value='Carreira'>Carreira</MenuItem>
                                <ListSubheader>Outro</ListSubheader>
                                <MenuItem value='Outro'>Outro</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label='Descrição'
                            name='description'
                            type='text'
                            fullWidth
                            required
                            value={formData.description}
                            onChange={handleInputChange('description')}
                            error={formErrors.description}
                            multiline
                            rows={3}
                            sx={{ mt: 1 }}
                        />

                        <input
                            style={{ display: 'none' }}
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setImage(e.target.files?.[0]) }}
                        />

                        {(formErrors.title || formErrors.description || formErrors.topic) && (
                            <Alert severity='error'>Preencha todos os campos obrigatórios!</Alert>
                        )}

                        <Box
                            display='flex'
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            gap={{ xs: 2, sm: 1 }}
                            justifyContent='space-between'
                            alignItems={{ xs: 'stretch', sm: 'center' }}
                        >
                            <Box display='flex' gap={1} alignItems='center' flex={1}>
                                <IconButton component='label' htmlFor='image'>
                                    <Avatar
                                        sx={{ cursor: 'pointer', bgcolor: image ? 'primary.main' : grey[400] }}
                                    >
                                        <AddPhotoAlternate />
                                    </Avatar>
                                </IconButton>
                                <Typography noWrap flex={1}>{image?.name}</Typography>
                                { image && (
                                    <Close sx={{ cursor: 'pointer' }} onClick={() => { setImage(undefined) }} />
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
                                <Button
                                    onClick={handleSubmit}
                                    variant='contained'
                                    fullWidth
                                    sx={{ minWidth: { sm: 'auto' } }}
                                >
                                    Confirmar
                                </Button>
                                <Button
                                    onClick={handleClose}
                                    variant='outlined'
                                    fullWidth
                                    sx={{ minWidth: { sm: 'auto' } }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Modal>

            <LoadingBackdrop
                open={loadingOpen}
                handleClose={handleLoadingClose}
            />
        </>
    )
}
