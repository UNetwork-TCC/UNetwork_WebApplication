import { Box } from '@mui/material'
import { useContext, type ReactElement } from 'react'
import Message from './Message'
import { themeContext } from '$contexts'

export default function MessageWrapper(): ReactElement {

    const { theme, setTheme } = useContext(themeContext)

    return (
        <Box
            sx={{
                p: 2.5,
                width: '100%',
                height: '70%',
                display: 'flex',
                overflow: 'scroll',
                overflowX: 'hidden',
                gap: 1,
                alignItems: 'start',
                flexDirection: 'column',
                [theme.breakpoints.down('xl')]: {
                    fontSize:'1rem',
                    height:'70%'
                },

                [theme.breakpoints.down('lg')]: {
                    fontSize:'0.8rem',
                    height:'66%'                    
                    
                }
                // '::-webkit-scrollbar': { display: 'none' } /*Se NÂO quiser barra de rolamento, descomenta isso*/
                                
            }}
        >
            <Message 
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac feugiat dolor, vitae eleifend metus. Curabitur at orci ante. Maecenas.'
                messageFrom='him'
            />
            <Message 
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac feugiat dolor, vitae eleifend metus. Curabitur at orci ante. Maecenas.'
                messageFrom='me'
            />
            <Message 
                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac feugiat dolor, vitae eleifend metus. Curabitur at orci ante. Maecenas.'
                messageFrom='him'
            />
        </Box>
    )
}