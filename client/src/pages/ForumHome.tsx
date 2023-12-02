/* eslint-disable react-hooks/exhaustive-deps */
import { AddPhotoAlternate, Close, Search } from '@mui/icons-material'
import { AppLayout, CustomInput, FormModal, LoadingBackdrop } from '$layout'
import { Alert, Avatar, Box, Button, FormControl, IconButton, InputLabel, ListSubheader, Select, Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { useEffect, type ReactElement, useState, type ChangeEvent } from 'react'
import { ForumIcon, ForumWrapper } from '$components'
import { type Topic, type Forum  } from '$types'
import { ForumIconSkeleton } from '$skeletons'
import { useCreateForumMutation, useFetchForumsMutation } from '$features/forum'
import { useAppSelector } from '$store'
import { Formik, Form, Field } from 'formik'
import { MenuItem } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useUploadFileMutation } from '$features/file'
import * as Yup from 'yup'

export default function ForumHome(): ReactElement {
    const theme = useTheme()

    const user = useAppSelector(state => state.auth.user)

    const [ open, setOpen ] = useState<boolean>(false)
    const [ loadingOpen, setLoadingOpen ] = useState<boolean>(false)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    // const handleLoadingOpen = (): void => { setLoadingOpen(true) }
    const handleLoadingClose = (): void => { setLoadingOpen(false) }

    const [ fetchForums, { isLoading, data: forums } ] = useFetchForumsMutation()
    const [ createForum ] = useCreateForumMutation()
    const [ uploadPicture ] = useUploadFileMutation()

    const [ image, setImage ] = useState<File | undefined>()
    
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        topic: Yup.string().required()
    })

    const formInitialValues: {
        title: string
        description: string
        topic: Topic
    } = {
        title: '',
        description: '',
        topic: 'Outro'
    }

    const handleSubmit = (forum: typeof formInitialValues): void => {
        if (forum.title && forum.description && forum.topic) {
            (async () => {
                handleClose()
                setLoadingOpen(true)
                
                if (image) {
                    const reader = new FileReader()
                    reader.readAsDataURL(image )
        
                    reader.addEventListener('load', async () => {
                        const { data }: any = await uploadPicture({
                            file64Based: reader.result as string,
                            userId: user?._id ?? '',
                            at: { id: 'null', type: 'forum' }

                        })

                        await createForum({
                            title: forum.title,
                            description: forum.description,
                            topic: forum.topic,
                            createdBy: user._id,
                            image: data.src
                        })

                    })
                } else await createForum({
                    title: forum.title,
                    description: forum.description,
                    topic: forum.topic,
                    createdBy: user._id
                })
                
                handleLoadingClose()
            })()
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
        <AppLayout>
            <Box sx={{ overflowX: 'hidden' }} overflow='auto' display='flex' width='100%' flexDirection='column' p={2.5}>
                <Box mb={3} display='flex' flexDirection='column' gap={3}>
                    <Box display='flex' justifyContent={'center'}>
                        <CustomInput
                            sx={{ boxShadow: theme.shadows[4] }}
                            fullWidth
                            width='90%'
                            placeholder='Pesquisar fóruns...'
                            color='primary.main'
                            iconColor={theme.palette.mode === 'light' ? '#dbdbdb' : undefined}
                            icon={<Search />}
                        />
                    </Box>
                    <Box ml={'4%'}>
                        <Button variant='contained' onClick={handleOpen}>Criar Fórum</Button>
                    </Box>
                </Box>
                <ForumWrapper>
                    {isLoading ? (
                        <Stack width='100rem' gap={2}>
                            {[ 0, 1, 2, 3, 4, 5, 6, 7, 8 ].map(item => (
                                <ForumIconSkeleton key={item} />
                            ))}
                        </Stack>
                    ) :
                        forums?.map((forum: Forum) => (
                            <ForumIcon
                                key={forum._id}
                                id={forum._id}
                                title={forum.title}
                                topic={forum.topic}
                                usersIn={forum.usersIn}
                                userId={forum.createdBy ?? ''}
                            />
                        ))
                    }
                </ForumWrapper>
            </Box>
            <FormModal
                title='Criar Fórum'
                open={open}
                onClose={handleClose}
                sx={{ minHeight: 0 }}
            >
                <Box >
                    <Formik
                        initialValues={formInitialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {({ values, errors, touched }) => (
                            <Form
                                onSubmit={e => { e.preventDefault() }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    height: '100%'
                                }}
                            >
                                <Field 
                                    as={TextField}
                                    label='Título'
                                    name='title'
                                    type='text'
                                    fullWidth
                                    required
                                    inputProps={{ maxLength: 50 }}
                                    helperText={`${values.title.length}/50`}
                                    error={errors.title && touched.title}
                                />
                                <FormControl>
                                    <InputLabel htmlFor='topic'>Tópico *</InputLabel>
                                    <Field 
                                        as={Select}
                                        type='text'
                                        id='topic'
                                        required
                                        name='topic'
                                        fullWidth
                                        error={errors.topic && touched.topic}
                                    >
                                        <ListSubheader>Escola</ListSubheader>
                                        <MenuItem value='Escola' >Escola</MenuItem>
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
                                    </Field>
                                </FormControl>
                                <Field 
                                    as={TextField}
                                    label='Descrição'
                                    name='description'
                                    type='text'
                                    fullWidth
                                    required
                                    error={errors.description && touched.description}
                                    multiline
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
                                {(
                                    (!values.title && touched.title) ||
                                    (!values.description && touched.description) ||
                                    (!values.topic && touched.topic)
                                ) && (
                                    <Alert severity='error'>Preencha todos os campos!</Alert>
                                )}
                                <Box display='flex' gap={1} justifyContent='space-between' alignItems='center'>
                                    <IconButton component='label' htmlFor='image'>
                                        <Avatar 
                                            sx={{ cursor: 'pointer', bgcolor: image ? 'primary.main' : grey[400] }}
                                        >
                                            <AddPhotoAlternate />
                                        </Avatar>
                                    </IconButton>
                                    <Typography noWrap>{image?.name}</Typography>
                                    { image && (
                                        <Close sx={{ cursor: 'pointer' }} onClick={() => { setImage(undefined) }} />
                                    )}
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button onClick={() => { handleSubmit(values) }} type='submit' variant='contained'>Confirmar</Button>
                                        <Button onClick={handleClose} variant='outlined'>Cancelar</Button>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </FormModal>
            <LoadingBackdrop
                open={loadingOpen}
                handleClose={handleLoadingClose}
            />
        </AppLayout>
    )
}