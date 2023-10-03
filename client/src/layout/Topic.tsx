import { Circle } from '@mui/icons-material'
import { Box, SxProps, Typography } from '@mui/material'

export default function Topic({ 
    title,
    text,
    boxStyle,
    titleStyle,
    textStyle,
    fontSize,
    circleStyle 
} : {
    title: string,
    text: string,
    boxStyle?: SxProps,
    titleStyle?: SxProps,
    textStyle?: SxProps,
    fontSize?: number | string,
    circleStyle?: SxProps
}) {
    return (
        <Box sx={boxStyle}>
            <Typography sx={{ fontSize, ...titleStyle }} mb={2} variant='h5' fontWeight={900} color='secondary.main'><Circle sx={{ mb: '-3px', mr: '5px', ...circleStyle }}/> {title}</Typography>
            <Typography sx={{ fontSize, ...textStyle }} variant='h6' color='text.secondary'>{text}</Typography>
        </Box>
    )
}