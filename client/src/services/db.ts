import axios from 'axios'
import { apiBaseUrl } from '../constants'

export const isTestDb = async () => {
  const { data } = await axios.get<boolean>(apiBaseUrl + '/db/is-test')
  return data
}

export const dropAllTables = async () => {
  const { data } = await axios.post<boolean>(apiBaseUrl + '/db/drop-all-tables')
  return data
}
