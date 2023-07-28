import axios, { isAxiosError } from 'axios'
import { SafeUser, UserInput, User, TaskDetail } from '../types'
import { apiBaseUrl } from '../constants'
import { isUser } from '../typeUtils'

const url = `${apiBaseUrl}/users/`

const getAll = async () => {
  const { data } = await axios.get<SafeUser[]>(url)
  return data
}

const getTasksByUser = async (userId: number) => {
  const { data } = await axios.get<TaskDetail[]>(url + userId + '/tasks')
  return data
}

const create = async (object: UserInput) => {
  try {
    const { data } = await axios.post<User>(url, object)
    if (!isUser) {
      throw new Error('invalid user data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error creating user')
    }
  }
}
export default {
  getAll,
  getTasksByUser,
  create,
}
