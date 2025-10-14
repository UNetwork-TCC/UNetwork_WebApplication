import { Typography, useTheme } from '@mui/material'
import { useStyles } from '../styles'
import { type ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function CustomLink({ name, to } : { name: string, to: string }): ReactElement {
    const theme = useTheme()
    const classes = useStyles(theme)

    return (
        <Link to={to} className={classes.headerLinks}>
            <Typography>{name}</Typography>
        </Link>
    )
}
