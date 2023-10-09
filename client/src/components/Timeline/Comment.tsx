import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { useMediaQuery } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import EmojiPicker, { SkinTones, EmojiStyle, type EmojiClickData } from 'emoji-picker-react'
import { type ReactElement, useState } from 'react'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import { AccountCircle } from '@mui/icons-material'

export default function Comment(): ReactElement {

    const matches = useMediaQuery('(min-width: 600px)')

    const defaultSkinTone: SkinTones = SkinTones.NEUTRAL
    const emojiStyle: EmojiStyle = EmojiStyle.TWITTER 

    const [ text, setText ] = useState('')

    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)

    const onEmojiClick = (emojiObject: EmojiClickData): void => {
        setText(prevInput => prevInput + emojiObject.emoji)
    }

    return (
        <Box sx={{ width:'100%' }}>
            <Box sx={{ display: 'flex', alignItems:'center' }}>
                <AccountCircle sx={{ fontSize:'52px', mr:'1%', color:'gray' }}/>
                <Box
                    component="form"
                    sx={
                        matches ? {
                            p: '0 0 0 1.1vh',
                            display: 'flex',
                            width: '90%',
                            height:'40px',
                            minHeight:'30px' ,
                            order: '.2vh gray solid',
                            borderRadius: '2.1vh' 
                        } : {
                            p: '0 0 0 6px',
                            display: 'flex',
                            width: 400,
                            border: '1px gray solid',
                            borderRadius: '20px' 
                        }
                    }
                >
                    <InputBase

                        sx={{ flex: 1, pl:'.3vh', fontSize:'20px' }}
                        placeholder={matches ? 'Adicione um comentário...' : 'Digite'}
                        value={text}
                        onChange={e => { setText(e.target.value) }}

                    />
                    <IconButton aria-label="File" >
                        <ImageOutlinedIcon sx={{ fontSize:'33px' }}/>
                    </IconButton>
                    <IconButton type="button" aria-label="Emoji" onClick={() => { setShowEmojiPicker(val => !val) }} >
                        <EmojiEmotionsIcon sx={{ fontSize:'33px' }}/>
                    </IconButton>
                    <IconButton 
                        color="primary" 
                        aria-label="SendButton"
                        sx={{
                            p: '.7vh',
                            ml: '.6vh',
                            bgcolor: '#673AB7',
                            borderRadius: '0 2.1vh 2.1vh 0',
                            color: 'white',
                            ':hover': { bgcolor: '#A020F0' } 
                        }} 
                    >
                        <SendIcon sx={{ fontSize:'24px' }} />
                    </IconButton>
                </Box>

            </Box>
            <Box sx={{ position: 'absolute', bottom: '11%' }}>
                {showEmojiPicker && <EmojiPicker defaultSkinTone={defaultSkinTone} emojiStyle={emojiStyle} onEmojiClick={onEmojiClick} />}
            </Box>
        </Box>

    )
}