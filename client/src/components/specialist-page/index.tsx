import { useEffect, useState } from 'react'
import SpecialistTable from './specialist-table'
import AddSpecialistModal from './add-specialist-modal'
import axios from 'axios'
import { Specialist, SpecialistInput } from '../../types'
import specialistService from '../../services/specialist'
import { Button, Alert } from '@mui/material'

export interface TableData {
  specialist: Specialist
  appointmentCount: number
  patientCount: number
}

const SpecialistPage = () => {
  const [tableData, setTableData] = useState<TableData[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const tableData = await specialistService.getTableData()
        setTableData(tableData)
        console.log(tableData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTableData()
  }, [])

  const submitNewSpecialist = async (values: SpecialistInput) => {
    try {
      const specialist = await specialistService.create(values)

      setTableData(
        tableData.concat({
          specialist,
          appointmentCount: 0,
          patientCount: 0,
        }),
      )
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
      setTableData(
        tableData.filter(({ specialist }) => specialist.specialistId !== id),
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error deleting specialist')
      }
    }
  }

  const updateSpecialist = async (id: number, specialist: SpecialistInput) => {
    const { name, speciality } = specialist
    const existingTableData = tableData.filter(
      (obj) => obj.specialist.specialistId === id,
    )

    try {
      const updatedSpecialist = await specialistService.updateById(id, {
        name,
        speciality,
      })
      setTableData(
        tableData.map((obj) =>
          obj.specialist.specialistId === updatedSpecialist.specialistId
            ? {
                specialist: updatedSpecialist,
                appointmentCount: existingTableData[0].appointmentCount,
                patientCount: existingTableData[0].patientCount,
              }
            : obj,
        ),
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error updating specialist')
      }
    }
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
      {!modalOpen && error && (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      )}
      <SpecialistTable
        tableData={tableData}
        deleteSpecialist={deleteSpecialist}
        updateSpecialist={updateSpecialist}
        setError={setErrorWithTimeout}
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
