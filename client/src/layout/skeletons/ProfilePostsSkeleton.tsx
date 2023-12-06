import { Box, Grid, Skeleton } from '@mui/material'
import { type ReactElement } from 'react'

export default function ProfilePostsSkeleton(): ReactElement {
    return (
        <Box display='flex' gap={2} flexDirection='column'>
            <Grid gap={2} container>
                {[ 0, 1, 2, 3, 4, 5 ].map(e => (
                    <Grid key={e} item>
                        <Skeleton variant='rectangular' height='23rem' width='23rem' />
                    </Grid>
                ))}
            </Grid>
            <Box />
        </Box>
    )
}