import { Folder as FolderIcon } from '@mui/icons-material'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { grey } from '@mui/material/colors'

function Folder({
    title,
    subtitle 
}: {
    title: string,
    subtitle: string
}) {
    if (title.length >= 9) {
        title = title.substring(13, 0) + '...'
    }

    return(
        <Box maxWidth={200} sx={{ bgcolor: grey[300] }} borderRadius={5} height={'4rem'} width={'12.5em'} display={'flex'} alignItems={'center'}>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar  sx={{ bgcolor: 'primary.main' }}>
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