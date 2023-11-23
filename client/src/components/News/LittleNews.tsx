import { Box, Link, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function LittleNews({
    description,
    id,
    title
}: {
    description: string,
    id: string,
    title: string
}) : ReactElement {
    return (
        <Box sx={{ display: 'flex', mb: '2%', fontSize: '10px' }}>
            <Box sx={{ width: '7%', bgcolor: 'red' }} />
            <Box sx={{ ml: '1em', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                <Typography sx={{ mb: '5%' }}>{title}</Typography>
                <Typography sx={{ mb: '5%' }}>{description}</Typography>
                <Link href={`#${id}`} underline='none'>
                    <Typography>Leia Mais</Typography>
                </Link>
            </Box>
        </Box>
    )
}
