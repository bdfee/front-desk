import SpecialistPage from './components/specialist-page'
import PatientPage from './components/patients-page'
import PatientInformation from './components/patient-information'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Typography, Container, Divider, Button } from '@mui/material'

const App = () => {
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
            <Route path="/specialists" element={<SpecialistPage />} />
            <Route path="/patients" element={<PatientPage />} />
            <Route path="/patients/:id" element={<PatientInformation />} />
            <Route path="/" element={<div>home</div>} />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App
