import { Rate } from '$layout'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { Box, Divider, Typography } from '@mui/material'
import { type FormEvent, type ReactElement } from 'react'

export default function FeedbackForm({ handleSubmit }: { handleSubmit: (e: FormEvent<HTMLFormElement>) => void }): ReactElement {
    return (
        <form onSubmit={handleSubmit}>
            <Box
                height='45rem'
                width='40rem'
                borderRadius={2.5}
                bgcolor='background.paper'
            >
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    lineHeight={1}
                    p={1}
                >
                    <h1>Avalie sua experiência</h1>
                </Box>
                <Divider />
                <Box p={2}>
                    <Box p={3}>
                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            flexDirection='column'
                            gap={2}
                        >
                            <Box gap={1} display='flex'>
                                {[ 0, 1, 2, 3, 4, 5 ].map(item => (
                                    <Rate key={item}>
                                        {item}
                                    </Rate>
                                ))}
                            </Box>
                            <Box gap={1} display='flex'>
                                {[ 6, 7, 8, 9, 10 ].map(item => (
                                    <Rate key={item}>
                                        {item}
                                    </Rate>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='space-between' m={2}>
                        <Typography>0 - Muito ruim</Typography>
                        <Typography>10 - Muito bom</Typography>
                    </Box>
                    <Box mt={4} p={2}>
                        <Typography>Conte-nos um pouco sobre sua experiência</Typography>
                        <TextField
                            fullWidth
                            placeholder='Digite sua experiência aqui...'
                        />
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='end'
                        alignItems='center'
                        p={2}
                    >
                        <Button type='submit' variant='contained'>Enviar</Button>
                    </Box>
                </Box>
            </Box>
        </form>
    )
}
