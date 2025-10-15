import {
  Avatar,
  Box,
  type SxProps,
  TextField,
  type InputProps,
  type TextFieldProps,
  useTheme
} from '@mui/material'
import { type ReactElement } from 'react'

export default function CustomInput({
  inputWidth,
  width,
  icon,
  bgcolor,
  color,
  sx,
  type,
  value,
  defaultValue,
  placeholder,
  onChange,
  fullWidth,
  iconColor,
  multiline,
  helperText,
  ...props
}: {
  inputWidth?: string | number
  width?: string
  icon?: React.ReactNode
  bgcolor?: string
  color?: string
  sx?: SxProps
  type?: InputProps['type']
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  fullWidth?: boolean
  iconColor?: string
  multiline?: boolean
  helperText?: string
  props?: TextFieldProps
}): ReactElement {
  const theme = useTheme()

  return (
    <Box
      width={width ?? '100%'}
      display="flex"
      alignItems="center"
      position="relative"
      sx={{ ...sx, borderRadius: '15px' }}
    >
      <TextField
        type={type}
        placeholder={placeholder}
        variant="outlined"
        fullWidth={fullWidth ?? true}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        multiline={multiline}
        helperText={helperText}
        {...props}
        sx={{
          bgcolor:
            bgcolor ??
            (theme.palette.mode === 'light' ? 'grey.100' : 'background.paper'),
          width: inputWidth ?? '100%',
          borderRadius: '15px',
          '& .MuiOutlinedInput-root': {
            paddingRight: '3.5rem',
            minHeight: { xs: '3rem', sm: '3.25rem', md: '3.5rem' },
            '& > fieldset': {
              border: 'none'
            }
          }
        }}
      />
      <Avatar
        component="button"
        type="submit"
        variant="rounded"
        sx={{
          position: 'absolute',
          right: { xs: '0.5rem', sm: '0.625rem', md: '0.75rem' },
          height: { xs: '2rem', sm: '2.125rem', md: '2.25rem', lg: '2.5rem' },
          width: { xs: '2rem', sm: '2.125rem', md: '2.25rem', lg: '2.5rem' },
          borderRadius: '15px',
          backgroundColor:
            color ??
            (theme.palette.mode === 'light' ? '#fafafa' : 'primary.dark'),
          color: iconColor ?? 'text.primary',
          border: '1px solid rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          transition: '.3s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ':hover': {
            backgroundColor:
              color === 'primary.main' ? 'primary.light' : 'primary.main',
            color: 'white'
          },
          '& svg': {
            fontSize: { xs: '1.25rem', sm: '1.375rem', md: '1.5rem' }
          }
        }}
      >
        {icon}
      </Avatar>
    </Box>
  )
}
