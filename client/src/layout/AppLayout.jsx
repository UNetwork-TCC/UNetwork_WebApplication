import Sidebar from './SideBar'
import { Box } from '@mui/material'
import { useStyles } from '../styles'
import { Header } from '../layout'

export default function AppLayout({ children, sx }) {
    const classes = useStyles()

    return (
        <Box sx={sx} display='flex' height='100vh' width='100%' justifyContent='center' alignItems='center'>
            <Box className={classes.body}>
                <Box className={classes.wrapper}>
                    <Header />
                    <Box height='100%' display='flex' justifyContent='center' width='100%'>
                        <Sidebar>

                        </Sidebar>
                        <Box display='flex' justifyContent='center' width='80%'>
                            {children}
                        </Box>
                        <Sidebar>

                        </Sidebar>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
