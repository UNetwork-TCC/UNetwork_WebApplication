import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Container } from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { EmojiPicker } from 'emoji-picker-react'
import { useState } from 'react'

export default function Chat() {

    const [text, setText] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const onClick = (event, emojiObject) => {
        setText(prevInput => prevInput + emojiObject.Emoji)
        setShowEmojiPicker(false)
    }

    // const addEmoji = (e) => {
    //     const emojiExisting = e.undied.split('_')
    //     const codeArray = []
    //     emojiExisting.forEach((el) => codeArray.push('0x' + el))
    //     let emoji = String.fromCodePoint(...codeArray)
    //     setText(text + emoji)     
    // } 

    return (

        <Container sx={{ display: 'flex' }}>
            
            <IconButton 
                size='small' 
                onClick={() => setShowEmojiPicker(val => !val)} 
                color="primary" 
                sx={{ p: '10px' }} 
                aria-label="Enviar">
                <AttachmentIcon  fontSize='small'/>
            </IconButton>
            
            {showEmojiPicker && <EmojiPicker onEmojiClick={onClick} />}
            
            <IconButton 
                size='small'
                color="primary" 
                sx={{ p: '10px' }} 
                aria-label="Enviar">
                    
                <AttachmentIcon fontSize='small'/>
            </IconButton>
            <Paper
                
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    
                    sx={{ ml: 1, flex: 1 }}
                    value={text}
                    placeholder="Envie uma Mensagem"
                    onChange={e => setText(e.target.value)}
                />
            </Paper>

            <IconButton 
                size='small' 
                color="primary" 
                sx={{ p: '10px' }} 
                aria-label="Enviar">

                <SendIcon fontSize='small'/>
            </IconButton>
        </Container>
    )
}




    

