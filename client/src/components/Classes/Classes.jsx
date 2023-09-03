import { Avatar, Box, Button, Link, Paper, Typography } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { CustomMenu } from '../../layout'

export default function Classes({ Class }) {

    const initials = Class.name.split(" ")

    if (initials.length > 1){
        var lettersInitial1 = initials[0].charAt(0).toUpperCase()
        var lettersInitial2 = initials[initials.length - 1].charAt(0).toUpperCase()
        var lettersInitials = lettersInitial1 + lettersInitial2
        
    }



    return (
        <Paper elevation={6}  sx={{
            margin: '0 0 0 0px', display: 'flex', flexDirection: 'column', bgcolor: 'white', width: '18em', height: '15em',
            borderRadius: '.6vh', alignItems:'center'
            // boxShadow:'5px 5px rgba(0,0,0,0.2)' /*Vitão, comenta esse boxShadow e vê se fica melhor na sua opiniao. Eu não consigo decidir a melhor, se é com bax-shadow, ou com elevation*/ 
        }}>
            <Box sx={{ width: '90%', height: '20%',  }}>
                <MoreHorizIcon sx={{ cursor: 'pointer', m: '0.5em 0', float: 'right', fontSize: '1.8em', ':hover': { color: 'text.secondary' } }} />
            </Box>  
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '30%', mb: '3%' }}>
                <Avatar variant='square' sx={{ borderRadius: 2, height: '4.5rem', width: '4.5rem' }}>
                    {Class.picture ?
                        <img src={Class.Picture} alt="Picture" />
                        :
                        initials.length == 1 ?
                            Class.name.charAt(0).toUpperCase()
                            :
                            lettersInitials
                    }
                </Avatar>
            </Box>
            <Box sx={{ height:'40%', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'80%', textAlign:'center', justifyContent:'center'}}>
                <Typography sx={{ fontSize: '1.3em', textTransform: 'uppercase', fontWeight: 'bold', color: 'black' }} >{Class.name}</Typography>
            </Box>
        </Paper>
    )
}
