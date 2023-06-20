
import { makeStyles } from '@mui/styles'
import useMobileStyles from './useMobileStyles.js'
import useChatPageStyles from './useChatPageStyles.js'

const useStyles = makeStyles({
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
            background: palette => palette.primary.main  
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
            background: palette => palette.primary.main  
        }
    }

    
})

export { useStyles, useMobileStyles, useChatPageStyles}