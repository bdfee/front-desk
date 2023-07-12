import SpecialistPage from './components/specialist-page'
import PatientTable from './components/patient-table'
import PatientInformation from './components/patient-information'
import Calendar from './components/calendar'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Typography, Container, Divider, Button, Grid } from '@mui/material'
import { createContext, useState } from 'react'
import AppointmentInformation from './components/appointment-information'
import Status from './components/status'

type AlertType = 'error' | 'success'
type AlertLocation = 'modal' | 'page'
type AlertMessage = string

interface AlertPayload {
  type: AlertType
  message: AlertMessage
  location: AlertLocation
}

type NullableAlertPayload = AlertPayload | undefined

interface AlertCtxType {
  setAlertPayload: (
    type: AlertType,
    message: AlertMessage,
    location: AlertLocation,
  ) => () => void
  alertPayload: NullableAlertPayload
}

export const AlertCtx = createContext<AlertCtxType | null>(null)

const App = () => {
  const [alertPayload, setAlertPayload] = useState<NullableAlertPayload>()

  const setAlertWithTimeout: AlertCtxType['setAlertPayload'] = (
    type,
    message,
    location,
  ) => {
    setAlertPayload({ type, message, location })

    const id = setTimeout(() => {
      setAlertPayload(undefined)
    }, 3000)

    return () => clearTimeout(id)
  }

  const AlertCtxValue: AlertCtxType = {
    setAlertPayload: setAlertWithTimeout,
    alertPayload,
  }

  return (
    <div className="App">
      <Router>
        <AlertCtx.Provider value={AlertCtxValue}>
          <Container>
            <Container>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <Typography variant="h2" style={{ marginBottom: '.05em' }}>
                    frontdesk
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Status location="page" />
                </Grid>
              </Grid>
            </Container>
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
              <Route
                path="/calendar/:id"
                element={<AppointmentInformation />}
              />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/" element={<div>home</div>} />
            </Routes>
          </Container>
        </AlertCtx.Provider>
      </Router>
    </div>
  )
}

export default App
