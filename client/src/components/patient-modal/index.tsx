import { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
  Button,
} from '@mui/material'
import { ErrorCtx } from '../../App'
import PatientForm from './patient-form'
import { PatientModalProps } from '../../types'

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

  const closeModal = (): void => {
    setModalOpen(false)
    errorCtx.setError(undefined)
  }

  const openModal = (): void => setModalOpen(true)

  return (
    <>
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
          <PatientForm type={props.type} closeModal={closeModal}></PatientForm>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PatientModal
