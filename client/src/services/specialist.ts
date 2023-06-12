import axios from 'axios'
// import the type
import { Specialist } from '../../types'
import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<Specialist[]>(`${apiBaseUrl}/patients`)
  return data
}

export default {
  getAll,
}
