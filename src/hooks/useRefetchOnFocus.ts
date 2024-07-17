import { useFocusEffect } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useAppState } from './useAppState'

export const useRefetchOnFocus = (
  refetch: any = () => null,
  refetchOnAppStateChange = false,
  canRefetch = true
) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false)

  useAppState({
    onChange: (newAppState: any) => {
      if (newAppState === 'active' && refetchOnAppStateChange) refetch()
    },
  })

  useFocusEffect(() => {
    setIsScreenFocused(true) // when i focus the screen
    return () => setIsScreenFocused(false) // when i quit the screen
  })

  /* the screen still always active in cache so we need to check that the screen is focused in a use effect
    to dispatch the refetch only one time to avoid the infinity loop*/
  useEffect(() => {
    if (isScreenFocused && canRefetch) {
      refetch()
    }
    return () => setIsScreenFocused(false)
  }, [canRefetch, isScreenFocused, refetch])
}