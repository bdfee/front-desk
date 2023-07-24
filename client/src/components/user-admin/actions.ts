import { AuthenticatedUser, SetAlertPayload, User } from '../../types'
import { useMutation } from '@tanstack/react-query'
import loginService from '../../services/login'
import userService from '../../services/user'
import { NavigateFunction } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import { useEffect } from 'react'

export const useLoginUser = (
  setAlertPayload?: SetAlertPayload,
  addToken?: (token: string) => void,
  navigate?: NavigateFunction,
) =>
  useMutation<AuthenticatedUser, Error, { username: string; password: string }>(
    {
      mutationFn: ({ username, password }) =>
        loginService.login(username, password),
      onSuccess: (loggedInUser) => {
        setAlertPayload && setAlertPayload('success', 'logged in', 'page')
        addToken && addToken(loggedInUser.token)
        navigate && navigate('/')
        secureLocalStorage.setItem('frontdesk', {
          user: loggedInUser,
        })
      },
      onError: () =>
        setAlertPayload && setAlertPayload('error', 'login error', 'page'),
    },
  )

export const useCreateUser = (
  setAlertPayload?: SetAlertPayload,
  navigate?: NavigateFunction,
) =>
  useMutation<
    User,
    Error,
    { username: string; password: string; name: string }
  >({
    mutationFn: ({ username, password, name }) =>
      userService.create({ username, password, name }),
    onSuccess: (_, variables) => {
      setAlertPayload && setAlertPayload('success', 'created user', 'page')
      navigate &&
        navigate('/login', {
          state: { username: variables.username },
        })
    },
    onError: () => {
      setAlertPayload && setAlertPayload('error', 'error creating user', 'page')
    },
  })

export const useSecureLocalStorage = (
  addToken?: (token: string) => void,
  navigate?: NavigateFunction,
) => {
  useEffect(() => {
    const storage = secureLocalStorage.getItem('frontdesk') as {
      user: AuthenticatedUser
    }
    if (storage?.user?.token) {
      addToken && addToken(storage.user.token)
      navigate && navigate('/')
    }
  }, [addToken])
}

export const getSecureLocalStorageName = () => {
  const storage = secureLocalStorage.getItem('frontdesk') as {
    user: AuthenticatedUser
  }

  if (storage) {
    return storage.user.name
  }
  return null
}
