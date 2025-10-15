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
                    // Ajustando para os novos breakpoints e considerando zoom
                    fontSize: '16px',
                    '@media (max-width: 1919.95px)': {
                        fontSize: '15px'
                    },
                    '@media (max-width: 1439.95px)': {
                        fontSize: '14px'
                    },
                    '@media (max-width: 1023.95px)': {
                        fontSize: '13px'
                    },
                    '@media (max-width: 639.95px)': {
                        fontSize: '12px'
                    },
                    // Garantir que o layout funcione bem com zoom
                    WebkitTextSizeAdjust: '100%',
                    MozTextSizeAdjust: '100%',
                    msTextSizeAdjust: '100%'
                },

                // Custom Scrollbar

                body: {
                    backgroundColor: '#fafafa',
                    // Melhorar renderização em diferentes zooms
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                },

                // Prevenir flash de conteúdo não estilizado
                '*': {
                    boxSizing: 'border-box'
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
