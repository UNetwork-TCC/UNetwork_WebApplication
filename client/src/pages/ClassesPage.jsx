import { Box, Button, Container, Divider, FormControl, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, TextField, Typography, } from '@mui/material'

import AppLayout from '../layout/AppLayout'
// import { useTheme } from '@emotion/react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Classes, FilterAndConfig } from '../components'
import { useEffect, useState } from 'react'
import CustomCheckBox from '../layout/CustomCheckBox'
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img1 from '../assets/img/paraPiada/ciclo.jpg'
import img2 from '../assets/img/paraPiada/james.jpg'
import img3 from '../assets/img/paraPiada/roubo.jpg'

export default function ClassesPage() {
    // const theme = useTheme()

    const [ typeForm, setTypeForm ] = useState('Create')

    // const matches = useMediaQuery(theme.breakpoints.up('md'))

    const [ open, setOpen ] = useState(false)

    const [ Class, setClass ] = useState([])

    const [ ClassAttributes, setClassAttributes ] = useState({
        title: '',
        visibility: '',
        code: '',
        setPassword: '',
        getPassword: ''
    })

    const [ checkedButtons, setCheckedButtons ] = useState({
        public: true,
        private: false
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const createClass = () => {
        // ...

        if (ClassAttributes.visibility && ClassAttributes.title) {
            setClass([
                ...Class,
                ClassAttributes
            ])
            handleClose()
        }
        else alert('preencha todos os campos!')
    }

    useEffect(() => {
        document.addEventListener('keydown', e => {
            if (e.code == 27) {
                handleClose()
            }
        })
    }, [])

    const [ showPassword, setShowPassword ] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    return (
        <AppLayout withSidebars>
            <Box display='flex' justifyContent='start' flexDirection='column' p={3} mt={5} width='100%' height='100%' fontSize={'1rem'}>
                <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                    <Typography sx={{ fontSize: '2rem', color: '#673AB7', fontWeight: 'bold' }}>Suas Classes</Typography>
                    <FilterAndConfig text={'CRIAR PASTA'} handleOpen={handleOpen}/>
                </Container>
                <Box flexDirection='column' m={5} sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', justifyItems: 'center', rowGap: '2rem' }} >
                    <Classes Class={{ name: 'Os lambisgoia' }} />
                    <Classes Class={{ name: 'Lar Ternura' }} />
                    <Classes Class={{ name: 'Fofoqueiros' }} />
                    <Classes Class={{ name: 'Maconheiros da paz e da guerra' }} />
                    <Classes Class={{ name: 'Os programadores' }} />
                    <Classes Class={{ name: 'Os revoltados' }} />
                    {Class.map(e => (
                        <Classes Class={{ name:e.title }}  key={e.title} />
                    ))}
                    
                </Box> 
                <Box sx={{ width: '30rem', height:'30rem', display: 'flex', alignContent: 'center' }}>                
                    <Carousel autoPlay infiniteLoop centerMode >
                            <Box>
                                <img src={img1} />
                            </Box>
                            <Box>
                                <img src={img2} />
                            </Box>
                            <Box>
                                <img src={img3} />
                            </Box>
                    </Carousel>
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
                <Box p sx={{  width: '35vw', bgcolor: 'background.paper', }} borderRadius={2} >
                    <Box p={0} sx={{ display: 'flex', width: '100%' }}>
                        <Button sx={{ width: '45%', ':hover': { cursor: 'pointer', bgcolor: 'whitesmoke' }, m: '0 5%', textAlign: 'center', borderRadius: '0.5rem', color: 'black', }} onClick={() => setTypeForm('Create')}>
                            <Typography id="modal-modal-title" sx={{ fontSize: '1.2rem' }} m={'1rem'}>
                                Criar Classe
                            </Typography>
                        </Button>
                        <Divider orientation='vertical' flexItem sx={{}} />
                        <Button sx={{ width: '45%', ':hover': { cursor: 'pointer', bgcolor: 'whitesmoke' }, m: '0 5%', textAlign: 'center', borderRadius: '0.5rem', color: 'black', }} onClick={() => setTypeForm('Join')}>
                            <Typography id="modal-modal-title" sx={{ fontSize: '1.2rem' }} m={'1rem'}>
                                Ingressar
                            </Typography>
                        </Button>
                    </Box>
                    {typeForm === 'Create' ? (
                        <Box display={'flex'} flexDirection={'column'} p={2} gap={2}>
                            <TextField
                                onChange={e => setClassAttributes({ ...ClassAttributes, title: e.target.value })}
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
                                            setCheckedButtons({ public: !checkedButtons.public })
                                            setClassAttributes({ ...ClassAttributes, visibility: 'public' })
                                        }}
                                    checked={checkedButtons.public}
                                    caption='Isso deixará sua pasta pública'
                                    title='Público'
                                />
                                <CustomCheckBox
                                    onClick={
                                        () => {
                                            setCheckedButtons({ private: !checkedButtons.private })
                                            setClassAttributes({ ...ClassAttributes, visibility: 'private' })
                                        }}
                                    checked={checkedButtons.private}
                                    caption='Isso deixará sua pasta privada'
                                    title='Privado'
                                />

                                {checkedButtons.private === true && (
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            onChange={e => setClassAttributes({ ...ClassAttributes, setPassword: e.target.value })}
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
                                        onChange={e => setClassAttributes({ ...ClassAttributes, code: e.target.value })}
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
                                            onChange={e => setClassAttributes({ ...ClassAttributes, getPassword: e.target.value })}
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
