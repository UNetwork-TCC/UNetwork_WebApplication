/* eslint-disable linebreak-style */
import { FilterList } from '@mui/icons-material'
import { Box, IconButton, MenuItem, Stack } from '@mui/material'
import { CustomMenu } from '$layout'
import React, { useState } from 'react'
export default function FilterAndConfig({ text, handleOpen }: { text: string, handleOpen: any }) {
    
    const onClickEvents = {
        item1: () => {
            console.log('oi')
            handleClose()
        },

        item2: () => {
            console.log('tcchau')
            handleClose()
        }
    }

    const [ anchorEl, setAnchorEl ] = useState<React.ReactNode>(null)
    const [ menuContent, setMenuContent ] = useState<Array<{}>>([])

    const open = Boolean(anchorEl)

    const handleClick = (e: React.ReactNode | any, elements: Array<any>, onClickEvents = elements.map(() => handleClose), icons = null) => {
        const mapedElements = elements.map((e: any, i: number) =>
            <MenuItem onClick={onClickEvents[i]} key={i} disableRipple>{icons && icons[i]}{e}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <Stack sx={{ display:'flex', flexDirection:'row' }} gap={3}>
                <IconButton
                    onClick={
                        e => handleClick(e, 
                            [ 'Ordem A-Z', 'Ordem Z-A', 'Recentes', 'Antigas' ],
                            [ onClickEvents.item1, onClickEvents.item2 ],
                        
                        )
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
