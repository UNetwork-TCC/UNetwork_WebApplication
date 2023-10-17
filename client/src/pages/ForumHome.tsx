import { Search } from '@mui/icons-material'
import { AppLayout, CustomInput, FormModal, LoadingBackdrop } from '$layout'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useTheme } from '@mui/material'
import { useEffect, type ReactElement, useState } from 'react'
import { ForumIcon, ForumWrapper } from '$components'
import { useAppDispatch, useAppSelector } from '$store'
import { createForum, fetchForum } from '$features/forum'
import { type User, type Forum } from '$types'
import { useFetchDispatch } from '$hooks'
import { HTTP_STATUS } from '$constants'
import { ForumIconSkeleton } from '$skeletons'

export default function ForumHome(): ReactElement {
    const theme = useTheme()

    const [open, setOpen] = useState<boolean>(false)
    const [loadingOpen, setLoadingOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    // const handleLoadingOpen = (): void => { setLoadingOpen(true) }
    const handleLoadingClose = (): void => { setLoadingOpen(false) }

    const status = useFetchDispatch(fetchForum())

    const dispatch = useAppDispatch()
    const forumState = useAppSelector(state => state.forum)
    const forumsArr: Forum[] = forumState.forums

    const [forumForm, setForumForm] = useState<{ title: string, description: string, topic: string, createdBy: User | string }>({
        title: '',
        description: '',
        topic: '',
        createdBy: 'Vitronks'
    })

    const handleSubmit = (e: Event): void => {
        e.preventDefault()

        dispatch(createForum(forumForm))

        location.reload()
    }

    useEffect(() => {
        (async () => {
            if (await status === HTTP_STATUS.FULFILLED) {
                handleLoadingClose()
                setIsLoading(false)
            }

            if (await status === HTTP_STATUS.REJECTED)
                alert('Ops! Algo deu errado!')
        })()
    }, [status])

    console.log(forumsArr)

    return (
        <AppLayout withSidebars>
            <Box sx={{ overflowX: 'hidden' }} overflow='auto' display='flex' width='100%' flexDirection='column' p={2.5}>
                <Box mb={3} display='flex' flexDirection='column' gap={3}>
                    <Box>
                        <CustomInput
                            sx={{ boxShadow: theme.shadows[4] }}
                            fullWidth
                            width='100%'
                            placeholder='Pesquisar fóruns...'
                            color='primary.main'
                            iconColor={theme.palette.mode === 'light' ? '#dbdbdb' : undefined}
                            icon={<Search />}
                        />
                    </Box>
                    <Box>
                        <Button variant='contained' onClick={handleOpen}>Criar Fórum</Button>
                    </Box>
                </Box>
                <ForumWrapper>
                    {isLoading ? (
                        <Stack width='100rem' gap={2}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                                <ForumIconSkeleton key={item} />
                            ))}
                        </Stack>
                    ) :
                        forumsArr.map((forum: Forum) => (
                            <ForumIcon
                                key={forum._id}
                                id={forum._id}
                                title={forum.title}
                                topic={forum.topic}
                                usersIn={forum.usersIn}
                            />
                        ))
                    }
                </ForumWrapper>
            </Box>
            <FormModal
                open={open}
                onClose={handleClose}
                title='Criar Fórum'
                onSubmit={handleSubmit}
            >
                <>
                    <TextField
                        value={forumForm.title}
                        onChange={(e): void => { setForumForm(state => ({ ...state, title: e.currentTarget.value })) }}
                        label='Título'
                        fullWidth
                    />
                    <TextField
                        value={forumForm.description}
                        onChange={(e): void => { setForumForm(state => ({ ...state, description: e.currentTarget.value })) }}
                        label='Descrição'
                        fullWidth
                    />
                    <TextField
                        value={forumForm.topic}
                        onChange={(e): void => { setForumForm(state => ({ ...state, topic: e.currentTarget.value })) }}
                        label='Tópico (opcional)'
                        fullWidth
                    />
                    <Box>
                        <Button type='submit' variant='contained'>
                            Confirmar
                        </Button>
                    </Box>
                </>
            </FormModal>
            <LoadingBackdrop
                open={loadingOpen}
                handleClose={handleLoadingClose}
            />
        </AppLayout>
    )
}