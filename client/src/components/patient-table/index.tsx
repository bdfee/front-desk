import PatientTable from './patient-table'
import PatientModal from '../patient-modal'
import { useEffect, useState } from 'react'
import { PatientDetail } from '../../types'
import patientService from '../../services/patients'
import { isAxiosError } from 'axios'

const PatientPage = () => {
  const [patients, setPatients] = useState<PatientDetail[]>()

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientList = await patientService.getAll()
        setPatients(patientList)
      } catch (error) {
        if (isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching patients')
        }
      }
    }
    fetchPatients()
  }, [])

  const deletePatient = async (id: number) => {
    try {
      await patientService.deleteById(id)
      setPatients(patients?.filter(({ patientId }) => patientId !== id))
    } catch (error) {
      if (isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error deleting patient')
      }
    }
  }

  if (!patients) {
    return <div>fetching patients list</div>
  }

  return (
    <>
      <PatientTable patients={patients} deletePatient={deletePatient} />
      <PatientModal type="add" state={patients} stateSetter={setPatients} />
    </>
  )
}

export default PatientPage
