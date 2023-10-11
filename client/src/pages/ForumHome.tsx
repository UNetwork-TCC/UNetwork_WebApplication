import { Search } from '@mui/icons-material'
import { AppLayout, CustomInput, FormModal } from '$layout'
import { Box, Button, TextField } from '@mui/material'
import { useTheme } from '@mui/material'
import { useEffect, type ReactElement, useState } from 'react'
import { ForumIcon, ForumWrapper } from '$components'
import { useAppDispatch, useAppSelector } from '$store'
import { createForum, fetchForum } from '$features/forum/forum-slicer'
import { type User, type Forum } from '$types'

export default function ForumHome(): ReactElement {
    const theme = useTheme()

    const [ open, setOpen ] = useState<boolean>(false)

    const handleOpen = ():void => { setOpen(true) }
    const handleClose = ():void => { setOpen(false) }

    const dispatch = useAppDispatch()
    const forumState = useAppSelector(state => state.forum)
    const forumsArr: Forum[] = forumState.forums

    const [ forumForm, setForumForm ] = useState<{ title: string, description: string, topic: string, createdBy: User | string }>({
        title: '',
        description: '',
        topic: '',
        createdBy: 'Vitronks'
    })

    const handleSubmit = (e: Event): void => {
        e.preventDefault()

        dispatch(createForum(forumForm))

        setTimeout(() => {
            location.reload()
        }, 1000)
    }

    useEffect(() => {
        dispatch(fetchForum())
    }, [ dispatch ])

    console.log(forumsArr)

    return (
        <AppLayout withSidebars>
            <Box overflow='hidden' display='flex' width='100%' flexDirection='column' p={2.5}>
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
                    {forumsArr.map((forum: Forum) => (
                        <ForumIcon
                            key={forum._id}
                            id={forum._id}
                            title={forum.title}
                            topic={forum.topic}
                            usersIn={forum.usersIn}
                        />
                    ))}
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
        </AppLayout>
    )
}