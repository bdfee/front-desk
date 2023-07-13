import { Container, Grid } from '@mui/material'
import Patients from './patients'
import Tasks from './tasks'
import RBCDayView from './rbc-day-view'

export const Front = () => {
  return (
    <Container>
      <Grid container spacing={2} alignItems="stretch" justifyContent="center">
        <Grid item xs={6} sx={{ paddingLeft: 0 }}>
          <Grid item xs={12} sx={{ height: '40%', overflow: 'auto' }}>
            <Patients />
          </Grid>
          <Grid item xs={12}>
            <Tasks />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <RBCDayView />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Front
