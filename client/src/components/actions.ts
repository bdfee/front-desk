import { AuthenticatedUser, SetAlertPayload, User } from '../types'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'
import userService from '../services/user'

export const useLoginUser = (setAlertPayload?: SetAlertPayload) =>
  useMutation<AuthenticatedUser, Error, { username: string; password: string }>(
    {
      mutationFn: ({ username, password }) =>
        loginService.login(username, password),
      onSuccess: (authenticatedUser) => {
        localStorage.setItem('frontdesk', authenticatedUser.token)
        setAlertPayload && setAlertPayload('success', 'logged in', 'page')
      },
      onError: () =>
        setAlertPayload && setAlertPayload('error', 'login error', 'page'),
    },
  )

export const useCreateUser = (setAlertPayload?: SetAlertPayload) =>
  useMutation<
    User,
    Error,
    { username: string; password: string; name: string }
  >({
    mutationFn: ({ username, password, name }) =>
      userService.create({ username, password, name }),
    onSuccess: () => {
      setAlertPayload && setAlertPayload('success', 'created user', 'page')
    },
    onError: () => {
      setAlertPayload && setAlertPayload('error', 'error creating user', 'page')
    },
  })
