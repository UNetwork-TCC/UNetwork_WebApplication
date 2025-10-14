import { Box, useTheme } from '@mui/material'
import { Clip } from '@/layout'
import { type ReactElement } from 'react'

export default function ClipsWrapper(): ReactElement {

    const theme = useTheme()

    const clipsData = {
        postedBy: {
            id: 'asd2312',
            name: 'Vitor',
            avatar: '@/public/assets/img/bg.jpg'
        },

        clips: [
            {
                id: 0,
                content: '@/public/assets/video/ComunityFeature.mp4',
                postedAt: new Date()
            },

            {
                id: 1,
                content: '',
                postedAt: new Date()
            },

            {
                id: 1,
                content: '',
                postedAt: new Date()
            },

            {
                id: 1,
                content: '',
                postedAt: new Date()
            },

            {
                id: 1,
                content: '',
                postedAt: new Date()
            },

            {
                id: 1,
                content: '',
                postedAt: new Date()
            },

            {
                id: 1,
                content: '',
                postedAt: new Date()
            }
        ]
    }

    return (
        <Box display='flex' gap={2} m={2} mb={7.5} sx={{ [theme.breakpoints.only('md')]: { m:0, mb:5 } }}>
            {clipsData.clips.map(clip => (
                <Clip
                    key={clip.id}
                    id={clip.id}
                    postedBy={clipsData.postedBy.name}
                    postedAt={clip.postedAt}
                />
            ))}
        </Box>
    )
}