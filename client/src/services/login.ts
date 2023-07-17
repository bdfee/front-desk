import axios, { isAxiosError } from 'axios'
import { apiBaseUrl } from '../constants'
import { AuthenticatedUser } from '../types'

const url = `${apiBaseUrl}/login/`

const login = async (username: string, password: string) => {
  try {
    const { data } = await axios.post<AuthenticatedUser>(url, {
      username,
      password,
    })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error logging in')
    }
  }
}

export default {
  login,
}
