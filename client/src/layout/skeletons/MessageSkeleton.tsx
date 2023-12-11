import { Skeleton, useTheme } from '@mui/material'
import { Box } from '@mui/material'
import React, { type ReactElement } from 'react'

export default function MessageSkeleton({ messageFrom }: { messageFrom: 'me' | 'him' }): ReactElement {
    const theme = useTheme()
  
    return (
        <Box width='100%'>
            <Box display='flex' justifyContent={messageFrom === 'him' ? 'start' : 'end'} width='100%'>
                <Skeleton sx={{
                    height: '10rem',
                    width: '60%',
                    borderRadius: 5
                }} />
            </Box>
            <Box
                display='flex'
                width='100%'
                position='relative'
                left={messageFrom === 'me' ? '99%' : '0.5%'}
                bottom={25}
            >
                <Skeleton
                    sx={{
                        position: 'relative',
                        height: 38,
                        width: 25,
                        bottom: 20,
                        borderRadius: 10,
                        right: 10,
                        [theme.breakpoints.only('lg')]: {
                            height:20,
                            width:20
                        },
                        [theme.breakpoints.only('md')]: {
                            height:17.5,
                            width:17.5
                        }
                    }}
                />
            </Box>
        </Box>
    )
}