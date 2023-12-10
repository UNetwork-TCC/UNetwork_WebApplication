import { Folder as FolderIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { grey } from '@mui/material/colors'
import { type ReactElement } from 'react'

function Folder({
    title,
    subtitle 
}: {
    title: string,
    subtitle: string
}) : ReactElement {
    if (title.length >= 9) {
        title = title.substring(13, 0) + '...'
    }
    const theme = useTheme()
    return(
        <Box maxWidth={215} sx={{ bgcolor: grey[300], [theme.breakpoints.down('xl')]: { borderRadius:4, height:'5rem' } ,
            [theme.breakpoints.down('lg')]: { borderRadius:3 } }} 
        borderRadius={5} height={'4rem'} width={'15em'} display={'flex'} alignItems={'center'}>
            <List>
                <ListItem>
                    <ListItemAvatar sx={{ [theme.breakpoints.down('lg')]: { minWidth:'4rem' } }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width:'3rem', height:'3rem' }}>
                            <FolderIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={title}
                        secondary={subtitle}
                    />
                </ListItem>
            </List>
        </Box>
    )
}
export default Folder