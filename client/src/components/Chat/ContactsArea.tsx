import { CustomInput } from '$layout'
import { Add, Search, Settings } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState, type ReactElement, useEffect } from 'react'
import { Contact } from '$components'
import { type User, type Chat, type contact } from '$types'
import { useFetchUsersMutation } from '$features/user'
import { ContactSkeleton } from '$skeletons'

export default function ContactsArea({ chats, userId }: { chats: Chat[], userId: string }): ReactElement {
    const theme = useTheme()

    const [ fetchUsers, { isLoading, data: users } ] = useFetchUsersMutation()

    const usersChat = chats
        .map(chat => chat.users)
        .map(arr => arr.filter(id => id !== userId))
        .join()
        .split(',')

    const [ Contacts, setContacts ] = useState<contact[]>([])
    const [ ContactsAttributes, setContactsAttributes ] = useState<contact>({ name: '', code: '', date: '', notification: '' })

    const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ open, setOpen ] = useState(false)

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const createContacts = (): void => {
        // ...

        if (ContactsAttributes.name) {
            setContacts([
                ...Contacts,
                ContactsAttributes
            ])
            handleClose()
        }
        else alert('preencha todos os campos!')
    }

    useEffect(() => {
        (async () => {    
            await fetchUsers(null)
        })()
    }, [ fetchUsers ])

    return (
        <>
            <Box
                display='flex'
                height='96%'
                position='sticky'
                alignItems='start'
                maxHeight='99%'
                width='25%'
                pt={4.5}
                sx={{
                    boxSizing: 'border-box',
                    [theme.breakpoints.only('md')]: { pt:2.5 }
                }}>
                <Box sx={{ width: '100%', height: '100%' }} >
                    <Box sx={{ width: '100%', height: '12.5%' }}>
                        <Stack gap={2} sx={{ position: 'sticky', top: '0' }}>
                            <Box display={'flex'} sx={{ alignItems: 'center', ml: '5%' }}>
                                <Box sx={{ width: '70%', [theme.breakpoints.only('md')]: { ml:'5%', width:'63%' } }}>
                                    <Typography variant='h4' sx={{}}>Conversas</Typography>
                                </Box>
                                <Box sx={{ width: '25%', display: 'flex', justifyContent: 'space-between' }}>
                                    <IconButton onClick={handleOpen}>
                                        <Add />
                                    </IconButton>
                                    <IconButton>
                                        <Settings />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{}}>
                                <CustomInput
                                    width='95%'
                                    bgcolor={theme.palette.mode === 'light' ? 'white' : undefined}
                                    color='#673AB7'
                                    iconColor={'white'}
                                    placeholder='Procurar...'
                                    icon={<Search />}
                                    sx={{ ml: '5%' }}
                                />
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{
                        width: '100%', height: '87%',
                        overflow: 'scroll',
                        '::-webkit-scrollbar': { display: 'none' }
                    }}>
                        <Stack gap={1} sx={{ mt: '2%', width: '100%', height: '100%', [theme.breakpoints.only('md')]: { mt:'6%' } }}>
                            {!isLoading ? (() => {

                                const usersToChat = usersChat
                                    .map(
                                        id => users?.filter(
                                            (user: any) => user._id === id
                                        )[0]
                                    )

                                console.log(usersToChat)

                                return (
                                    usersToChat.map(user => (
                                        <Contact 
                                            key={user?._id} 
                                            user={{
                                                username: user?.username,
                                                otherInfo: { avatar: user?.otherInfo?.avatar } 
                                            }} 
                                        />
                                    ))
                                )
                            })() : (
                                [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map(e => (
                                    <ContactSkeleton key={e} />
                                ))
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disableAutoFocus
            >
                <Box p={1} sx={{ height: matches ? '24vh' : '20vh', width: '35vw', bgcolor: 'background.paper', display:'flex', flexDirection:'column' }} borderRadius={2} >
                    <Box p={0}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" m={'1rem'}>
                            Adicionar contato
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                        <TextField
                            onChange={e => { setContactsAttributes({ ...ContactsAttributes, name: e.target.value }) }}
                            id="outline-basic"
                            label="Adicionar pelo nome"
                            value={ContactsAttributes.name}
                            fullWidth
                        />

                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} >
                            <Button onClick={handleClose} variant='outlined' fullWidth>
                                Cancelar
                            </Button>
                            <Button onClick={createContacts} variant='outlined' fullWidth>
                                Criar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
