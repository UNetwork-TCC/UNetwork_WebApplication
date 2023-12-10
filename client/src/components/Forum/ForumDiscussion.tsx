import { CustomInput, MiscMessage } from '$layout'
import { type Forum } from '$types'
import { Add, SubdirectoryArrowRight } from '@mui/icons-material'
import { Box, Card, useTheme } from '@mui/material'
import { type FormEvent, type MouseEvent, useState } from 'react'

export default function ForumDiscussion({
    forum
}: {
    forum: Forum
}) {
    const theme = useTheme()

    const [ text, setText ] = useState<string>('')

    const handleSubmit = (e: FormEvent<HTMLFormElement> & MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        console.log(text)
        setText('')
    }

    return (
        <Card variant="elevation" elevation={2} sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '18rem',
            width: '50%',
            fontSize: '10px',
            borderRadius: 2,
            gap: 7.5,
            p: 4,
            bgcolor: 'background.secondary',
            [theme.breakpoints.down('xl')]: {
                width: '60%'
            }
        }}>
            <Box onSubmit={handleSubmit} component='form' width='100%'>
                <CustomInput 
                    icon={<Add  />}
                    placeholder='Escreva uma publicação...'
                    fullWidth
                    multiline
                    value={text}
                    onChange={(e: any) => { setText(e.target.value) }}
                    helperText={text.length + '/999'}
                />
            </Box>
            <Box display='flex' flexDirection='column' gap={5}>
                <MiscMessage
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quo odio esse unde tenetur necessitatibus est exercitationem consectetur. Repellat beatae tenetur quae eveniet magnam a natus veniam at tempore? Odit!"
                />
                <MiscMessage
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quo odio esse unde tenetur necessitatibus est exercitationem consectetur. Repellat beatae tenetur quae eveniet magnam a natus veniam at tempore? Odit!"
                />
                <MiscMessage 
                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quo odio esse unde tenetur necessitatibus est exercitationem consectetur. Repellat beatae tenetur quae eveniet magnam a natus veniam at tempore? Odit!"
                    replying
                />
            </Box>
        </Card>
    )
}