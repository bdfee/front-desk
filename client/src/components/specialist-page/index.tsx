import { useEffect, useState } from 'react'
import SpecialistList from './specialist-list'
import AddSpecialistModal from './add-specialist-modal'
import axios from 'axios'
import { Specialist, SpecialistInput } from '../../types'
import specialistService from '../../services/specialist'
import { Button } from '@mui/material'

const SpecialistPage = () => {
  const [specialistList, setSpecialistList] = useState<Specialist[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [editMode, setEditMode] = useState(false)
  const [editRowIdx, setEditRowIdx] = useState(-1)
  const [editRowData, setEditRowData] = useState<Specialist | undefined>()

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const specialists = await specialistService.getAll()
        setSpecialistList(specialists)
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

  const updateSpecialist = async (id: number, object: unknown) => {
    try {
      const updatedSpecialist = await specialistService.updateById(id, object)
      setSpecialistList(
        specialistList.map((s) =>
          s.specialistId === updatedSpecialist.specialistId
            ? updatedSpecialist
            : s,
        ),
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error deleting specialist')
      }
    }
  }

  const handleRowEdit = (rowIdx: number) => {
    setEditMode(!editMode)
    setEditRowIdx(editRowIdx === -1 ? rowIdx : -1)
    setEditRowData(specialistList[rowIdx])
  }

  const handleCellEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
    colName: string,
  ) => {
    if (editRowData) {
      const data = { ...editRowData }
      data[colName] = event.target.value
      setEditRowData(data)
    }
  }

  const handleSaveRow = async () => {
    if (editRowData) {
      try {
        await updateSpecialist(editRowData.specialistId, editRowData)
        setEditMode(false)
        setEditRowIdx(-1)
      } catch (error) {
        console.error('Error saving changes:', error)
      }
    }
  }

  const tableEditor = {
    handleRowEdit,
    handleCellEdit,
    handleSaveRow,
    editMode,
    editRowIdx,
    editRowData,
  }

  const setErrorWithTimeout = (errorMessage: string) => {
    setError(errorMessage)

    const id = setTimeout(() => {
      setError(undefined)
    }, 3000)

    return () => clearTimeout(id)
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
        tableEditor={tableEditor}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add Specialist
      </Button>
      <AddSpecialistModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewSpecialist}
        error={error}
        setError={setErrorWithTimeout}
      />
    </>
  )
}

export default SpecialistPage
