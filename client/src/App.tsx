import SpecialistPage from './components/specialist-page'
import PatientPage from './components/patients-page'
import InfoIndex from './components/patients-page/info-index'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Typography, Container, Divider, Button } from '@mui/material'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react'
import { PatientDetail } from './types'
import axios from 'axios'
import patientService from './services/patients'

interface PatientContextType {
  setPatientList: Dispatch<SetStateAction<PatientDetail[]>>
  patientList: PatientDetail[]
  setError: (errorMessage: string | undefined) => () => void
  error: string | undefined
}

export const PatientCtx = createContext<PatientContextType | null>(null)

const App = () => {
  const [error, setError] = useState<string | undefined>()
  const [patientList, setPatientList] = useState<PatientDetail[]>([])

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patients = await patientService.getAll()
        setPatientList(patients)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching patients')
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

  const CtxValues: PatientContextType = {
    setPatientList,
    patientList,
    setError: setErrorWithTimeout,
    error,
  }

  return (
    <div className="App">
      <Router>
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
                <PatientCtx.Provider value={CtxValues}>
                  <PatientPage />
                </PatientCtx.Provider>
              }
            />
            <Route
              path="/patients/:id"
              element={
                <PatientCtx.Provider value={CtxValues}>
                  <InfoIndex />
                </PatientCtx.Provider>
              }
            />
            <Route path="/specialists" element={<SpecialistPage />} />
            <Route path="/" element={<div>home</div>} />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App
