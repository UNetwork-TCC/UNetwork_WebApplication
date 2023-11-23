import { Box, IconButton, MenuItem, Paper, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { CustomMenu } from '$layout'
import { type ReactElement, useState } from 'react'

export default function FolderMaterials({ folderName } : { folderName: string }): ReactElement {

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
    const [ menuContent, setMenuContent ] = useState<React.ReactNode[]>([])

    const open = Boolean(anchorEl)

    const handleClick = (e: any, elements: string[], onClickEventListeners = elements.map(() => handleClose), icons: ReactElement[] = []): void => {
        const mapedElements: React.ReactNode[] = elements.map((el, i) =>
            <MenuItem onClick={onClickEventListeners[i]} key={i} disableRipple>{icons?.[i]}{el}</MenuItem>
        )

        setMenuContent(mapedElements)

        setAnchorEl(e.currentTarget)
    }

    const handleClose = (): void => { setAnchorEl(null) }

    return (
        <>
            <Paper elevation={6} sx={{
                margin: '0 0 0 0px', display: 'flex', flexDirection: 'column', bgcolor: 'white', width: '15rem', height: '12rem',
                borderRadius: '.6vh'
            }}>
                <Box 
                    onClick={
                        e => { handleClick(e, 
                            [ 'Baixar', 'Compartilhar', 'Favoritar', 'Renomear', 'Arquivar', 'Excluir' ],
                            [ onClickEvents.item1, onClickEvents.item2 ]
                            
                        ) }
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
                <Box sx={{ height:'40%', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'80%', textAlign:'center', justifyContent:'center', ml:'10%' }}>
                    <Typography sx={{ fontSize: '1.3em', textTransform: 'uppercase', fontWeight: 'bold', color: 'black' }} >{folderName}</Typography>
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
