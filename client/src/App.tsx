import SpecialistPage from './components/specialist-page'
import PatientTable from './components/patient-table'
import PatientInformation from './components/patient-information'
import Calendar from './components/calendar'
import Front from './components/front'
import Tasks from './components/tasks'
import Login from './components/login'
import TokenProvider from './components/context-providers/token'
import AlertProvider from './components/context-providers/alert'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Typography, Container, Divider, Button, Grid } from '@mui/material'

import AppointmentInformation from './components/appointment-information'
import Status from './components/status'

const App = () => {
  return (
    <div className="App">
      <Router>
        <AlertProvider>
          <TokenProvider>
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
              <Button component={Link} to="/tasks">
                tasks
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
              <Button component={Link} to="/login">
                login
              </Button>
              <Divider style={{ marginBottom: '1em' }} />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/patients" element={<PatientTable />} />
                <Route path="/patients/:id" element={<PatientInformation />} />
                <Route path="/specialists" element={<SpecialistPage />} />
                <Route
                  path="/calendar/:id"
                  element={<AppointmentInformation />}
                />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/" element={<Front />} />
              </Routes>
            </Container>
          </TokenProvider>
        </AlertProvider>
      </Router>
    </div>
  )
}

export default App
