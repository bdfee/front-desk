import InformationList from './information-list'
import AppointmentModal from '../appointment-modal'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import appointmentService from '../../services/appointment'
import { AppointmentDetail } from '../../types'

const DeleteButton = ({ id }: { id: number }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: deleteAppointmentById } = useMutation<void, Error, number>({
    mutationFn: (appointmentId: number) =>
      appointmentService.deleteById(appointmentId),
    onSuccess: (data, appointmentId: number) => {
      queryClient.setQueryData<AppointmentDetail[]>(
        ['APPOINTMENTS'],
        (oldAppointments) => {
          return (oldAppointments || []).filter(
            (appointment) => appointment.appointmentId !== appointmentId,
          )
        },
      )
      queryClient.invalidateQueries(['SPECIALISTS_TABLE'])
      queryClient.removeQueries(['APPOINTMENT', appointmentId])
    },
  })

  const handleDelete = () => {
    deleteAppointmentById(id)
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
    <>
      <InformationList id={+id} />
      <Button onClick={() => setModalOpen(true)}>edit</Button>
      <DeleteButton id={+id} />
      <AppointmentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        serviceType="update"
      />
    </>
  )
}

export default AppointmentInformation
