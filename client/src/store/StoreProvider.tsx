import { createContext, Dispatch, useEffect, useReducer } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { getStoredState, setStoredState } from './localStorage'
import storeReducer, { StoreAction, StoreState } from './storeReducer'

import type { StoreProviderProps } from './StoreProviderProps'

const AppContext = createContext<{
  state: StoreState
  dispatch: Dispatch<StoreAction>
}>({ state: getStoredState(), dispatch: () => null })

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(storeReducer, getStoredState())
  const { loading } = state

  useEffect(() => {
    setStoredState(state)
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!!loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </AppContext.Provider>
  )
}

export { AppContext, StoreProvider }
