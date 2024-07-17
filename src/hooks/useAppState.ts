import { useState, useEffect } from 'react'
import { AppState } from 'react-native'

export const useAppState = (settings: any) => {
  const { onChange, onForeground, onBackground } = settings || {}
  const [appState, setAppState] = useState(AppState.currentState)

  function handleAppStateChange(nextAppState: any) {
    if (nextAppState === 'active') {
      isValidFunction(onForeground) && onForeground()
    } else if (nextAppState.match(/inactive|background/)) {
      isValidFunction(onBackground) && onBackground()
    }
    setAppState(nextAppState)
    isValidFunction(onChange) && onChange(nextAppState)
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )
    return () => subscription.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function isValidFunction(func: any) {
    return func && typeof func === 'function'
  }

  return { appState }
}