import { useContext, useEffect } from 'react'
import {
  setError,
  setLoading,
  setLogin,
  setUser,
  setUsername
} from '../../store/actions'
import { AppContext } from '../../store/StoreProvider'

export const SettingsPage = () => {
  const { state, dispatch } = useContext(AppContext)

  // useEffect(() => {}, []);

  return <div>Hello SettingsPage</div>
}
