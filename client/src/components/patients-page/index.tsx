import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { Patient, PatientInput } from '../../types'
import patientService from '../../services/patients'
import PatientTable from './patient-table'
import AddPatientModal from './add-patient-modal'

const PatientPage = () => {
  const [patientList, setPatientList] = useState<Patient[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patients = await patientService.getAll()
        setPatientList(patients)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching patients')
        }
      }
    }
    fetchPatients()
  }, [])

  const submitNewPatient = async (values: PatientInput) => {
    try {
      const patient = await patientService.create(values)
      setPatientList(patientList.concat(patient))
      closeModal()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error submitting patient')
      }
    }
  }

  const deletePatient = async (id: number) => {
    try {
      await patientService.deleteById(id)
      setPatientList(patientList.filter(({ patientId }) => patientId !== id))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error deleting patient')
      }
    }
  }

  const updatePatient = async (id: number, patient: PatientInput) => {
    try {
      const updatedPatient = await patientService.updateById(id, patient)
      setPatientList(
        patientList.map((patient) =>
          patient.patientId === updatedPatient.patientId
            ? updatedPatient
            : patient,
        ),
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error updating specialist')
      }
    }
  }

  const setErrorWithTimeout = (errorMessage: string) => {
    setError(errorMessage)

    const id = setTimeout(() => {
      setError(undefined)
    }, 3000)

    return () => clearTimeout(id)
  }

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const openModal = (): void => setModalOpen(true)

  return (
    <>
      <PatientTable
        patientList={patientList}
        updatePatient={updatePatient}
        deletePatient={deletePatient}
      />
      <Button onClick={() => openModal()}>Add patient</Button>
      <AddPatientModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewPatient}
        error={error}
        setError={setErrorWithTimeout}
      />
    </>
  )
}

export default PatientPage
