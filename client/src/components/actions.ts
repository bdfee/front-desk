import { AuthenticatedUser, SetAlertPayload } from '../types'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'

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
