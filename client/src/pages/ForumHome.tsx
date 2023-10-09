import { Search } from '@mui/icons-material'
import { AppLayout, CustomInput } from '$layout'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material'
import { useEffect, type ReactElement } from 'react'
import { ForumIcon, ForumWrapper } from '$components'
import { useAppDispatch, useAppSelector } from '$store'
import { fetchForum } from '$features/forum/forum-slicer'
import { type Forum } from '$types'

export default function ForumHome(): ReactElement {
    const theme = useTheme()

    const dispatch = useAppDispatch()
    const forumState = useAppSelector(state => state.forum)
    const forumsArr: Array<Forum & { _id: string }> = forumState.forums

    useEffect(() => {
        dispatch(fetchForum())
    }, [dispatch])

    console.log(forumsArr)

    return (
        <AppLayout withSidebars>
            <Box overflow='hidden' display='flex' width='100%' flexDirection='column' p={2.5}>
                <Box mb={5}>
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
                <ForumWrapper>
                    <ForumIcon
                        id='1'
                        name='Como se tornar um bom programador?'
                        topic='Programação'
                        people={253}
                    />
                    <ForumIcon
                        id='1'
                        name='Odeio química'
                        topic='Química'
                        people={41}
                    />
                    <ForumIcon
                        id='1'
                        name='Alguém sabe como resolver esta equação?'
                        topic='Matemática'
                        people={25}
                    />
                    <ForumIcon
                        id='1'
                        name='Paulo Rogério poderia cancelar o TCC'
                        topic='TCC'
                        people={330}
                    />
                    <ForumIcon
                        id='1'
                        name='É sério isso?'
                        topic='Administração'
                        people={2}
                    />
                </ForumWrapper>
            </Box>
        </AppLayout>
    )
}