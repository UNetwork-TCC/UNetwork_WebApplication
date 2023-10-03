import { Box } from '@mui/material'
import { Clip } from '$layout'

export default function ClipsWrapper() {
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
        <Box display='flex' m={2} mb={7.5}>
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