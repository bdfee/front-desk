import axios, { isAxiosError } from 'axios'
import { PatientDetail, PatientInput } from '../types'
import { apiBaseUrl } from '../constants'
import { isPatient } from '../typeUtils'
import { AppointmentDetail } from '../types'

const url = `${apiBaseUrl}/patients/`

const getAll = async () => {
  const { data } = await axios.get<PatientDetail[]>(url)
  return data
}

const getOneById = async (id: number) => {
  const { data } = await axios.get<PatientDetail>(url + id)
  return data
}

const getAppointmentsByPatient = async (id: number) => {
  const { data } = await axios.get<AppointmentDetail[]>(
    url + id + '/appointments',
  )
  return data
}

const create = async (object: PatientInput) => {
  try {
    const { data } = await axios.post<PatientInput>(url, object)
    if (!isPatient(data)) {
      throw new Error('invalid patient data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error creating patient')
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
      throw new Error('Unknown error deleting patient')
    }
  }
}

const updateById = async (id: number, object: unknown) => {
  try {
    const { data } = await axios.put(url + id, object)
    if (!isPatient(data)) {
      throw new Error('invalid patient data')
    }
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error)
    } else {
      throw new Error('Unknown error updating patients')
    }
  }
}

export default {
  getAll,
  getOneById,
  create,
  deleteById,
  updateById,
  getAppointmentsByPatient,
}
