import { Box, Grid } from '@mui/material'
import { type ReactElement } from 'react'

export default function ProfilePosts(): ReactElement {
    return (
        <Box display='flex' gap={3} flexDirection='column'>
            <Grid gap={2} container>
                <Grid item>
                    <ProfilePost />
                </Grid>
                <Grid item>
                    <ProfilePost />
                </Grid>
                <Grid item>
                    <ProfilePost />
                </Grid>
                <Grid item>
                    <ProfilePost />
                </Grid>
                <Grid item>
                    <ProfilePost />
                </Grid>
                <Grid item>
                    <ProfilePost />
                </Grid>
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