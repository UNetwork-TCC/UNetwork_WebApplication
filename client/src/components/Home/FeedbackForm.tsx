import { Button, useTheme } from '@mui/material'
import { TextField } from '@mui/material'
import { Box, Divider, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useState, type FormEvent, type ReactElement, type MouseEvent, useEffect, useRef } from 'react'

export default function FeedbackForm({ handleSubmit }: { handleSubmit: (e: FormEvent<HTMLFormElement>) => void }): ReactElement {
    const theme = useTheme()
    
    const [ feedbackValue, setFeedbackValue ] = useState<number | null>(null)
   
    function Rate({ 
        value
    } : {
        value: number,
    }): ReactElement {
        const [ clicked, setClicked ] = useState(false)
        
        const handleRateClick = (): void => { 
            setClicked(prevState => !prevState)
            setFeedbackValue(value)
        }

        return (
            <Box
                onClick={handleRateClick}
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='4rem' 
                width='4rem'
                borderRadius='100%'
                sx={{
                    cursor: 'pointer',
                    transition: '.1s ease-in-out',
                    bgcolor: clicked ? 'primary.main' : (theme.palette.mode === 'light' ? grey[200] : '#211e24'),
                    color: clicked ? 'primary.contrastText' : 'primary.text',
                    ':hover': {
                        bgcolor: !clicked ? (theme.palette.mode === 'light' ? grey[300] : '#2a272e') : undefined
                    }
                }}
            >
                {value}
            </Box>
        )
    }

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
                                    <Rate 
                                        key={item}
                                        value={item}
                                    />
                                ))}
                            </Box>
                            <Box gap={1} display='flex'>
                                {[ 6, 7, 8, 9, 10 ].map(item => (
                                    <Rate 
                                        key={item}
                                        value={item}
                                    />
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
