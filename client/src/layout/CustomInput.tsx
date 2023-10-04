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
                    backgroundColor: bgcolor ?? (theme.palette.mode === 'light' ? 'grey.100' : 'grey.800'), 
                    width: inputWidth ?? '100%',
                    height: {
                        lg: '4rem',
                        xl: '3.5rem'
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
                right: {
                    lg: '3.75rem',
                    xl: '3.5rem'
                },
                top: {
                    lg: '0.45rem',
                    xl: '0.5rem'
                },
                height: '2rem',
                width: '2rem',
                borderRadius: '15px',
                backgroundColor: color ?? (theme.palette.mode === 'light' ? '#fafafa' : 'primary.dark'),
                color: iconColor ?? 'text.primary',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                p: {
                    lg: 2.2,
                    xl: 2.5
                },
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
