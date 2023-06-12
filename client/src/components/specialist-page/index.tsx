import { useEffect, useState } from 'react'
import SpecialistList from './specialist-list'
import AddSpecialistModal from './add-specialist-modal'
import axios from 'axios'
import { Specialist, SpecialistInput } from '../../../types'
import specialistService from '../../services/specialist'
import { Button } from '@mui/material'

const SpecialistPage = () => {
  const [specialistList, setSpecialistList] = useState<Specialist[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setSpecialistList(await specialistService.getAll())
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching specialists')
        }
      }
    }
    fetchSpecialists()
  }, [])

  const submitNewSpecialist = async (values: SpecialistInput) => {
    try {
      const specialist = await specialistService.create(values)
      setSpecialistList(specialistList.concat(specialist))
      setModalOpen(false)
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
        Add Specialist
      </Button>
      <AddSpecialistModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewSpecialist}
        error={error}
        setError={setError}
      />
    </>
  )
}

export default SpecialistPage
