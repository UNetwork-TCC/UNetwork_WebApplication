import { CustomInput } from '$layout'
import { Add, Search, Settings } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState, type ReactElement } from 'react'
import { Contact } from '$components'
import { type contact } from '$types'

export default function ContactsArea(): ReactElement {
    const theme = useTheme()

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

    return (
        <>
            <Box
                display='flex'
                height='96%'
                position='sticky'
                alignItems='start'
                maxHeight='99%'
                width='30%'
                pt={4.5}
                sx={{
                    boxSizing: 'border-box',
                    [theme.breakpoints.down('lg')]: { pt:2.5 }
                }}>
                <Box sx={{ width: '100%', height: '100%' }} >
                    <Box sx={{ width: '100%', height: '17%' }}>
                        <Stack gap={2} sx={{ position: 'sticky', top: '0' }}>
                            <Box display={'flex'} sx={{ alignItems: 'center', ml: '5%' }}>
                                <Box sx={{ width: '70%', [theme.breakpoints.down('lg')]: { ml:'5%', width:'63%' } }}>
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
                        <Stack gap={1} sx={{ mt: '2%', width: '100%', height: '100%', [theme.breakpoints.down('lg')]: { mt:'6%' } }}>
                            <Contact notification={8} date={'19:45'} user={{ name: 'Alfa' }} />
                            <Contact notification={6} date={'3 Dias'} user={{ name: 'Leonardo' }} />
                            <Contact notification={3} date={'1 Ano'} user={{ name: 'Torugo' }} />
                            <Contact date={'3 Dias'} user={{ name: 'Guilherme Lima' }} />
                            <Contact notification={1} date={'3 Dias'} user={{ name: 'Elizabeth' }} />
                            <Contact notification={14} date={'3 Dias'} user={{ name: 'Jhow' }} />
                            <Contact notification={56} date={'3 Dias'} user={{ name: 'Luizinho' }} />
                            <Contact notification={99} date={'3 Dias'} user={{ name: 'Paulo Rogério de Neves Oliveira' }} /> {/* "+99" medo */}
                            <Contact notification={7} date={'3 Dias'} user={{ name: 'Rian' }} />
                            <Contact notification={1} date={'3 Dias'} user={{ name: 'Vitor Santos' }} />
                            <Contact notification={3} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={2} date={'2h'} user={{ name: 'Paulin' }} />
                            <Contact notification={3} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={3} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            <Contact notification={3} date={'3 Dias'} user={{ name: 'Pacheco' }} />
                            {Contacts.map(e => (
                                <Contact user={{ name: e.name }} key={e.name} />
                            ))}
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
