import { Folder as FolderIcon } from '@mui/icons-material'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { grey } from '@mui/material/colors'

function Folder() {
    return(
        <Box sx={{ bgcolor: grey[300] }} borderRadius={5} height={'4rem'} display={'flex'} alignItems={'center'}>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar  sx={{ bgcolor: 'primary.main' }}>
                            <FolderIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Single-line item"
                        secondary='Secondary text'
                    />
                </ListItem>
            </List>
        </Box>
    )
}
export default Folder