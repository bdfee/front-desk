import InformationList from './information-list'
import AppointmentModal from '../appointment-modal'
import { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteAppointmentById } from './actions'
import { AlertCtx } from '../../App'

const AppointmentInformation = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const alertCtx = useContext(AlertCtx)

  const { mutate: deleteAppointmentById } = useDeleteAppointmentById(
    queryClient,
    alertCtx?.setAlertPayload,
  )

  if (!id) {
    return (
      <>
        {setTimeout(() => navigate('/calendar'))}
        <Typography>appointment not found, returning to calender</Typography>
      </>
    )
  }

  const handleDelete = () => {
    deleteAppointmentById(+id)
    return navigate('/calendar')
  }

  return (
    <>
      <InformationList id={+id} />
      <Button onClick={() => setModalOpen(true)}>edit</Button>
      <Button onClick={handleDelete}>delete</Button>
      <AppointmentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        serviceType="update"
      />
    </>
  )
}

export default AppointmentInformation
