import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import './NavBar.css'
import ChatIcon from '@mui/icons-material/Chat'
import GroupIcon from '@mui/icons-material/Group'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined'


function NavBar() {

    const buttons = [
        
        <Button key="one" style={{color: '#0D0C0A', fontWeight: '550'}} startIcon={<GroupIcon style={{color: '#0D0C0A', fontWeight: '550'}} />}>Grupos</Button>,
        <Button key="two" style={{color: '#0D0C0A', fontWeight: '550'}} startIcon={<ChatIcon style={{color: '#0D0C0A', fontWeight: '550'}}/>}>Conversas</Button>,
        <Button key="three" style={{color: '#0D0C0A', fontWeight: '550'}} startIcon={<LibraryBooksOutlinedIcon style={{color: '#0D0C0A', fontWeight: '550'}}/>}>Materiais</Button>,
        <Button key="four" style={{color: '#0D0C0A', fontWeight: '550'}} startIcon={<BookmarksOutlinedIcon style={{color: '#0D0C0A', fontWeight: '550'}}/>}>Salvo</Button>
    ]

    return (
        
        <div className='NavBar'>
            

            <div className="buttons">
                <ButtonGroup style={{alignItems: 'start'}} size='large' orientation="vertical" aria-label="vertical contained button group" variant="">{buttons}</ButtonGroup>
            </div>

        </div>
    )
}

export default NavBar
