import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { Container, TextField } from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'

export default function Chat() {

    const [text, setText] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const onEmojiClick = (_event, emojiObject) => {
        console.log(emojiObject)
        setText(prevInput => prevInput + emojiObject.emoji)
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
                p 
                aria-label="Enviar">
                <AttachmentIcon fontSize='small'/>
            </IconButton>
            
            {showEmojiPicker && <EmojiPicker defaultSkinTone='' emojiStyle='twitter' onEmojiClick={onEmojiClick} />}
            
            <IconButton 
                size='small'
                color="primary" 
                p 
                aria-label="Enviar">
                    
                <AttachmentIcon fontSize='small'/>
            </IconButton>
                <TextField
                    sx={{ ml: 1, flex: 1 }}
                    value={text}
                    placeholder="Envie uma Mensagem"
                    onChange={e => setText(e.target.value)}
                />

            <IconButton 
                size='small' 
                color="primary" 
                p 
                aria-label="Enviar">

                <SendIcon fontSize='small'/>
            </IconButton>
        </Container>
    )
}




    

