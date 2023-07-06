import InformationList from './information-list'
import AppointmentModal from '../appointment-modal'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { queryClient } from '../../App'
import { QueryClientProvider } from 'react-query'
import { useDeleteAppointmentById } from '../appointmentActions'

const DeleteButton = ({ id }: { id: number }) => {
  const navigate = useNavigate()
  const deleteAppointment = useDeleteAppointmentById()

  const handleDelete = () => {
    deleteAppointment.mutate(id)
    return navigate('/calendar')
  }

  return <Button onClick={handleDelete}>delete</Button>
}

const AppointmentInformation = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>appointment not found, returning to calendar</div>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <InformationList id={+id} />
      <Button onClick={() => setModalOpen(true)}>edit</Button>
      <DeleteButton id={+id} />
      <AppointmentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        serviceType="update"
      />
    </QueryClientProvider>
  )
}

export default AppointmentInformation
