import { createTheme } from '@material-ui/core'

export default createTheme({
  palette: {
    primary: {
      light: '#3c44b126',
      main: '#333996'
    },
    secondary: {
      light: '#f8324526',
      main: '#f83245'

    },
    background: {
      default: '#f4f5fd'
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  },
  shape: {
    borderRadius: '12px'
  }
})
