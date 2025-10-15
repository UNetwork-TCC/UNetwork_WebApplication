'use client';

import { Typography, useTheme } from '@mui/material'
import { useStyles } from '../styles'
import { type ReactElement } from 'react'
import Link from 'next/link'

export default function CustomLink({ name, to } : { name: string, to: string }): ReactElement {
    const theme = useTheme()
    const classes = useStyles(theme)

    return (
        <Link href={to} className={classes.headerLinks}>
            <Typography>{name}</Typography>
        </Link>
    )
}
