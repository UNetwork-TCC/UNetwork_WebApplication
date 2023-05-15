import { Box, Button, ButtonGroup } from '@mui/material'
import { Chat, Group, LibraryBooksOutlined, BookmarksOutlined } from '@mui/icons-material'

export default function NavBar() {

    const buttonStyles = {
        color: '#0d0c0a',
        fontWeight: '550'
    }

    const buttons = [

        <Button key={0} 
            sx={buttonStyles} 
            startIcon={<Group sx={buttonStyles} />}
        >Grupos</Button>,
        <Button key={1} sx={buttonStyles} 
            startIcon={<Chat sx={buttonStyles} />}
        >Conversas</Button>,
        <Button key="three" 
            sx={buttonStyles} 
            startIcon={<LibraryBooksOutlined sx={buttonStyles}/>}
        >Materiais</Button>,
        <Button key="four" sx={buttonStyles} 
            startIcon={<BookmarksOutlined sx={buttonStyles} />}
        >Salvo</Button>
    ]

    return (
        <Box sx={{
            maxWidth: '185px',
            height: '85vh',
            bgcolor: 'gray',
            paddingLeft: '15px',
            display: 'flex'
        }}>

            <Box>
                <ButtonGroup 
                    sx={{ alignItems: 'start' }} 
                    size='large' 
                    orientation="vertical" 
                    aria-label="vertical contained button group" 
                    variant=""
                >{buttons}</ButtonGroup>
            </Box>

        </Box>
    )
}