import { Avatar, Box, Divider, IconButton, MenuItem, Typography } from '@mui/material'
import { ChatBar, ChatArea, ContactsArea, MessageWrapper } from '$components'
import { AppLayout, CustomMenu } from '$layout'
import { Search, VideocamOutlined, LocalPhone, Settings, AccountBox, FmdGood, Block, Delete, Report } from '@mui/icons-material'
import { type ReactElement, useState } from 'react'

export default function ChatPage(): ReactElement {
    const onClickEvents = {
        item1: () => {
            console.log('oi')
            handleClose()
        },

        item2: () => {
            console.log('tcchau')
            handleClose()
        },

        item4: () => {
            handleClose()
        }
    }

    const [ open, setOpen ] = useState(false)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<React.ReactNode>(null)

    const openCustonMenu = Boolean(anchorEl)

    const handleClick = (
        e: any,
        elements: string[],
        onClickEventListeners = elements.map(() => handleClose),
        icons: React.ReactNode[] = []
    ): void => {
        const mapedElements = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons && icons[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleCloseCustonMenu = (): void => {
        setAnchorEl(null)
    }

    return (
        <AppLayout>
            <Box sx={{ width: '100%', height: '100%', display: 'flex' }} >
                <ContactsArea />
                <Divider orientation='vertical' role='presentation' flexItem sx={{ height: '100%' }} />
                <ChatArea>
                    <Box sx={{ width: '100%', height: '11%', display: 'flex', alignItems: 'center', p: '0 3%', pb: '4%' }}>
                        <Avatar variant='rounded' sx={{ borderRadius: 5, height: '3.5rem', width: '3.5rem' }} />
                        <Box sx={{ width: '75%', maxWidth: '75%' }}>
                            <Typography noWrap sx={{ fontSize: '1.5rem', ml: '2%' }} >Username</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '25%' }} gap={3}>
                            <IconButton sx={{}}>
                                <VideocamOutlined sx={{ fontSize: '2.25rem', color: 'gray' }} />
                            </IconButton>
                            <IconButton sx={{}}>
                                <LocalPhone sx={{ fontSize: '1.75rem', color: 'gray' }} />
                            </IconButton>
                            <IconButton sx={{}}
                                onClick={
                                    e => {
                                        handleClick(e,
                                            [ 'Ver Contato', 'Pesquisar', 'Fixar', 'Limpar conversa', 'Denunciar', 'Bloquear' ],
                                            [ onClickEvents.item1, onClickEvents.item2, () => { }, onClickEvents.item4 ],
                                            [ 
                                                <AccountBox key={null} />,
                                                <Search key={null} />,
                                                <FmdGood key={null} />,
                                                <Delete key={null} />,
                                                <Report key={null} />,
                                                <Block key={null} />
                                            ]
                                        )
                                    }
                                }
                            >
                                <Settings sx={{ fontSize: '2rem', color: 'gray' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider flexItem />
                    {/* MessageWrapper */}
                    <MessageWrapper />
                    {/* end */}
                    <Divider flexItem sx={{}} />
                    <ChatBar />
                    <CustomMenu
                        anchorEl={anchorEl}
                        open={openCustonMenu}
                        onClose={handleCloseCustonMenu}
                    >
                        {menuContent}
                    </CustomMenu>
                </ChatArea>
            </Box>
        </AppLayout>
    )
}
