import InformationList from './information-list'
import AppointmentModal from '../appointment-modal'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { queryClient } from '../../App'
import { QueryClientProvider } from 'react-query'

const AppointmentInformation = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>error</div>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <InformationList id={+id} />
      <Button onClick={() => setModalOpen(true)}>edit appointment</Button>
      <AppointmentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        serviceType="update"
      />
    </QueryClientProvider>
  )
}

export default AppointmentInformation
