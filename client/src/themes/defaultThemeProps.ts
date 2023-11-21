import { grey } from '@mui/material/colors'

const defaultThemeProperties = {
    typography: {
        fontFamily: '\'Public Sans\', \'Poppins\', sans-serif'
    },

    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: 'rgba(0, 0, 0, 0.42)'
                }
            }
        },

        MuiAvatar: {
            variants: [
                {
                    props: { variant: 'iconWrapper' },
                    style: {
                        borderRadius: '15px',
                        border: `${grey[300]} 1px solid`,
                        background: grey[100],
                        color: grey[400]
                    }
                }
            ]
        },

        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'primary.main'
                }
            }
        },

        MuiCssBaseline: {
            styleOverrides: {
                scrollBehavior: 'smooth',

                html: {
                    '@media (max-width:1535.95px)': {
                        fontSize: '12px'
                    }
                },

                // Custom Scrollbar

                body: {
                    backgroundColor: '#fafafa'
                },

                '::-webkit-scrollbar': {
                    width: '10px'
                },

                '::-webkit-scrollbar-track:': {
                    background: '#fafafa'
                },

                '::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '10px'
                },

                '::-webkit-scrollbar-thumb:hover': {
                    background: '#555'
                }
            }
        }
    }
}

export default defaultThemeProperties
