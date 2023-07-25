import { Grid, Box, Typography } from '@mui/material'
import PatientModal from '../patient-modal'

export const PatientHeader = ({
  name,
  specialistName,
}: {
  name: string
  specialistName: string
}) => (
  <Grid container>
    <Grid item xs={9}>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h4">{name}</Typography>
        <Typography>patient of {specialistName}</Typography>
      </Box>
    </Grid>
    <Grid item xs={3}>
      <PatientModal type="update" />
    </Grid>
  </Grid>
)

export default PatientHeader
