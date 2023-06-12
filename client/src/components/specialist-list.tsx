import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { Specialist } from '../../types'

interface SpecialistListProps {
  specialistList: Specialist[]
}

const SpecialistList = (props: SpecialistListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Specialty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.specialistList.map((specialist) => {
            return (
              <TableRow key={specialist.specialistId}>
                <TableCell>{specialist.name}</TableCell>
                <TableCell>{specialist.speciality}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SpecialistList
