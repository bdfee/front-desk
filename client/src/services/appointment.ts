import axios, { isAxiosError } from 'axios'
import { AppointmentDetail, AppointmentInput } from '../types'
import { apiBaseUrl } from '../constants'
import { isAppointment } from '../typeUtils'

const url = `${apiBaseUrl}/appointments/`

const getAll = async () => {
  const { data } = await axios.get<AppointmentDetail[]>(url)
  return data
}

const getOneById = async (id: number) => {
  const { data } = await axios.get<AppointmentDetail>(url + id)
  return data
}

const create = async (object: AppointmentInput) => {
  try {
    const { data } = await axios.post<AppointmentInput>(url, object)
    if (!isAppointment(data)) {
      throw new Error('invalid appointment data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error creating appointment')
    }
  }
}

const deleteById = async (id: number) => {
  try {
    await axios.delete(url + id)
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error deleting appointment')
    }
  }
}

const updateById = async (id: number, object: unknown) => {
  try {
    const { data } = await axios.put(url + id, object)
    if (!isAppointment(data)) {
      throw new Error('invalid appointment data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error updating appointments')
    }
  }
}

export default {
  getAll,
  getOneById,
  create,
  deleteById,
  updateById,
}
