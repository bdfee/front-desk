import SpecialistPage from './components/specialist-page'
import PatientTable from './components/patient-table'
import PatientInformation from './components/patient-information'
import Calendar from './components/calendar'
import Front from './components/front'
import Tasks from './components/tasks'
import Login from './components/login'
import Signup from './components/signup'
import Logout from './components/logout'
import AppointmentInformation from './components/appointment-information'
import Status from './components/status'
import { Route, Routes, Link } from 'react-router-dom'
import { Typography, Container, Divider, Button, Grid } from '@mui/material'
import { useTokenCtx } from './components/context-providers/token'

const App = () => {
  const tokenCtx = useTokenCtx()
  return (
    <div className="App">
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
        {tokenCtx?.token ? (
          <>
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
            <Button component={Link} to="/logout">
              logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login">
              login
            </Button>
            <Button component={Link} to="/signup">
              signup
            </Button>
          </>
        )}

        <Divider style={{ marginBottom: '1em' }} />
        <Routes>
          {tokenCtx?.token ? (
            <>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/patients" element={<PatientTable />} />
              <Route path="/patients/:id" element={<PatientInformation />} />
              <Route
                path="/calendar/:id"
                element={<AppointmentInformation />}
              />
              <Route path="/specialists" element={<SpecialistPage />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/" element={<Front />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/" element={<div>welcome</div>} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </Container>
    </div>
  )
}

export default App
