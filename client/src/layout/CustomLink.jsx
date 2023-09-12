import { Box, Typography } from '@mui/material'
import { useStyles } from '../styles/'
import { useContext } from 'react'
import { themeContext } from '../contexts/themeContext'
import { Link } from 'react-router-dom'

export default function CustomLink({ name, to }) {
    const { theme } = useContext(themeContext)
    const classes = useStyles(theme)

    return (
        <Link to={to} className={classes.headerLinks}>
            <Typography>{name}</Typography>
        </Link>
    )
}
