import { Avatar, Box, TextField } from '@mui/material'

export default function CustomInput({ inputWidth, width, icon, bgcolor, color, sx, value, defaultValue, placeholder, onChange, fullWidth, iconColor }) {
    return (
        <Box width={ width ? `calc(${width} + 2.75rem)` : 'calc(100% + 2rem)'} display='flex' justifyContent='center'>
            <TextField
                width={inputWidth}
                placeholder={placeholder}
                variant="outlined"
                fullWidth={fullWidth}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                sx={{ 
                    backgroundColor: bgcolor, 
                    width: '100%',
                    height: '3.5rem',
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
                fontSize: '0.75rem',
                height: '2rem',
                width: '2rem',
                borderRadius: '15px',
                backgroundColor: color,
                color: iconColor || 'text.primary',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                p: 2.5,
                cursor: 'pointer',
                transition: '.3s ease-in-out',
                ':hover':{
                    backgroundColor: color === 'primary.main' ? 'primary.light' : 'primary.main',
                    color: 'white',
                }
            }}>
                {icon}
            </Avatar>
        </Box>
    )
}
