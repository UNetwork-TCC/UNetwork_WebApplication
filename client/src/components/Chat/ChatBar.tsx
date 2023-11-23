import { IconButton, useMediaQuery, InputBase, Box, useTheme } from '@mui/material'
import { Send, ImageOutlined, EmojiEmotions } from '@mui/icons-material'
import EmojiPicker from 'emoji-picker-react'
import { type ReactElement, useState, type FormEvent, type MouseEvent } from 'react'

export default function ChatBar(): ReactElement {

    const theme = useTheme()
    const matches = useMediaQuery('(min-width: 600px)')

    const [ text, setText ] = useState('')

    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)

    const onEmojiClick = ( emojiObject:any ):void => {
        setText(prevInput => prevInput + emojiObject.emoji)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> & MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        console.log(text)
        setText('')
    }

    return (
        <Box m={2} height='3rem' width='97%'>
            <Box
                boxShadow={theme.shadows[3]}
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'background.card',
                    borderRadius: 3.5,
                    p: 0.5
                }}
            >
                <InputBase
                    sx={{ flex: 1, fontSize: '1rem', ml: 2 }}
                    placeholder={matches ? 'Digite sua mensagem...' : 'Digite'}
                    value={text}
                    onChange={e => { setText(e.target.value) }}
                />
                <Box mr={2}>
                    <input type='file' id='file' accept='image/*' style={{ display: 'none' }} />
                    <IconButton component='label' htmlFor='file'>
                        <ImageOutlined />
                    </IconButton>
                    
                    <IconButton type="button" aria-label="Emoji" onClick={() => { setShowEmojiPicker(val => !val) }} size='large'>
                        <EmojiEmotions />
                    </IconButton>
                    <IconButton 
                        onClick={handleSubmit}
                        sx={{ bgcolor: 'primary.main', color: 'white' }}
                    >
                        <Send />
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ position: 'absolute', bottom: '11%' }}  >
                {showEmojiPicker && (
                    <Box >
                        <Box sx={{ ml: '15.5%', width: '69%', mt: '7%', height: '75%', position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, zIndex: 2 }} 
                            onClick={() => { setShowEmojiPicker(false) }}></Box>
                        <Box sx={{ position: 'relative', zIndex: 3 }}>
                            <EmojiPicker  onEmojiClick={onEmojiClick} autoFocusSearch={false} />
                        </Box>
                    </Box>)
                }
            </Box>
        </Box>
    )
}
