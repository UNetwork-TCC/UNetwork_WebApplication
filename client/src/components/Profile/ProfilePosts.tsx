import { Box, Grid } from '@mui/material'
import { type User } from '$types'
import { type ReactElement } from 'react'

export default function ProfilePosts({ user }: { user: User }): ReactElement {
    
    console.log(user.posts)

    return (
        <Box display='flex' gap={3} flexDirection='column'>
            <Grid gap={2} container>
                {user?.posts?.map(e => (
                    <Grid key={e?._id} item>
                        <ProfilePost image={e?.content?.picture} />
                    </Grid>
                ))}
            </Grid>
            <Box />
        </Box>
    )
}

function ProfilePost({
    image
}: {
    image?: string
}): ReactElement {
    return (
        <Box bgcolor='red' height='23rem' width='23rem'>
            <img src={image} alt="" />
        </Box>
    )
}