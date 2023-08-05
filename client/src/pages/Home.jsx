import { Box } from '@mui/material'
import CustomInput from '../layout/CustomInput'
import { Post } from '../components'
import { Add } from '@mui/icons-material'
import AppLayout from '../layout/AppLayout'
import { useTheme } from '@emotion/react'

export default function Feed() {
    const theme = useTheme()

    return (
        <AppLayout>
            <Box display='flex'justifyContent='start' alignItems='center' flexDirection='column' p={3} width='70%' height='100%'>
                <CustomInput
                    sx={{ boxShadow: theme.shadows[0] }} 
                    fullWidth
                    width='100%'
                    bgcolor='white'
                    placeholder='No que estou pensando...'
                    color='primary.main'
                    iconColor='#dbdbdb'
                    icon={<Add />}
                />
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%' m={5}>
                    <Post />
                </Box>
            </Box>
        </AppLayout>
    )
}
