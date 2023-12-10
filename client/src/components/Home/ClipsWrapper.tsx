import { Box } from '@mui/material'
import { Clip } from '$layout'
import { useContext, type ReactElement } from 'react'
import { themeContext } from '$contexts'

export default function ClipsWrapper(): ReactElement {

    const { theme, setTheme } = useContext(themeContext)

    const clipsData = {
        postedBy: {
            id: 'asd2312',
            name: 'Vitor',
            avatar: '$assets/img/bg.jpg'
        },

        clips: [
            {
                id: 0,
                content: '$assets/video/ComunityFeature.mp4',
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
        <Box display='flex' gap={2} m={2} mb={7.5} sx={{ [theme.breakpoints.down('lg')]: { m:0, mb:5 } }}>
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