import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Container, useMediaQuery } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'


export default function Chat() {

    const matches = useMediaQuery('(min-width: 600px)')

    const [text, setText] = useState('')

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const onEmojiClick = (emojiObject) => {
        setText(prevInput => prevInput + emojiObject.emoji)
        

    }

    const close = () => {

        if (onClick) {
            setShowEmojiPicker(val => false)
        }

    }


    return (

        <Box>
            <Container sx={{ display: 'flex', width: '110vh', height:'5vh' }}>
                <Box

                    component="form"
                    sx={matches ? { p: '0 0 0 6px', display: 'flex', alignItems: 'center', width: '110vh', height:'5vh', border: '1px gray solid', borderRadius: '30px' } : { p: '0 0 0 6px', display: 'flex', alignItems: 'center', width: 400, border: '1px gray solid', borderRadius: '20px' }}
                >
                    <InputBase

                        sx={{ ml: 1, flex: 1, fontSize:'2.1vh' }}
                        placeholder={matches ? 'Digite sua mensagem...' : 'Digite'}
                        value={text}
                        onChange={e => setText(e.target.value)}

                    />
                    <IconButton aria-label="File" size='large'>
                        <ImageOutlinedIcon sx={{fontSize:'3.1vh'}}/>
                    </IconButton>
                    <IconButton type="button" aria-label="Emoji" onClick={() => setShowEmojiPicker(val => !val)} size='large'>
                        <EmojiEmotionsIcon sx={{fontSize:'3.1vh'}}/>
                    </IconButton>
                    <Box color="primary" sx={{ p: '1vh 1vh 0.3vh 1vh', ml: '10px', bgcolor: '#673AB7', borderRadius: '0 20px 20px 0', color: 'white', ':hover': { bgcolor: '#A020F0' } }} aria-label="SendButton" size='small'>
                        <SendIcon sx={{fontSize:'3vh'}} />
                    </Box>
                </Box>

            </Container>
            <Box sx={{ position: 'absolute', bottom: '11%' }}>
                {showEmojiPicker && <EmojiPicker id='emoji' defaultSkinTone='' emojiStyle='twitter' onEmojiClick={onEmojiClick} />}
            </Box>
        </Box>

    )
}