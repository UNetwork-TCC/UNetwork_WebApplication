// Gradientes que se adaptam ao tema
// Use com: theme.palette.mode === 'light' ? gradients.light.primary : gradients.dark.primary

export const gradients = {
  light: {
    primary: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
    primaryHover: 'linear-gradient(135deg, #5e35b1 0%, #8e24aa 100%)',
    secondary: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
    contrast: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
    success: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
    warning: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    error: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
    info: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%)',
    card: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)'
  },
  dark: {
    primary: 'linear-gradient(135deg, #9575cd 0%, #7e57c2 100%)',
    primaryHover: 'linear-gradient(135deg, #7e57c2 0%, #673ab7 100%)',
    secondary: 'linear-gradient(135deg, #4dd0e1 0%, #26c6da 100%)',
    contrast: 'linear-gradient(135deg, #f06292 0%, #ec407a 100%)',
    success: 'linear-gradient(135deg, #66bb6a 0%, #4caf50 100%)',
    warning: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)',
    error: 'linear-gradient(135deg, #ef5350 0%, #f44336 100%)',
    info: 'linear-gradient(135deg, #42a5f5 0%, #2196f3 100%)',
    background: 'linear-gradient(135deg, #1a1625 0%, #1e1a29 100%)',
    card: 'linear-gradient(145deg, rgba(45, 40, 56, 0.95) 0%, rgba(37, 33, 49, 0.8) 100%)'
  }
}

// Helper para obter gradiente baseado no modo do tema
export const getGradient = (mode: 'light' | 'dark', type: keyof typeof gradients.light): string => {
  return gradients[mode][type]
}

// Cores com transparência que funcionam em ambos os temas
export const overlayColors = {
  light: {
    primarySoft: 'rgba(103, 58, 183, 0.08)',
    primaryMedium: 'rgba(103, 58, 183, 0.16)',
    primaryStrong: 'rgba(103, 58, 183, 0.24)',
    cardBorder: 'rgba(103, 58, 183, 0.08)',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    backdrop: 'rgba(255, 255, 255, 0.6)'
  },
  dark: {
    primarySoft: 'rgba(179, 157, 219, 0.08)',
    primaryMedium: 'rgba(179, 157, 219, 0.16)',
    primaryStrong: 'rgba(179, 157, 219, 0.24)',
    cardBorder: 'rgba(179, 157, 219, 0.08)',
    cardBg: 'rgba(37, 33, 49, 0.8)',
    backdrop: 'rgba(26, 22, 37, 0.6)'
  }
}

export const getOverlay = (mode: 'light' | 'dark', type: keyof typeof overlayColors.light): string => {
  return overlayColors[mode][type]
}
