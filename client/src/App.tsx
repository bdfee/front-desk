import SpecialistPage from './components/specialist-page'
import PatientTable from './components/patient-table'
import PatientInformation from './components/patient-information'
import RBC from './components/appointment/calendar'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Typography, Container, Divider, Button } from '@mui/material'
import { createContext, useState } from 'react'

interface ErrorCtxType {
  setError: (errorMessage: string | undefined) => () => void
  error: string | undefined
}

export const ErrorCtx = createContext<ErrorCtxType | null>(null)

const App = () => {
  const [error, setError] = useState<string | undefined>()

  const setErrorWithTimeout = (errorMessage: string | undefined) => {
    setError(errorMessage)

    const id = setTimeout(() => {
      setError(undefined)
    }, 3000)

    return () => clearTimeout(id)
  }

  const ErrorCtxValue: ErrorCtxType = {
    setError: setErrorWithTimeout,
    error,
  }

  return (
    <div className="App">
      <Router>
        <ErrorCtx.Provider value={ErrorCtxValue}>
          <Container>
            <Typography variant="h2" style={{ marginBottom: '.05em' }}>
              frontdesk
            </Typography>
            <Button component={Link} to="/" style={{ margin: '0px 5px' }}>
              front
            </Button>
            <Button component={Link} to="/specialists">
              specialists
            </Button>
            <Button component={Link} to="/patients">
              patients
            </Button>
            <Button component={Link} to="/calendar">
              calendar
            </Button>
            <Divider style={{ marginBottom: '1em' }} />
            <Routes>
              <Route path="/patients" element={<PatientTable />} />
              <Route path="/patients/:id" element={<PatientInformation />} />
              <Route path="/specialists" element={<SpecialistPage />} />
              <Route path="/calendar" element={<RBC />} />
              <Route path="/" element={<div>home</div>} />
            </Routes>
          </Container>
        </ErrorCtx.Provider>
      </Router>
    </div>
  )
}

export default App
