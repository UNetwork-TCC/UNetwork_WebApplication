import { Menu, alpha, styled } from '@mui/material'

const StyledMenu = styled((props?: Record<string, any>) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
    open={props?.open ?? false}
    slotProps={{
      backdrop: {
        sx: {
          backgroundColor: (theme: any) =>
            theme.palette.mode === 'light'
              ? 'rgba(0, 0, 0, 0.3)'
              : 'rgba(0, 0, 0, 0.5)'
        }
      }
    }}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.background.paper
        : theme.palette.grey[900],
    boxShadow:
      theme.palette.mode === 'light'
        ? '0 4px 20px rgba(0, 0, 0, 0.15)'
        : '0 4px 20px rgba(0, 0, 0, 0.4)',
    border: `1px solid ${
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, 0.08)'
        : 'rgba(255, 255, 255, 0.08)'
    }`,
    '& .MuiMenu-list': {
      padding: '8px'
    },
    '& .MuiMenuItem-root': {
      borderRadius: 8,
      padding: '10px 16px',
      marginBottom: 2,
      '&:last-child': {
        marginBottom: 0
      },
      '& .MuiSvgIcon-root': {
        fontSize: 20,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'light'
            ? alpha(theme.palette.primary.main, 0.08)
            : alpha(theme.palette.primary.main, 0.16)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))

export default StyledMenu
