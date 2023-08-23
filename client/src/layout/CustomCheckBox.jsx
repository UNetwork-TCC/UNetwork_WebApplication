import { Label } from '@mui/icons-material'
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export default function CustomCheckBox({ caption, title }) {
    return (
        <FormControl label={title} sx={{ bgcolor: grey[100], m: 0, p: 1, mb: 1 }}>
            <Box display='flex' alignItems='center'> 
                <Checkbox>{title}</Checkbox>
                <Typography>{title}</Typography>
            </Box>
            <FormHelperText sx={{ mt: -1, ml: 5.5 }}>{caption}</FormHelperText>
        </FormControl>
    )
}