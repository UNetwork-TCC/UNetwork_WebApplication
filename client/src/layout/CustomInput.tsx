import { themeContext } from '$contexts'
import { Avatar, Box, type SxProps, TextField } from '@mui/material'
import { useContext, type ReactElement } from 'react'

export default function CustomInput({ 
    inputWidth,
    width,
    icon,
    bgcolor,
    color,
    sx,
    value,
    defaultValue,
    placeholder,
    onChange,
    fullWidth,
    iconColor 
} : {
    inputWidth?: string | number,
    width?: string,
    icon?: React.ReactNode,
    bgcolor?: string,
    color?: string,
    sx?: SxProps,
    value?: string,
    defaultValue?: string,
    placeholder?: string,
    onChange?: any,
    fullWidth?: boolean,
    iconColor?: string
}) : ReactElement {
    const { theme } = useContext(themeContext)

    return (
        <Box width={ width ? `calc(${width} + 2.75rem)` : 'calc(100% + 2rem)'} display='flex' justifyContent='center'>
            <TextField
                placeholder={placeholder}
                variant="outlined"
                fullWidth={fullWidth}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                sx={{ 
                    bgcolor: bgcolor ?? (theme.palette.mode === 'light' ? 'grey.100' : 'background.paper'), 
                    width: inputWidth ?? '100%',
                    height: '3.5rem',
                    [theme.breakpoints.down('xl')]: {
                        height: '4rem'
                    },
                    borderRadius: '15px',
                    '& .MuiOutlinedInput-root': {
                        '& > fieldset': {
                            border: 'none'
                        }
                    },

                    ...sx
                }}
            />
            <Avatar  variant="rounded" sx={{ 
                position: 'relative',
                right: '3.5rem',
                top: '0.5rem',
                p: 2.5,
                [theme.breakpoints.down('xl')]: {
                    right: '3.75rem',
                    top: '0.45rem',
                    p: 2.2
                },
                height: '2rem',
                width: '2rem',
                borderRadius: '15px',
                backgroundColor: color ?? (theme.palette.mode === 'light' ? '#fafafa' : 'primary.dark'),
                color: iconColor ?? 'text.primary',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                transition: '.3s ease-in-out',
                ':hover':{
                    backgroundColor: color === 'primary.main' ? 'primary.light' : 'primary.main',
                    color: 'white'
                }
            }}>
                {icon}
            </Avatar>
        </Box>
    )
}
