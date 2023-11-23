import { type ReactElement } from 'react'
import { Box, Stack } from '@mui/material'

export default function ForumWrapper({ children } : { children: ReactElement | ReactElement[] | any }): ReactElement {
    return (
        <Box display='flex' height='100%' width='100%'>
            <Stack gap={2}>
                {children}
            </Stack>
        </Box>
    )
}
