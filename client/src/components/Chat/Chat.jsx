import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Avatar, Container, useMediaQuery } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'


export default function Chat() {

    const matches = useMediaQuery('(min-width: 600px)')

    const [ text, setText ] = useState('')

    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)

    const onEmojiClick = (emojiObject) => {
        setText(prevInput => prevInput + emojiObject.emoji)


    }

    return (

        <Box sx={{ height: '100%', width: '100%' }}>
            <Container sx={{ display: 'flex', height: '100%', }}>
                <Box

                    component="form"
                    sx={matches ? { p: '0 2% 0 0.7vh', display: 'flex', alignItems: 'center', width: '100%', height: '85%', borderRadius: '15px', border:'1px solid rgba(128,128,128, 0.5)'
                    // bgcolor:'rgba(128,128,128,0.1)', 
                    } 
                        : 
                        { p: '0 0 0 6px', display: 'flex', alignItems: 'center', width: 400, border: '1px gray solid', borderRadius: '20px' }}
                >
                    <InputBase

                        sx={{ ml: '1%', flex: 1, fontSize: '1rem' }}
                        placeholder={matches ? 'Digite sua mensagem...' : 'Digite'}
                        value={text}
                        onChange={e => setText(e.target.value)}

                    />
                    <IconButton aria-label="File" size='large'>
                        <ImageOutlinedIcon sx={{ fontSize: '1.75rem' }} />
                    </IconButton>
                    <IconButton type="button" aria-label="Emoji" onClick={() => setShowEmojiPicker(val => !val)} size='large'>
                        <EmojiEmotionsIcon sx={{ fontSize: '1.75rem' }} />
                    </IconButton>
                    <Avatar variant="rounded" sx={{
                        fontSize: '0.5rem',
                        height: '1.5rem',
                        width: '1.5rem',
                        borderRadius: '15px',
                        color: 'white',
                        bgcolor:'#673AB7',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        p: 2.5,
                        cursor: 'pointer',
                        transition: '.3s ease-in-out',
                        ml:'1%'
                    }}>
                        <SendIcon />
                    </Avatar>
                    {/* <Box color="primary" sx={{ p: '1vh 1vh 0.3vh 1vh', ml: '1.1vh', bgcolor: '#673AB7', borderRadius: '0 2.1vh 2.1vh 0', color: 'white', ':hover': { bgcolor: '#A020F0' } }} aria-label="SendButton" >
                        <SendIcon sx={{ fontSize:'3vh' }} />
                    </Box> */}
                </Box>

            </Container>
            <Box sx={{ position: 'absolute', bottom: '11%' }}>
                {showEmojiPicker && <EmojiPicker id='emoji' defaultSkinTone='' emojiStyle='twitter' onEmojiClick={onEmojiClick} />}
            </Box>
        </Box>

    )
}