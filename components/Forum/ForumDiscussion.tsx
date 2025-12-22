'use client'

import { useCreateMessageMutation } from '@/features/message'
import { CustomInput, MiscMessage } from '@/layout'
import { useAppSelector } from '@/store'
import { type IForum, type IMessage } from '@/types'
import { Add } from '@mui/icons-material'
import { Box, Card, Typography, useTheme } from '@mui/material'
import { type FormEvent, type MouseEvent, useState, useEffect } from 'react'

export default function ForumDiscussion({ forum }: { forum: IForum }) {
  const theme = useTheme()
  const user = useAppSelector(state => state.auth.user)

  const [text, setText] = useState<string>('')
  const [comments, setComments] = useState<IMessage[]>([])
  const [createMessage, { isLoading }] = useCreateMessageMutation()

  useEffect(() => {
    if (forum?.comments) {
      setComments(forum.comments)
    }
  }, [forum?.comments])

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> & MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()
    if (!text.trim() || !forum?._id) return

    const newComment: IMessage = {
      content: text,
      sendedBy: user._id ?? '',
      sendedIn: forum._id,
      sendedAt: new Date().toISOString(),
      type: 'text'
    }

    const result = await createMessage(newComment)

    if ('data' in result) {
      setComments(prev => [...prev, result.data as IMessage])
    }
    setText('')
  }

  return (
    <Card
      variant="elevation"
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '18rem',
        width: '50%',
        fontSize: '10px',
        borderRadius: 2,
        gap: 7.5,
        p: 4,
        bgcolor: 'background.secondary',
        [theme.breakpoints.only('lg')]: {
          width: '60%'
        },
        [theme.breakpoints.only('md')]: {
          width: '60%'
        }
      }}
    >
      <Box onSubmit={handleSubmit} component="form" width="100%">
        <CustomInput
          icon={<Add />}
          placeholder="Escreva um comentário..."
          fullWidth
          multiline
          value={text}
          onChange={(e: any) => {
            setText(e.target.value)
          }}
          helperText={text.length + '/999'}
          disabled={isLoading}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={5}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <MiscMessage key={comment._id ?? index} text={comment.content} />
          ))
        ) : (
          <Typography color="text.secondary" textAlign="center">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </Typography>
        )}
      </Box>
    </Card>
  )
}
