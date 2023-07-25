import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Button,
  Grid,
  Container,
} from '@mui/material'
import PatientForm from './patient-form'
import { PatientModalProps } from '../../types'
import Status from '../status'

const PatientModal = (props: PatientModalProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.openModalOnLoad) openModal()
  }, [])

  const closeModal = (): void => {
    setModalOpen(false)
  }

  const openModal = (): void => setModalOpen(true)

  return (
    <>
      <Button variant="contained" size="small" onClick={() => openModal()}>
        {props.type} patient
      </Button>
      <Dialog fullWidth={true} open={modalOpen} onClose={closeModal}>
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} sx={{ paddingLeft: 0 }}>
              <DialogTitle>Add a new patient</DialogTitle>
            </Grid>
            <Grid item xs={6}>
              <Status location="modal" />
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <DialogContent>
          <PatientForm type={props.type} closeModal={closeModal}></PatientForm>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PatientModal
