import { useState } from 'react'
import { AppRouter } from './routers'
import { PaletteMode } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@mui/material/CssBaseline'
import { StoreProvider } from './store/StoreProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { indigo } from '@mui/material/colors'

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...indigo,
      ...(mode === 'dark' && {
        main: indigo[500]
      })
    },
    ...(mode === 'dark' && {
      background: {
        default: indigo[900],
        paper: indigo[900]
      }
    })
  }
})

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState<PaletteMode>('dark')
  const theme = createTheme(getDesignTokens(selectedTheme))

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <StoreProvider>
          <CssBaseline />
          <AppRouter setSelectedTheme={setSelectedTheme} />
        </StoreProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App