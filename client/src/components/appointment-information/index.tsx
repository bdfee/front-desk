import InformationList from './information-list'
import AppointmentModal from '../appointment-modal'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteAppointmentById } from './actions'

const AppointmentInformation = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: deleteAppointmentById } =
    useDeleteAppointmentById(queryClient)

  if (!id) {
    return <div>appointment not found, returning to calendar</div>
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
