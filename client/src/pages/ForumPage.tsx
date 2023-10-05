import { Search } from '@mui/icons-material'
import { AppLayout, CustomInput } from '$layout'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { type ReactElement } from 'react'
import { ForumIcon, ForumWrapper } from '$components'

export default function ForumPage(): ReactElement {
    const theme = useTheme()

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
                        name='Como se tornar um bom programador?'
                        topic='Programação'
                        people={253}
                    />
                    <ForumIcon
                        name='Odeio química'
                        topic='Química'
                        people={41}
                    />
                    <ForumIcon
                        name='Alguém sabe como resolver esta equação?'
                        topic='Matemática'
                        people={25}
                    />
                    <ForumIcon
                        name='Paulo Rogério poderia cancelar o TCC'
                        topic='TCC'
                        people={330}
                    />
                    <ForumIcon
                        name='É sério isso?'
                        topic='Administração'
                        people={2}
                    />
                </ForumWrapper>
            </Box>
        </AppLayout>
    )
}