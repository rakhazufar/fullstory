'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  });
  

const StyleProvider = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
        {children}
    </ThemeProvider>
  )
}

export default StyleProvider