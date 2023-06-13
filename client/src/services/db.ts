import axios from 'axios'
import { apiBaseUrl } from '../constants'

export const isTestDb = async () => {
  const { data } = await axios.get<boolean>(apiBaseUrl + '/db/is-test')
  return data
}
