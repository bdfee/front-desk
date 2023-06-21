import SpecialistPage from './components/specialist-page'
import PatientTable from './components/patient-table'
import PatientInformation from './components/patient-information'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Typography, Container, Divider, Button } from '@mui/material'
import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { PatientDetail } from './types'
import { isAxiosError } from 'axios'
import patientService from './services/patients'

interface ErrorCtxType {
  setError: (errorMessage: string | undefined) => () => void
  error: string | undefined
}

interface PatientsCtxType {
  patients: PatientDetail[]
  setPatients: Dispatch<SetStateAction<PatientDetail[]>>
}

export const ErrorCtx = createContext<ErrorCtxType | null>(null)
export const PatientsCtx = createContext<PatientsCtxType | null>(null)

const App = () => {
  const [error, setError] = useState<string | undefined>()
  const [patients, setPatients] = useState<PatientDetail[]>([])

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientList = await patientService.getAll()
        setPatients(patientList)
      } catch (error) {
        if (isAxiosError(error)) {
          setError('axios error' + error.message)
        } else {
          setError('unknown error fetching patients')
        }
      }
    }
    fetchPatients()
  }, [])

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

  const PatientCtxValue: PatientsCtxType = {
    setPatients,
    patients,
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
            <Divider style={{ marginBottom: '1em' }} />
            <Routes>
              <Route
                path="/patients"
                element={
                  <PatientsCtx.Provider value={PatientCtxValue}>
                    <PatientTable />
                  </PatientsCtx.Provider>
                }
              />
              <Route
                path="/patients/:id"
                element={
                  <PatientsCtx.Provider value={PatientCtxValue}>
                    <PatientInformation />
                  </PatientsCtx.Provider>
                }
              />
              <Route path="/specialists" element={<SpecialistPage />} />
              <Route path="/" element={<div>home</div>} />
            </Routes>
          </Container>
        </ErrorCtx.Provider>
      </Router>
    </div>
  )
}

export default App
