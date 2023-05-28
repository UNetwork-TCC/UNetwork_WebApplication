import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Container } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
// import InputAdornment from '@mui/material/InputAdornment'
import InputBase from '@mui/material/InputBase'
// import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function Chat() {

    const [text, setText] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const onEmojiClick = (emojiObject) => {
        console.log(emojiObject)
        setText(prevInput => prevInput + emojiObject.emoji)
        setShowEmojiPicker(false)
    }

    return (
        <Box>
            <Container sx={{ display: 'flex', position: 'relative'}}>
                <Box
                    component="form"
                    sx={{p: '0 0 0 6px', display: 'flex', alignItems: 'center', width: 400, border: '1px gray solid',borderRadius: '20px'}}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1}}
                        placeholder="Digite sua mensagem..."
                        value={text}
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={e => setText(e.target.value)}
                        
                    />
                    <IconButton sx={{}} aria-label="File" >
                        <ImageOutlinedIcon />
                    </IconButton>
                    <IconButton type="button" sx={{ }} aria-label="Emoji" onClick={() => setShowEmojiPicker(val => !val)} size='small'>
                        <EmojiEmotionsIcon />
                    </IconButton>
                    <IconButton color="primary" sx={{ p: '10px', ml: '5px' , bgcolor: 'purple', borderRadius: '0 20px 20px 0', color: 'white', ':hover': {bgcolor:'#A020F0'}}} aria-label="SendButton" size='small'>
                        <SendIcon fontSize='small'   />
                    </IconButton>
                </Box>
                
            </Container>
            <Box>
                {showEmojiPicker && <EmojiPicker defaultSkinTone=''  emojiStyle='twitter' onEmojiClick={onEmojiClick} />}
            </Box>
        </Box>
    )
}




    

