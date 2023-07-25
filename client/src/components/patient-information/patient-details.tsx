import {
  Grid,
  TableContainer,
  TableCell,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
} from '@mui/material'
import { PatientDetail } from '../../types'

export const PatientDetails = ({
  patient: { gender, dateOfBirth, email, address },
}: {
  patient: PatientDetail
}) => (
  <Grid container spacing={2} component={Paper} sx={{ marginBottom: '20px' }}>
    <Grid item xs={12} sm={6}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Gender</Typography>
              </TableCell>
              <TableCell>{gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Date of Birth</Typography>
              </TableCell>
              <TableCell>{dateOfBirth}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Email</Typography>
              </TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Address</Typography>
              </TableCell>
              <TableCell>{address}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  </Grid>
)

export default PatientDetails
