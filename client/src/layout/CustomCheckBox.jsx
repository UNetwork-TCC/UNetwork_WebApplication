import { Label } from '@mui/icons-material'
import { Box, Checkbox, FormControl, FormHelperText, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function CustomCheckBox({ caption, title, checked, onClick }) {
    return (
        <FormControl component='label' htmlFor={title} label={title} sx={{ bgcolor: grey[100], m: 0, p: 1, mb: 1 }}>
            <Box display='flex' alignItems='center'> 
                <Checkbox onClick={onClick} checked={checked} id={title}>{title}</Checkbox>
                <Typography>{title}</Typography>
            </Box>
            <FormHelperText sx={{ mt: -1, ml: '3rem' }}>{caption}</FormHelperText>
        </FormControl>
    )
}