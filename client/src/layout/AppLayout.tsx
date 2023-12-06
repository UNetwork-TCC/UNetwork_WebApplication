import { type ReactElement, useContext } from 'react'
import { Box, type SxProps, useTheme } from '@mui/material'
import { useStyles } from '$styles'
import { Header } from '.'
import { SideBar } from '$layout'
import { appLayoutContext } from '$contexts'
import { RequireAuth } from '$components'
import bg from '$assets/img/bg.jpg'

export default function AppLayout({
    children,
    sx
}: {
    children: React.ReactNode
    sx?: SxProps
}): ReactElement {
    const classes = useStyles()
    const theme = useTheme()

    const { 
        window: {
            size,
            setSize
        }
    } = useContext(appLayoutContext)

    const maximize = (): void => {
        if (size.height === '100vh' || size.height === '200px') {
            setSize({
                height: '95vh',
                width: '95vw',
                borderRadius: '1rem'
            })
        } else {
            setSize({
                height: '100vh',
                width: '100vw',
                borderRadius: '0'
            })
        }
    }

    const minimize = (): void => {
        setSize({
            height: '200px',
            width: '400px',
            borderRadius: '1rem'
        })
    }

    const close = (): void => {
        setTimeout(() => {
            window.location.href = '/auth/login'
        }, 2000)
    }

    return (
        <RequireAuth>
            <Box sx={sx} display='flex' height='100vh' width='100%' justifyContent='center' alignItems='center'>
                <Box className={classes.body}>
                    {theme.palette.mode === 'light' &&
                        <img 
                            src={bg} 
                            style={{
                                zIndex: -2,
                                opacity: 'light',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%'
                            }} 
                        />
                    }
                    <Box sx={{ height: '95vh', width: '95vw', borderRadius: '1rem', ...size }} className={classes.wrapper}>
                        <Header
                            minimize={minimize}
                            maximize={maximize}
                            close={close}
                        />
                        <Box height='100%' display='flex' justifyContent='center' width='100%'>
                            <SideBar />
                            <Box overflow='auto' height='92.5vh' width={'100%'}>
                                {children}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </RequireAuth>
    )
}
