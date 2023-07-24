import SpecialistPage from './components/specialist-page'
import PatientTable from './components/patient-table'
import PatientInformation from './components/patient-information'
import Calendar from './components/calendar'
import Front from './components/front'
import Tasks from './components/tasks'
import Login from './components/user-admin/login'
import Signup from './components/user-admin/signup'
import Logout from './components/user-admin/logout'
import AppointmentInformation from './components/appointment-information'
import Status from './components/status'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { Typography, Container, Divider, Button, Grid } from '@mui/material'
import { useTokenCtx } from './components/context-providers/token'
import { useSecureLocalStorage } from './components/user-admin/actions'
import LoginStatus from './components/user-admin/login-status'

const App = () => {
  const navigate = useNavigate()
  const tokenCtx = useTokenCtx()

  useSecureLocalStorage(tokenCtx?.addToken, navigate)

  return (
    <div className="App">
      <Container>
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <Typography variant="h2">frontdesk</Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid sx={{ height: 50 }}>
                <Status location="page" />
              </Grid>
              <Grid sx={{ height: 30 }}>
                <LoginStatus />
              </Grid>
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
          </>
        ) : (
          <>
            <Button component={Link} to="/login">
              login
            </Button>
            <Button component={Link} to="/signup">
              create account
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
