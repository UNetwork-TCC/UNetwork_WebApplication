import { IconButton, Avatar, Container, useMediaQuery, InputBase, Box, useTheme } from '@mui/material'
import { Send, ImageOutlined, EmojiEmotions } from '@mui/icons-material'
import EmojiPicker from 'emoji-picker-react'
import { type ReactElement, useState } from 'react'

export default function Chat(): ReactElement {

    const theme = useTheme()
    const matches = useMediaQuery('(min-width: 600px)')

    const [ text, setText ] = useState('')

    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)

    const onEmojiClick = ( emojiObject:any ):void => {
        setText(prevInput => prevInput + emojiObject.emoji)
    }

    return (

        <Box sx={{ height: '100%', width: '100%' }}>
            <Container sx={{ display: 'flex', height: '100%' }}>
                <Box
                    boxShadow={theme.shadows[3]}
                    component="form"
                    sx={matches ? {
                        p: '0 2% 0 0.7vh', display: 'flex', alignItems: 'center', width: '100%', height: '100%', borderRadius: '15px',
                        bgcolor: 'white'
                        // order:'1px solid rgba(128,128,128, 0.5)'
                        // bgcolor:'rgba(128,128,128,0.1)', 
                    }
                        :
                        { p: '0 0 0 6px', display: 'flex', alignItems: 'center', width: 400, border: '1px gray solid', borderRadius: '20px' }}
                >
                    <InputBase

                        sx={{ ml: '1%', flex: 1, fontSize: '1rem' }}
                        placeholder={matches ? 'Digite sua mensagem...' : 'Digite'}
                        value={text}
                        onChange={e => { setText(e.target.value) }}

                    />
                    <input type='file' id='file' accept='image/*' style={{ display: 'none' }} />
                    <IconButton component='label' htmlFor='file' sx={{ cursor: 'pointer', transition: '.3s', bgcolor: 'white', color:'gray' }}>
                        <ImageOutlined sx={{ fontSize: '1.75rem' }} />
                    </IconButton>
                    
                    <IconButton type="button" aria-label="Emoji" onClick={() => { setShowEmojiPicker(val => !val) }} size='large'>
                        <EmojiEmotions sx={{ fontSize: '1.75rem' }} />
                    </IconButton>
                    <Avatar variant="rounded" sx={{
                        fontSize: '0.5rem',
                        height: '1.5rem',
                        width: '1.5rem',
                        borderRadius: '15px',
                        color: 'white',
                        bgcolor: '#673AB7',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        p: 2,
                        cursor: 'pointer',
                        transition: '.3s ease-in-out',
                        ml: '1%'
                    }}>
                        <Send />
                    </Avatar>
                </Box>

            </Container>

            <Box sx={{ position: 'absolute', bottom: '11%' }}  >
                {showEmojiPicker && (
                    <Box >
                        <Box sx={{ ml: '15.5%', width: '69%', mt: '7%', height: '75%', position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, zIndex: 2 }} 
                            onClick={() => { setShowEmojiPicker(false) }}></Box>
                        <Box sx={{ position: 'relative', zIndex: 3 }}>
                            <EmojiPicker onEmojiClick={onEmojiClick} autoFocusSearch={false} />
                        </Box>
                    </Box>)}
            </Box>
        </Box>
    )
}
