import { Box, Button, Modal, TextField } from '@mui/material'
import { useState } from 'react'
import FormModal from './FormModal'
import { Shortcut } from '$components'
import { useTheme } from '@mui/material'
import LoadingBackdrop from './LoadingBackdrop'
import { useUpdateUserMutation } from '$features/user'
import { useAppDispatch, useAppSelector } from '$store'

import { 
    amber,
    blue,
    blueGrey,
    cyan,
    deepOrange,
    deepPurple,
    green,
    indigo,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
    lightBlue,
    lightGreen,
    grey 
} from '@mui/material/colors'
import { setCredentials } from '$features/auth'

export default function CreateShortcutsModal({
    open,
    onClose,
    link,
    category
}: {
    open: boolean,
    onClose: () => void,
    link: string,
    category: 'Post' | 'Classe' | 'Chat' | 'Perfil' | 'Notícia' | 'Material' | 'Fórum'
}) {
    const theme = useTheme()

    const [ color, setColor ] = useState<string>(grey[500])
    const [ shortcutName, setShortcutName ] = useState<string>('Atalho')

    const [ loading, setLoading ] = useState<boolean>(false)

    const [ updateUser ] = useUpdateUserMutation()

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.user)

    const onConfirm = () => {
        (async () => {
            onClose()
            setLoading(true)

            await updateUser({
                _id: user._id,
                otherInfo: {
                    ...user?.otherInfo,
                    shortcuts: [
                        ...user?.otherInfo?.shortcuts ?? [],
                        {
                            title: shortcutName,
                            category,
                            color,
                            link
                        }
                    ]
                }
            })

            dispatch(setCredentials({ user: {
                ...user,
                otherInfo: {
                    ...user?.otherInfo,
                    shortcuts: [
                        ...user?.otherInfo?.shortcuts ?? [],
                        {
                            title: shortcutName,
                            category,
                            color,
                            link
                        }
                    ]
                }
            } }))

            setLoading(false)
        })()
    }

    function ColorPalette({ color }: { color: string }) {
        return (
            <Box
                onClick={() => { setColor(color) }}
                sx={{
                    height: '2rem',
                    width: '2rem',
                    cursor: 'pointer',
                    bgcolor: color,
                    borderRadius: 1
                }}
            />
        )
    }

    return (
        <>
            <FormModal
                open={open}
                onClose={onClose}
                title='Criar Atalho'
            >
                <Box gap={2} display='flex' flexDirection='column'>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Box 
                            width='30%' 
                            display='flex'
                            justifyContent='center'
                            alignItems='center' 
                            flexDirection='column'
                            border={`1px solid ${theme.palette.divider}`} 
                            borderRadius={2}
                            pt={2}
                            gap={.5}
                        >
                            <Shortcut
                                category={category ?? 'Teste'}
                                color={color}
                                title={shortcutName}
                                link={link}
                            />
                        </Box>
                    </Box>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Box 
                            display='flex' 
                            flexDirection='column'
                            border={`1px solid ${theme.palette.divider}`} 
                            borderRadius={2} 
                            p={2}
                            gap={.5}
                        >
                            <Box display='flex' gap={.5}>
                                <ColorPalette color={pink[500]} />
                                <ColorPalette color={red[500]} />
                                <ColorPalette color={deepOrange[500]} />
                                <ColorPalette color={orange[500]} />
                                <ColorPalette color={amber[500]} />
                                <ColorPalette color={yellow[500]} />

                            </Box>
                            <Box display='flex' gap={.5}>
                                <ColorPalette color={lime[400]} />
                                <ColorPalette color={lightGreen[500]} />
                                <ColorPalette color={green[500]} />
                                <ColorPalette color={teal[500]} />
                                <ColorPalette color={cyan[500]} />
                                <ColorPalette color={lightBlue[500]} />
                            </Box>
                            <Box display='flex' gap={.5}>
                                <ColorPalette color={blue[500]} />
                                <ColorPalette color={indigo[500]} />
                                <ColorPalette color={deepPurple[500]} />
                                <ColorPalette color={purple[500]} />
                                <ColorPalette color={blueGrey[500]} />
                                <ColorPalette color={grey[500]} />
                            </Box>
                        </Box>
                    </Box>
                    <Box pt={2}>
                        <TextField
                            onChange={e => { setShortcutName(e.currentTarget.value) }}
                            value={shortcutName}
                            fullWidth
                            helperText={shortcutName.length + '/15'}
                            label='Nome do atalho'
                            placeholder='Nome do atalho'
                            inputProps={{ maxLength: 15 }}
                        />
                    </Box>
                    <Box display='flex' gap={2}>
                        <Button onClick={onConfirm} variant='outlined'>Confirmar</Button>
                        <Button onClick={onClose} variant='contained'>Cancelar</Button>
                    </Box>
                </Box>
            </FormModal>
            <LoadingBackdrop 
                open={loading}
            />
        </>
    )
}