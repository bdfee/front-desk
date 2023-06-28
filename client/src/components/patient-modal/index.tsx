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
import {
  Dispatch,
  useContext,
  useState,
  SetStateAction,
  useEffect,
} from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorCtx } from '../../App'
import patientService from '../../services/patients'
import axios from 'axios'
import { QueryClientProvider, QueryClient } from 'react-query'

interface UpdatePatientModalProps {
  type: string
  state: PatientDetail | undefined
  stateSetter: Dispatch<SetStateAction<PatientDetail | undefined>>
}

interface AddPatientModalProps {
  type: string
  state: PatientDetail[] | undefined
  stateSetter: Dispatch<SetStateAction<PatientDetail[] | undefined>>
}

type PatientModalProps = UpdatePatientModalProps | AddPatientModalProps

const queryClient = new QueryClient()

const PatientModal = (props: PatientModalProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const errorCtx = useContext(ErrorCtx)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.openModalOnLoad) {
      openModal()
    }
  }, [])

  if (!errorCtx) {
    return <div>no context here</div>
  }

  const updatePatient = async (id: number, values: PatientInput) => {
    if (props.type === 'update') {
      const { stateSetter } = props as UpdatePatientModalProps
      try {
        const updatedPatient = await patientService.updateById(id, values)
        stateSetter(updatedPatient)
        closeModal()
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorCtx.setError('axios error' + error.message)
        } else {
          errorCtx.setError('unknown error updating specialist')
        }
      }
    }
  }

  const addPatient = async (values: PatientInput) => {
    if (props.type !== 'update') {
      const { stateSetter, state } = props as AddPatientModalProps
      try {
        const patient = await patientService.create(values)
        stateSetter(state?.concat(patient))
        closeModal()
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorCtx.setError('axios error' + error.message)
        } else {
          errorCtx.setError('unknown error submitting patient')
        }
      }
    }
  }

  const closeModal = (): void => {
    setModalOpen(false)
    errorCtx.setError(undefined)
  }

  const openModal = (): void => setModalOpen(true)

  return (
    <QueryClientProvider client={queryClient}>
      <Button onClick={() => openModal()}>{props.type} patient</Button>
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
            type={props.type}
            state={props.state}
            service={props.type === 'update' ? updatePatient : addPatient}
            onCancel={closeModal}
          ></PatientForm>
        </DialogContent>
      </Dialog>
    </QueryClientProvider>
  )
}

export default PatientModal
