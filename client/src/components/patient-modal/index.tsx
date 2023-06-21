/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
  Button,
} from '@mui/material'
import PatientForm from './patient-form'
import { PatientDetail, PatientInput } from '../../types'
import { Dispatch, useContext, useState, SetStateAction } from 'react'
import { ErrorCtx } from '../../App'
import patientService from '../../services/patients'
import axios from 'axios'

interface UpdatePatientModalProps {
  type: string
  state: PatientDetail | undefined
  stateSetter: Dispatch<SetStateAction<PatientDetail | undefined>>
}

interface AddPatientModalProps {
  type: string
  state: PatientDetail[] | undefined
  stateSetter: Dispatch<SetStateAction<PatientDetail | undefined>>
}

type ModalProps = UpdatePatientModalProps | AddPatientModalProps

const PatientModal = (props: ModalProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const errorCtx = useContext(ErrorCtx)

  if (!errorCtx) {
    return <div>no context here</div>
  }

  const updatePatient = async (id: number, newValues: PatientInput) => {
    try {
      const { patientId } = await patientService.updateById(id, newValues)
      const updatedPatient = await patientService.getOneById(patientId)
      props.stateSetter(updatedPatient)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorCtx.setError('axios error' + error.message)
      } else {
        errorCtx.setError('unknown error updating specialist')
      }
    }
  }

  // const addPatient = async (values: PatientInput) => {
  //   try {
  //     const { patientId } = await patientService.create(values)
  //     const patient = await patientService.getOneById(patientId)
  //     const patientState = props.state as PatientDetail[]
  //     props.stateSetter(patientState.concat(patient))
  //     closeModal()
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       errorCtx.setError('axios error' + error.message)
  //     } else {
  //       errorCtx.setError('unknown error submitting patient')
  //     }
  //   }
  // }

  // const submitNewPatient = async (values: PatientInput) => {
  //   try {
  //     const { patientId } = await patientService.create(values)
  //     const patient = await patientService.getOneById(patientId)
  //     patientsCtx.setPatients(patientsCtx.patients.concat(patient))
  //     closeModal()
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       errorCtx.setError('axios error' + error.message)
  //     } else {
  //       errorCtx.setError('unknown error submitting patient')
  //     }
  //   }
  // }

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

  const closeModal = (): void => {
    setModalOpen(false)
    errorCtx.setError(undefined)
  }

  const openModal = (): void => setModalOpen(true)

  const Form = () => {
    switch (props.type) {
      case 'edit': {
        if (props.state) {
          return (
            <PatientForm
              type={props.type}
              state={props.state}
              service={updatePatient}
              onCancel={closeModal}
            ></PatientForm>
          )
        }
      }
      // case 'add': {
      //   return (
      //     <PatientForm
      //       type={props.type}
      //       state={props.state}
      //       service={addPatient}
      //       onCancel={closeModal}
      //     ></PatientForm>
      //   )
      // }
    }
  }

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
          {Form()}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PatientModal
