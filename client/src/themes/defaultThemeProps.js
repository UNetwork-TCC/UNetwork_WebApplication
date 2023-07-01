const defaultThemeProps = {
    typography: {
        fontFamily: '\'Public Sans\', sans-serif'
    },

    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: 'rgba(0, 0, 0, 0.42)'
                }
            }
        },

        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    color: 'primary.main',
                }
            }
        },

        MuiCssBaseline: {
            styleOverrides: {
                scrollBehavior: 'smooth',
                // Custom Scrollbar

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
                    background: '#555',
                }
            }
        }
    }
}

export default defaultThemeProps