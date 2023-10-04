import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { type SxProps } from '@mui/material'

import {
    AccountCircle,
    MenuBook,
    Chat,
    Bookmark,
    Groups,
    Newspaper,
    Menu
} from '@mui/icons-material'

import { type ReactElement } from 'react'

export default function SideBar({ buttonStyle }: { buttonStyle: string }): ReactElement {

    const notStylized: SxProps = {
        borderRadius: '2.1vh',
        mb: '6vh',
        ml: '2.5vh',
        color:'gray'
    }

    const Stylized: SxProps = {
        width:'9vh',
        borderRadius: '10vh 10vh 10vh 10vh',
        bgcolor: '#673AB7',
        color: 'white',
        mb: '6vh',
        p: '1.2vh 1.75vh',
        ml: '0.75vh',
        ':hover': {
            bgcolor: '#673AB7',
            color: 'white'
            
        }
    }

    const navigate = useNavigate()

    return (
        <Box sx={{ mt: '2.1vh', height:'100%', width:'6vw' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '1.1vh', width: '20vw', ml: '0.8vh' }}>
                <Box sx={{ ml: '0.7vh', mb: '4vh', color: 'rgba(0, 0, 0, 0.54)' }}>
                    <AccountCircle sx={{ fontSize: '9.0vh' }} />
                </Box>
                <Box>
                    <Box onClick={() => { navigate('/materials') }} sx={buttonStyle !== 'Materials' ? (notStylized) : (Stylized)}>
                        <MenuBook sx={{ fontSize: '5.5vh' }} />
                    </Box>
                </Box>
                <Box>
                    <Box onClick={() => { navigate('/Chat') }} sx={buttonStyle !== 'Chat' ? (notStylized) : (Stylized)}>
                        <Chat sx={{ fontSize: '5.5vh' }} />
                    </Box>
                </Box>
                <Box>
                    <Box onClick={() => { navigate('/Classes') }} className='Classes' sx={buttonStyle !== 'Classes' ? (notStylized) : (Stylized)}>
                        <Groups sx={{ fontSize: '5.5vh' }} />
                    </Box>
                </Box>
                <Box>
                    <Box onClick={() => { navigate('/Favorites') }} sx={buttonStyle !== 'Favorites' ? (notStylized) : (Stylized)}>
                        <Bookmark sx={{ fontSize: '5.5vh' }} />
                    </Box>
                </Box>
                <Box>
                    <Box onClick={() => { navigate('/News') }} sx={buttonStyle !== 'News' ? (notStylized) : (Stylized)}>
                        <Newspaper sx={{ fontSize: '5.5vh' }} />
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ borderRadius: '2.1vh', mb: '0vh', ml: '2.5vh', color:'gray' }} >
                        <Menu sx={{ fontSize: '5.5vh' }} />
                    </Box>
                </Box>

            </Box>

        </Box>
    )
}
