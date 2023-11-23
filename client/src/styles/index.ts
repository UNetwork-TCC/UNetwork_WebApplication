import { makeStyles } from '@mui/styles'
import useMobileStyles from './useMobileStyles.js'
import useChatPageStyles from './useChatPageStyles.js'
import { type Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
    navLinks: {
        '&': {
            position: 'relative',
            border: 'none',
            outline: 'none',
            padding: '5px 0'
        },

        '&:hover::after': {
            transform: 'scale(1, 1)'
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            transition: 'ease .3s',
            height: '0.175rem',
            width: '100%',
            transform: 'scale(0, 1)',
            transformOrigin: '0% 100%',
            left: 0,
            bottom: 0,
            background: theme.palette.primary.main
        }
    },

    activeNavLinks: {
        '&::after': {
            content: '""',
            position: 'absolute',
            transition: 'ease .3s',
            height: '0.175rem',
            width: '100%',
            transform: 'scale(1, 1)',
            left: 0,
            bottom: 0,
            background: theme.palette.primary.main
        }
    },

    body: {
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        background: theme.palette.mode === 'dark' ?
            '#1F1B24' 
            : 'none'
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 
            theme.palette.mode === 'light' ?
                'linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3))'
                : 'linear-gradient(to right bottom, rgba(80, 80, 80, 0.1), rgba(80, 80, 80, 0.3))',
        boxShadow: '5px 5px 10px black',
        transition: '.3s ease-in-out'
    },

    headerLinks: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        transition: '.3s ease-in-out',
        position: 'relative',
        border: 'none',
        outline: 'none',
        padding: '5px 0',
        color: theme.palette?.primary.main,
        cursor: 'pointer',

        '&:hover': {
            color: theme.palette?.primary.main
        },

        '&:hover::after': {
            transform: 'scale(1, 1)'
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            transition: 'ease .3s',
            height: '0.175rem',
            width: '100%',
            transform: 'scale(0, 1)',
            transformOrigin: '0% 100%',
            left: 0,
            bottom: 0,
            background: theme.palette?.primary.main
        }
    },

    sideBarLinks: {
        '&': {
            display: 'flex',
            position: 'relative',
            border: 'none',
            transition: '.3s ease-in-out',
            borderRadius: '15px',
            cursor: 'pointer'
        },

        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        },

        '&:hover::after': {
            transform: 'scale(1, 1)',
            borderRadius: '15px'
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            transition: 'ease .3s',
            height: '100%',
            borderRadius: '15px',
            zIndex: -1,
            marginLeft: '20px',
            width: '80%',
            transform: 'scale(0, 1)',
            transformOrigin: '0% 100%',
            left: 0,
            bottom: 0,
            background: theme.palette.primary.main
        }
    }
}))

export { useStyles, useMobileStyles, useChatPageStyles }
