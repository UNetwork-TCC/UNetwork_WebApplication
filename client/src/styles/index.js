
import { makeStyles } from '@mui/styles'
import useMobileStyles from './useMobileStyles.js'
import useChatPageStyles from './useChatPageStyles.js'
import bg from '../assets/img/bg.jpg'

const useStyles = makeStyles(theme => ({
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        background: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: '0.5',
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
    },
    
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '95vh',
        width: '95vw',
        overflowX: 'hidden',
        background: 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
        borderRadius: '1rem',
        boxShadow: '5px 5px 10px',
        transition: '.3s ease-in-out'
    },

    headerLinks: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        transition: '.3s ease-in-out',
        position: 'relative',
        border: 'none',
        outline: 'none',
        padding: '5px 0',
        color: theme.palette?.primary.light,
        cursor: 'pointer',
    
        '&:hover': {
            color: theme.palette?.primary.main
        },
    
        '&:hover::after': {
            transform: 'scale(1, 1)',
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
            background: theme.palette?.primary.main,
        }
    },

    
}))

export { useStyles, useMobileStyles, useChatPageStyles }