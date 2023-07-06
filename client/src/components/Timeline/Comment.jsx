import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Container, useMediaQuery } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import { AccountCircle } from '@mui/icons-material'


export default function Comment() {

    const matches = useMediaQuery('(min-width: 600px)')

    const [text, setText] = useState('')

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const onEmojiClick = (emojiObject) => {
        setText(prevInput => prevInput + emojiObject.emoji)
        
    }

    return (
        <Box sx={{width:'100%'}}>
            <Box sx={{ display: 'flex', alignItems:'center' }}>
                <AccountCircle sx={{fontSize:'5.3vh', mr:'1%', color:'gray'}}/>
                <Box
                    component="form"
                    sx={matches ? { p: '0 0 0 10px', display: 'flex', width: '90%', height:'4vh' ,border: '1px gray solid', borderRadius: '20px' } : { p: '0 0 0 6px', display: 'flex', width: 400, border: '1px gray solid', borderRadius: '20px' }}
                >
                    <InputBase

                        sx={{flex: 1, pl:'2px', fontSize:'2.1vh'}}
                        placeholder={matches ? 'Adicione um comentário...' : 'Digite'}
                        value={text}
                        onChange={e => setText(e.target.value)}

                    />
                    <IconButton aria-label="File" >
                        <ImageOutlinedIcon sx={{fontSize:'3.4vh'}}/>
                    </IconButton>
                    <IconButton type="button" aria-label="Emoji" onClick={() => setShowEmojiPicker(val => !val)} size='small'>
                        <EmojiEmotionsIcon sx={{fontSize:'3.4vh'}}/>
                    </IconButton>
                    <IconButton color="primary" sx={{ p: '6px', ml: '5px', bgcolor: '#673AB7', borderRadius: '0 20px 20px 0', color: 'white', ':hover': { bgcolor: '#A020F0' } }} aria-label="SendButton" size='small'>
                        <SendIcon sx={{fontSize:'2.5vh'}} />
                    </IconButton>
                </Box>

            </Box>
            <Box sx={{ position: 'absolute', bottom: '11%' }}>
                {showEmojiPicker && <EmojiPicker id='emoji' defaultSkinTone='' emojiStyle='twitter' onEmojiClick={onEmojiClick} />}
            </Box>
        </Box>

    )
}