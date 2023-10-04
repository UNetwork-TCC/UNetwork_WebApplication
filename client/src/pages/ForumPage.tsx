import { Search } from '@mui/icons-material'
import { AppLayout, CustomInput } from '$layout'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { type ReactElement } from 'react'

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
                        bgcolor='white'
                        placeholder='Pesquisar fóruns...'
                        color='primary.main'
                        iconColor='#dbdbdb'
                        icon={<Search />}
                    />
                </Box>
                <Stack p={2} gap={3}>
                    <Box>
                        <Avatar />
                        <Typography>Fórum 1</Typography>
                    </Box>
                    <Box>
                        <Avatar />
                        <Typography>Fórum 1</Typography>
                    </Box>
                    <Box>
                        <Avatar />
                        <Typography>Fórum 1</Typography>
                    </Box>
                    <Box>
                        <Avatar />
                        <Typography>Fórum 1</Typography>
                    </Box>
                    <Box>
                        <Avatar />
                        <Typography>Fórum 1</Typography>
                    </Box>
                    <Box>
                        <Avatar />
                        <Typography>Fórum 1</Typography>
                    </Box>
                    <Box>
                        <Avatar />
                        <Typography>Fórum 1</Typography>
                    </Box>

                </Stack>
            </Box>
        </AppLayout>
    )
}