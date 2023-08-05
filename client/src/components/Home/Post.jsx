import { Box, Card } from '@mui/material'

export default function Post() {
    return (
        <Card variant="elevation" elevation={6} sx={{ 
            minHeight: '35rem',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '20px'
        }}></Card>
    )
}
