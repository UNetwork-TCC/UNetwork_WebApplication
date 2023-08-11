import { Box, Typography } from '@mui/material'
import { useStyles } from '../styles/'
import { useContext } from 'react'
import { themeContext } from '../contexts/themeContext'

export default function CustomLink({ name }) {
    const { theme } = useContext(themeContext)
    const classes = useStyles(theme)

    return (
        <Box className={classes.headerLinks}>
            <Typography>{name}</Typography>
        </Box>
    )
}
