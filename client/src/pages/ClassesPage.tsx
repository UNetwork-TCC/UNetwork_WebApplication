import { Box, Button, Container, Divider, FormControl, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, TextField, Typography } from '@mui/material'

// import { useTheme } from '@emotion/react'
import { AppLayout, CustomCheckBox } from '$layout'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Classes, FilterAndConfig } from '$components'
import { type ReactElement, useEffect, useState, type ReactChild } from 'react'
import img1 from '$assets/img/paraPiada/ciclo.jpg'
import img2 from '$assets/img/paraPiada/james.jpg'
import img3 from '$assets/img/paraPiada/roubo.jpg'
import { type class_ } from '$types'

export default function ClassesPage(): ReactElement {
    // const theme = useTheme()

    const [ typeForm, setTypeForm ] = useState('Create')

    const arr: ReactChild[] = [
        <img src={img1} key={0} />,
        <img src={img2} key={1} />,
        <img src={img3} key={2} />
    ]

    // const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ open, setOpen ] = useState(false)

    const [ _class, setClass ] = useState<class_[]>([])

    const [ ClassAttributes, setClassAttributes ] = useState<class_>({
        title: '',
        visibility: 'public',
        code: '',
        setPassword: '',
        getPassword: ''
    })

    const [ checkedButtons, setCheckedButtons ] = useState<{
        public: boolean,
        private: boolean
    }>({
        public: true,
        private: false
    })

    const handleOpen = (): void => { setOpen(true) }
    const handleClose = (): void => { setOpen(false) }

    const createClass = (): void => {
        // ...

        if (ClassAttributes.visibility && ClassAttributes.title) {
            setClass([
                ..._class,
                ClassAttributes
            ])
            handleClose()
        }
        else alert('preencha todos os campos!')
    }

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const code: string = e.code

            if (Number(code) === 27) {
                handleClose()
            }
        })
    }, [])

    const [ showPassword, setShowPassword ] = useState(false)

    const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }

    return (
        <AppLayout>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' minHeight={'calc(100vh - 13rem)'} fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <Typography sx={{ fontSize: '2rem', color: '#673AB7', fontWeight: 'bold' }}>Suas Classes</Typography>
                    <FilterAndConfig text={'CRIAR PASTA'} handleOpen={handleOpen} />
                </Container>
                <Box flexDirection='column' m={5} sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', justifyItems: 'center', rowGap: '2rem' }} >
                    <Classes _class={{ name: 'Os lambisgoia' }} />
                    <Classes _class={{ name: 'Lar Ternura' }} />
                    <Classes _class={{ name: 'Fofoqueiros' }} />
                    <Classes _class={{ name: 'Maconheiros da paz e da guerra' }} />
                    <Classes _class={{ name: 'Os programadores' }} />
                    <Classes _class={{ name: 'Os revoltados' }} />
                    {_class.map(e => (
                        <Classes _class={{ name: e.title }} key={e.title} />
                    ))}
                    
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
                <Box p={1} sx={{ width: '35vw', bgcolor: 'background.paper' }} borderRadius={2} >
                    <Box p={0} sx={{ display: 'flex', width: '100%' }}>
                        <Button
                            onClick={() => { setTypeForm('Create') }}
                            sx={{
                                width: '45%',
                                ':hover': {
                                    cursor: 'pointer',
                                    bgcolor: 'whitesmoke'
                                },
                                m: '0 5%',
                                textAlign: 'center',
                                borderRadius: '0.5rem',
                                color: 'black'
                            }}
                        >
                            <Typography id="modal-modal-title" sx={{ fontSize: '1.2rem' }} m={'1rem'}>
                                Criar Classe
                            </Typography>
                        </Button>
                        <Divider orientation='vertical' flexItem sx={{}} />
                        <Button
                            onClick={() => { setTypeForm('Join') }}
                            sx={{
                                width: '45%',
                                ':hover': {
                                    cursor: 'pointer',
                                    bgcolor: 'whitesmoke'
                                },
                                m: '0 5%',
                                textAlign: 'center',
                                borderRadius: '0.5rem',
                                color: 'black'
                            }}
                        >
                            <Typography id="modal-modal-title" sx={{ fontSize: '1.2rem' }} m={'1rem'}>
                                Ingressar
                            </Typography>
                        </Button>
                    </Box>
                    {typeForm === 'Create' ? (
                        <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                            <TextField
                                onChange={e => { setClassAttributes({ ...ClassAttributes, title: e.target.value }) }}
                                id="outline-basic"
                                label="Título"
                                value={ClassAttributes.title}
                                fullWidth
                            />
                            <Typography variant='subtitle2'> Colocar visibilidade para </Typography>
                            <FormControl>
                                <CustomCheckBox
                                    onClick={
                                        () => {
                                            setCheckedButtons(state => ({ ...state, public: !state.public }))
                                            setClassAttributes({ ...ClassAttributes, visibility: 'public' })
                                        }}
                                    checked={checkedButtons.public}
                                    caption='Isso deixará sua pasta pública'
                                    title='Público'
                                />
                                <CustomCheckBox
                                    onClick={
                                        () => {
                                            setCheckedButtons(state => ({ ...state, private: !state.private }))
                                            setClassAttributes({ ...ClassAttributes, visibility: 'private' })
                                        }}
                                    checked={checkedButtons.private}
                                    caption='Isso deixará sua pasta privada'
                                    title='Privado'
                                />

                                {checkedButtons.private && (
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            onChange={e => { setClassAttributes({ ...ClassAttributes, setPassword: e.target.value }) }}
                                            value={ClassAttributes.setPassword}
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                )}
                            </FormControl>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} >
                                <Button onClick={handleClose} variant='outlined' fullWidth>
                                    Cancelar
                                </Button>
                                <Button onClick={createClass} variant='outlined' fullWidth>
                                    Criar
                                </Button>
                            </Box>

                        </Box>
                    ) : typeForm === 'Join' && (
                        <Box display={'flex'} flexDirection={'column'} p={2} gap={5} sx={{ mt: '1%' }}>
                            <Box display={'flex'} flexDirection={'column'} gap={5} >
                                <Box display={'flex'} flexDirection={'column'} gap={2}>
                                    <Typography>Adicionar codigo da Classe</Typography>
                                    <TextField
                                        onChange={e => { setClassAttributes({ ...ClassAttributes, code: e.target.value }) }}
                                        id="outline-basic"
                                        label="Código"
                                        value={ClassAttributes.code}
                                        fullWidth
                                    />
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} gap={2}>
                                    <Typography>Senha da Classe</Typography>

                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            onChange={e => { setClassAttributes({ ...ClassAttributes, getPassword: e.target.value }) }}
                                            value={ClassAttributes.getPassword}
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                </Box>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} >
                                    <Button onClick={handleClose} variant='outlined' fullWidth>
                                        Cancelar
                                    </Button>
                                    <Button type='submit' onClick={createClass} variant='outlined' fullWidth>
                                        Ingressar
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                    
                </Box>
            </Modal>
        </AppLayout>
    )
}
