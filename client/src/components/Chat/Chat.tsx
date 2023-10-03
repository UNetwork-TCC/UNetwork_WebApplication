import { Avatar, Box, MenuItem, Paper, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState } from 'react'
import { CustomMenu } from '$layout'
import { Groups } from '@mui/icons-material'
import React from 'react'


export default function Classes({ chatClass } : { chatClass: { name: string, picture?: string } }) {

    const initials = chatClass.name.split(' ')

    let lettersInitial1 = ''
    let lettersInitial2 = ''
    let lettersInitials = ''
 
    if (initials.length > 1) {
        lettersInitial1 = initials[0].charAt(0).toUpperCase()
        lettersInitial2 = initials[initials.length - 1].charAt(0).toUpperCase()
        lettersInitials = lettersInitial1 + lettersInitial2
    }

    const onClickEvents = {
        item1: () => {
            console.log('oi')
            handleClose()
        },

        item2: () => {
            console.log('tchau')
            handleClose()
        }
    }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode[]>([])

    const open = Boolean(anchorEl)

    const handleClick = (e: any, elements: string[], onClickEvents = elements.map(() => handleClose), icons: React.ReactNode[] = []) => {
        const mapedElements = elements.map((e, i) =>
            <MenuItem onClick={onClickEvents[i]} key={i} disableRipple>{icons && icons[i]}{e}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <>
            <Paper elevation={6}  sx={{
                margin: '0 0 0 0px', display: 'flex', flexDirection: 'column', bgcolor: 'white', width: '18em', height: '15em',
                borderRadius: '.6vh', alignItems:'center'
            // boxShadow:'5px 5px rgba(0,0,0,0.2)' /*Vitão, comenta esse boxShadow e vê se fica melhor na sua opiniao. Eu não consigo decidir a melhor, se é com bax-shadow, ou com elevation*/ 
            }}>
                <Box sx={{ width: '90%', height: '20%',  }}
                    onClick={
                        e => handleClick(e, 
                            [ 'Exibir membros', 'Gerenciar equipe', 'Adicionar membros', 'Ocultar', ],
                            [ onClickEvents.item1, onClickEvents.item2 ],
                            [ <Groups key={1}/> ]
                    
                        )
                    }
                >
                    <MoreHorizIcon sx={{ cursor: 'pointer', m: '0.5em 0', float: 'right', fontSize: '1.8em', ':hover': { color: 'text.secondary' } }} />
                </Box>  
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '30%', mb: '3%' }}>
                    <Avatar variant='square' sx={{ borderRadius: 2, height: '4.5rem', width: '4.5rem' }}>
                        {chatClass.picture ?
                            <img src={chatClass.picture} alt="Picture" />
                            :
                            initials.length == 1 ?
                                chatClass.name.charAt(0).toUpperCase()
                                :
                                lettersInitials
                        }
                    </Avatar>
                </Box>
                <Box sx={{ height:'40%', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'80%', textAlign:'center', justifyContent:'center' }}>
                    <Typography sx={{ fontSize: '1.3em', textTransform: 'uppercase', fontWeight: 'bold', color: 'black' }} >{chatClass.name}</Typography>
                </Box>
            </Paper>

            <CustomMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {menuContent}
            </CustomMenu>
        </>
    )
}
