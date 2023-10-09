import { Box, Button, Link, Paper, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function BigNews({ 
    description,
    id,
    title 
} : {
    description: string,
    id: string,
    title: string
}) : ReactElement {
    return (
        <Paper sx={{ m: '0 2% 0 0', width: '20rem', height: '20rem', fontSize:'10px', borderRadius: '2em 2em 0 0' }}>
            <Box sx={{ bgcolor: 'gray', width: '100%', height: '60%', borderRadius: '2em' }}><img/></Box>
            <Box sx={{ ml: '1em', mt: '.5em' }}>
                <Typography>{title}</Typography>
                <Typography>{description}</Typography>
                <Link href={`#${id}`}>
                    <Button 
                        sx={{ 
                            fontSize: '14px',
                            float: 'right',
                            border: '1px solid #673AB7',
                            borderRadius: '3em',
                            padding: '.3em 10%',
                            margin: '3% 3%',
                            ':hover':{ 
                                bgcolor:'#673AB7',
                                color:'white' 
                            } 
                        }}
                    >Leia Mais</Button>
                </Link>

            </Box>
        </Paper>
    )
}
