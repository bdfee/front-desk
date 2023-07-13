import { useState } from 'react'
import Table from './table'
import SpecialistModal from '../specialist-modal'
import { Button } from '@mui/material'

const SpecialistPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const closeModal = () => setModalOpen(false)

  return (
    <>
      <Table />
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Add Specialist
      </Button>
      <SpecialistModal closeModal={closeModal} modalOpen={modalOpen} />
    </>
  )
}

export default SpecialistPage
