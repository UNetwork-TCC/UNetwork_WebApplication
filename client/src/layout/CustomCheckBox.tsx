import { Box, Checkbox, FormControl, FormHelperText, Typography, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import { type ReactElement } from 'react'

// declare FormControl {
//     new (props: any): FormControl
// }

export default function CustomCheckBox({ 
    caption,
    title,
    checked,
    onClick
} : {
    caption: string,
    title: string,
    checked: boolean,
    onClick: () => void
}): ReactElement {
    const Form: any = FormControl
    const CheckBox: any = Checkbox

    const theme = useTheme()

    return (
        <Form
            component='label' 
            htmlFor={title} 
            label={title} 
            sx={{ bgcolor: theme.palette.mode === 'light' ? grey[100] : 'background.card', m: 0, p: 1, mb: 1 }}
        >
            <Box display='flex' alignItems='center'> 
                <CheckBox onClick={onClick} checked={checked} id={title}>{title}</CheckBox>
                <Typography>{title}</Typography>
            </Box>
            <FormHelperText sx={{ mt: -1, ml: '3rem' }}>{caption}</FormHelperText>
        </Form>
    )
}