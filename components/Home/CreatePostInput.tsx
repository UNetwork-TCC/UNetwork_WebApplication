'use client'

import { type ReactElement, type ChangeEvent, type FormEvent, useState } from 'react'
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Typography,
  Chip
} from '@mui/material'
import { Mic, Add, AttachFile, Close } from '@mui/icons-material'

interface CreatePostInputProps {
  onSubmit: (e: FormEvent) => Promise<void>
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  selectedFile?: { name: string } | null
  disabled?: boolean
}

export default function CreatePostInput({
  onSubmit,
  onTextChange,
  onFileChange,
  selectedFile,
  disabled = false
}: CreatePostInputProps): ReactElement {
  const [inputValue, setInputValue] = useState('')

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onTextChange(e)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onSubmit(e)
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5
      }}
    >
      {/* Mic Button */}
      <IconButton
        sx={{
          width: 48,
          height: 48,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: '0 4px 16px rgba(103, 58, 183, 0.25)',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'primary.dark',
            transform: 'scale(1.05)',
            boxShadow: '0 6px 20px rgba(103, 58, 183, 0.35)'
          }
        }}
      >
        <Mic />
      </IconButton>

      {/* Input Field */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <TextField
          fullWidth
          placeholder="No que estou pensando..."
          value={inputValue}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          multiline
          maxRows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 6,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              pr: 14,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'primary.light'
              },
              '&.Mui-focused': {
                borderColor: 'primary.main',
                boxShadow: '0 0 0 3px rgba(103, 58, 183, 0.1)'
              },
              '& fieldset': {
                border: 'none'
              }
            },
            '& .MuiInputBase-input': {
              py: 1.5,
              px: 2
            }
          }}
        />

        {/* Action Buttons inside input */}
        <Box
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          {/* File Input */}
          <input
            type="file"
            id="post-file-input"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          <IconButton
            component="label"
            htmlFor="post-file-input"
            size="small"
            sx={{
              color: selectedFile ? 'primary.main' : 'text.secondary',
              transition: 'all 0.2s',
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'primary.main',
                backgroundColor: 'rgba(103, 58, 183, 0.08)'
              }
            }}
          >
            <AttachFile fontSize="small" />
          </IconButton>

          {/* Submit Button */}
          <IconButton
            type="submit"
            disabled={disabled}
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: '0 2px 8px rgba(103, 58, 183, 0.25)',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.05)'
              },
              '&.Mui-disabled': {
                bgcolor: 'action.disabledBackground',
                color: 'action.disabled'
              }
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Selected File Indicator */}
      {selectedFile && (
        <Chip
          label={selectedFile.name}
          size="small"
          onDelete={() => {
            // Reset file input
            const fileInput = document.getElementById(
              'post-file-input'
            ) as HTMLInputElement
            if (fileInput) fileInput.value = ''
          }}
          sx={{
            position: 'absolute',
            bottom: -32,
            left: 64,
            maxWidth: 200,
            '& .MuiChip-label': {
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
        />
      )}
    </Box>
  )
}
