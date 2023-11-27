import { Box, Grid } from '@mui/material'
import { type User } from '$types'
import { type ReactElement } from 'react'

export default function ProfilePosts({ user }: { user: User }): ReactElement {
    return (
        <Box display='flex' gap={3} flexDirection='column'>
            <Grid gap={2} container>
                {user?.posts?.map(e => (
                    <Grid key={e?._id} item>
                        <ProfilePost />
                    </Grid>
                ))}
            </Grid>
            <Box />
        </Box>
    )
}

function ProfilePost(): ReactElement {
    return (
        <Box bgcolor='red' height='23rem' width='23rem'>

        </Box>
    )
}