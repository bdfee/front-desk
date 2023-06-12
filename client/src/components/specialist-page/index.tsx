import { useEffect, useState } from 'react'
import SpecialistList from './specialist-list'
import SpecialistForm from './specialist-form'
import axios from 'axios'
import { Specialist, SpecialistInput } from '../../../types'
import specialistService from '../../services/specialist'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
  Button,
} from '@mui/material'

interface ModalProps {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: SpecialistInput) => void
  error?: string
}

const AddSpecialistModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: ModalProps) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <SpecialistForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
)

const SpecialistPage = () => {
  const [specialistList, setSpecialistList] = useState<Specialist[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setSpecialistList(await specialistService.getAll())
      } catch (error) {
        console.log(error)
      }
    }
    fetchSpecialists()
  }, [])

  const submitNewSpecialist = async (values: SpecialistInput) => {
    try {
      const specialist = await specialistService.create(values)
      setSpecialistList(specialistList.concat(specialist))
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error submitting specialist')
      }
    }
  }

  const deleteSpecialist = async (id: number) => {
    try {
      await specialistService.deleteById(id)
      setSpecialistList(
        specialistList.filter(({ specialistId }) => specialistId !== id),
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error deleting specialist')
      }
    }
  }

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const openModal = (): void => setModalOpen(true)

  return (
    <>
      <SpecialistList
        specialistList={specialistList}
        deleteSpecialist={deleteSpecialist}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add Entry
      </Button>
      <AddSpecialistModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewSpecialist}
        error={error}
      />
    </>
  )
}

export default SpecialistPage
