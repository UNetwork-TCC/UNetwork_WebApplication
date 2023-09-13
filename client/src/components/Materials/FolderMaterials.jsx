import { Box, Button, IconButton, Link, MenuItem, Paper, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { CustomMenu } from '../../layout'
import { useState } from 'react'

export default function FolderMaterials({ FolderName, id }) {

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

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [ menuContent, setMenuContent ] = useState(null)

    const open = Boolean(anchorEl)

    const handleClick = (e, elements, onClickEvents = elements.map(() => handleClose), icons = null) => {
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
            <Paper elevation={6} sx={{
                margin: '0 0 0 0px', display: 'flex', flexDirection: 'column', bgcolor: 'white', width: '18em', height: '15em',
                borderRadius: '.6vh',
            }}>
                <Box 
                    onClick={
                        e => handleClick(e, 
                            [ 'Baixar', 'Compartilhar', 'Favoritar', 'Renomear', 'Arquivar', 'Excluir' ],
                            [ onClickEvents.item1, onClickEvents.item2 ],
                            
                        )
                    }
                    display='flex' 
                    height='3rem' 
                    justifyContent='end'
                >
                    <IconButton>
                        <MoreHorizIcon sx={{ cursor: 'pointer', m: '0.5em 0', float: 'right', fontSize: '1.2em', ':hover': { color: 'text.secondary' } }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '30%', mb: '7%' }}>
                    <Box sx={{ bgcolor: 'gray', width: '25%', height: '100%' }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Typography sx={{ fontSize: '1.2em', textTransform: 'uppercase', fontWeight: 'bold', color: 'black' }}>{FolderName}</Typography>
                    <Link href={`#${id}`} >
                        <Button sx={{ color: 'black', textTransform: 'uppercase', fontSize: '1em', border: '1px solid #673AB7', borderRadius: '30px', padding: '0 7px', mt: '10%', ':hover': { color: 'white', bgcolor: '#673AB7' } }}>Ver Arquivos</Button>
                    </Link>

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
