import { useState } from 'react'
import Table from './table'
import SpecialistModal from '../specialist-modal'
import { Alert, Button } from '@mui/material'
import { queryClient } from '../../App'
import { QueryClientProvider } from 'react-query'

const SpecialistPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const setErrorWithTimeout = (errorMessage: string) => {
    setError(errorMessage)

    const id = setTimeout(() => {
      setError(undefined)
    }, 3000)

    return () => clearTimeout(id)
  }

  const closeModal = () => {
    setModalOpen(false)
    setError(undefined)
  }

  return (
    <QueryClientProvider client={queryClient}>
      {!modalOpen && error && (
        <Alert severity="error" role="alert">
          {error}
        </Alert>
      )}
      <Table setError={setErrorWithTimeout} />
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Add Specialist
      </Button>
      <SpecialistModal
        closeModal={closeModal}
        setError={setErrorWithTimeout}
        modalOpen={modalOpen}
        error={error}
      />
    </QueryClientProvider>
  )
}

export default SpecialistPage
