import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
  Button,
} from '@mui/material'
import PatientForm from './patient-form'
import { PatientInput } from '../../types'
import { useContext, useState } from 'react'
import { PatientsCtx, ErrorCtx } from '../../App'
import patientService from '../../services/patients'
import axios from 'axios'

const AddPatientModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const patientsCtx = useContext(PatientsCtx)
  const errorCtx = useContext(ErrorCtx)

  if (!patientsCtx || !errorCtx) {
    return <div>no context here</div>
  }

  const submitNewPatient = async (values: PatientInput) => {
    try {
      const { patientId } = await patientService.create(values)
      const patient = await patientService.getOneById(patientId)
      patientsCtx.setPatients(patientsCtx.patients.concat(patient))
      closeModal()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorCtx.setError('axios error' + error.message)
      } else {
        errorCtx.setError('unknown error submitting patient')
      }
    }
  }

  // const deletePatient = async (id: number) => {
  //   try {
  //     await patientService.deleteById(id)
  //     context.setPatientList(
  //       context.patientList.filter(({ patientId }) => patientId !== id),
  //     )
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log('axios error' + error.message)
  //     } else {
  //       console.log('unknown error deleting patient')
  //     }
  //   }
  // }

  const updatePatient = async (id: number, patient: PatientInput) => {
    try {
      const { patientId } = await patientService.updateById(id, patient)
      const updatedPatient = await patientService.getOneById(patientId)
      patientsCtx.setPatients(
        patientsCtx.patients.map((patient) =>
          patient.patientId === updatedPatient.patientId
            ? updatedPatient
            : patient,
        ),
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorCtx.setError('axios error' + error.message)
      } else {
        errorCtx.setError('unknown error updating specialist')
      }
    }
  }

  const closeModal = (): void => {
    setModalOpen(false)
    errorCtx.setError(undefined)
  }

  const openModal = (): void => setModalOpen(true)

  return (
    <>
      <Button onClick={() => openModal()}>Add patient</Button>
      <Dialog fullWidth={true} open={modalOpen} onClose={closeModal}>
        <DialogTitle>Add a new patient</DialogTitle>
        <Divider />
        <DialogContent>
          {errorCtx.error && (
            <Alert severity="error" role="alert">
              {errorCtx.error}
            </Alert>
          )}
          <PatientForm
            onSubmit={submitNewPatient}
            onUpdate={updatePatient}
            onCancel={closeModal}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddPatientModal
