import { IconButton, useMediaQuery, InputBase, Box, useTheme } from '@mui/material'
import { Send, ImageOutlined, EmojiEmotions } from '@mui/icons-material'
import EmojiPicker from 'emoji-picker-react'
import { type ReactElement, useState, type FormEvent, type MouseEvent } from 'react'
import { useCreateMessageMutation } from '$features/message'
import { useAppDispatch, useAppSelector } from '$store'
import { setMessages, useUpdateChatMutation } from '$features/chat'

export default function ChatBar({ chatId }: { chatId: string }): ReactElement {

    const theme = useTheme()
    const matches = useMediaQuery('(min-width: 600px)')

    const dispatch = useAppDispatch()

    const [ text, setText ] = useState('')

    const [ createMessage ] = useCreateMessageMutation()
    const [ updateChat ] = useUpdateChatMutation()

    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)

    const user = useAppSelector(state => state.auth.user)
    const messages = useAppSelector(state => state.chat.messages)
    
    // const [ sendMessage ]

    const onEmojiClick = ( emojiObject: any ):void => {
        setText(prevInput => prevInput + emojiObject.emoji)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> & MouseEvent<HTMLButtonElement>): void => {
        (async () => {
            e.preventDefault()
    
            if (!text) return

            dispatch(setMessages([
                ...messages,
                {
                    content: text,
                    sendedBy: user._id,
                    sendedIn: chatId,
                    sendedAt: new Date().getHours() + ':' + new Date().getMinutes(),
                    type: 'text'
                }
            ]))

            setText('')

            const { data }: any = await createMessage({
                content: text,
                sendedBy: user._id,
                sendedIn: chatId,
                sendedAt: new Date().getHours() + ':' + new Date().getMinutes(),
                type: 'text'
            })

            const a = await updateChat({
                _id: chatId,
                messages: [
                    data.newMessage
                ]
            })

            console.log(a)

        })()
    }

    return (
        <Box m={2} height='3.5rem' width='97%' sx={{
            [theme.breakpoints.only('lg')]: {
                height:'3rem'               
                    
            },
            [theme.breakpoints.only('md')]: {
                height:'2.5rem',
                width:'94%'
            }
        }}>
            <Box
                boxShadow={theme.shadows[3]}
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'background.card',
                    borderRadius: 3.5,
                    p: 0.5,
                    
                    height:'100%',
                    [theme.breakpoints.only('lg')]: {
                        borderRadius: 2.5,
                        p: 0
                    },
                    [theme.breakpoints.only('md')]: {
                        borderRadius: 2.5                   
                    }
                    
                }}
            >
                <InputBase
                    sx={{
                        flex: 1,
                        fontSize: '1rem',
                        ml: 2,
                        [theme.breakpoints.only('lg')]: {
                            ml: 1.7,
                            fontSize:'1.2rem'
                        },
                        [theme.breakpoints.only('md')]: {
                            ml:1.5,
                            fontSize:'1rem'
                        }
                    }}
                    placeholder={matches ? 'Digite sua mensagem...' : 'Digite'}
                    value={text}
                    onChange={e => { setText(e.target.value) }}
                />
                <Box mr={2}>
                    <input type='file' id='file' accept='image/*' style={{ display: 'none' }} />
                    <IconButton component='label' htmlFor='file'>
                        <ImageOutlined sx={{
                            [theme.breakpoints.only('lg')]: {
                                mr:0.5
                            },
                            [theme.breakpoints.only('md')]: {
                                fontSize:'1.3rem',
                                mr:0
                            }

                        }} />
                    </IconButton>
                    
                    <IconButton sx={{ mr: 1 }} type="button" aria-label="Emoji" onClick={() => { setShowEmojiPicker(val => !val) }} size='large'>
                        <EmojiEmotions sx={{
                            [theme.breakpoints.only('lg')]: {
                                mr: 0
                            },
                            [theme.breakpoints.only('md')]: {
                                fontSize:'1.3rem',
                                mr:0
                            }
                        }}/>
                    </IconButton>
                    <IconButton 
                        onClick={handleSubmit}
                        sx={{ bgcolor: 'primary.main', color: 'white', ':hover':{ bgcolor:'primary.main', opacity:'80%' } }} size='small'
                    >
                        <Send sx={{
                            [theme.breakpoints.only('lg')]: {
                                fontSize:'1.3rem', 
                                m:'0.1rem'
                            },
                            [theme.breakpoints.only('md')]: {
                                fontSize:'1rem', 
                                m:'0.1rem'
                            }

                        }}/>
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ position: 'absolute', bottom: '11%',
                [theme.breakpoints.only('lg')]:{
                    bottom:'20%'
                }
            }}  >
                {showEmojiPicker && (
                    <Box>
                        <Box sx={{ ml: '15.5%', width: '69%', mt: '7%', height: '75%', position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, zIndex: 2, 
                            [theme.breakpoints.only('lg')]: {
                                
                            },
                            [theme.breakpoints.only('md')]: {
                        
                            }    
                        }} 
                        onClick={() => { setShowEmojiPicker(false) }}></Box>
                        <Box sx={{ position: 'relative', zIndex: 3 }}>
                            <EmojiPicker onEmojiClick={onEmojiClick} autoFocusSearch={false} />
                        </Box>
                    </Box>)
                }
            </Box>
        </Box>
    )
}
