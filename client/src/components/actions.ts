import { AuthenticatedUser, SetAlertPayload, User } from '../types'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'
import userService from '../services/user'
import { NavigateFunction } from 'react-router-dom'

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
