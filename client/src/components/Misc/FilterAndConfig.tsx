/* eslint-disable linebreak-style */
import { FilterList } from '@mui/icons-material'
import { Box, IconButton, MenuItem, Stack } from '@mui/material'
import { CustomMenu } from '$layout'
import { type ReactElement, useState } from 'react'
export default function FilterAndConfig({ text, handleOpen }: { text: string, handleOpen: () => void }): ReactElement {
    
    const onClickEvents = {
        item1: () => {    
            handleClose()
        },

        item2: () => {
            console.log('tcchau')
            handleClose()
        }
    }

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState<ReactElement[]>([])

    const open = Boolean(anchorEl)

    const handleClick = (e: any, elements: string[], onClickEventListeners = elements.map(() => handleClose), icons: ReactElement[] = []): void => {
        const mapedElements = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons?.[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleClose = (): void => { setAnchorEl(null) }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Stack sx={{ display:'flex', flexDirection:'row' }} gap={3}>
                <IconButton
                    onClick={
                        e => { handleClick(e, 
                            [ 'Ordem A-Z', 'Ordem Z-A', 'Recentes', 'Antigas' ],
                            [ onClickEvents.item1, onClickEvents.item2 ]
                        
                        ) }
                    }
                >
                    <FilterList sx={{ cursor: 'pointer', fontSize: '2rem' ,':hover': { color: 'text.secondary' } }} />
                </IconButton>
                
            </Stack>
            <Box sx={{ 
                height: '75%',
                bgcolor: '#673AB7',
                fontSize: '1rem',
                borderRadius: '3.1vh',
                color: 'white',
                padding: '0.3em 1em',
                ml: '2em',
                ':hover': {
                    cursor: 'pointer',
                    bgcolor: '#673AB7',
                    opacity: '0.85' 
                } 
            }} onClick={handleOpen}>{text}</Box>
            <CustomMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {menuContent}
            </CustomMenu>
        </Box>

    )
}
