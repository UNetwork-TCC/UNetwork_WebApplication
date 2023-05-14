import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import ChatIcon from '@mui/icons-material/Chat'
import GroupIcon from '@mui/icons-material/Group'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'
import { Box } from '@mui/material'


function NavBar() {

    const buttons = [
        
        <Button key="one" style={{color: '#0D0C0A', fontWeight: '550'}} startIcon={<GroupIcon style={{color: '#0D0C0A', fontWeight: '550'}} />}>Grupos</Button>,
        <Button key="two" style={{color: '#0D0C0A', fontWeight: '550'}} startIcon={<ChatIcon style={{color: '#0D0C0A', fontWeight: '550'}}/>}>Conversas</Button>,
        <Button key="three" style={{color: '#0D0C0A', fontWeight: '550'}} startIcon={<LibraryBooksOutlinedIcon style={{color: '#0D0C0A', fontWeight: '550'}}/>}>Materiais</Button>,
        <Button key="four" style={{color: '#0D0C0A', fontWeight: '550'}} startIcon={<BookmarksOutlinedIcon style={{color: '#0D0C0A', fontWeight: '550'}}/>}>Salvo</Button>
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
                <ButtonGroup style={{alignItems: 'start'}} size='large' orientation="vertical" aria-label="vertical contained button group" variant="">{buttons}</ButtonGroup>
            </Box>

        </Box>
    )
}

export default NavBar
