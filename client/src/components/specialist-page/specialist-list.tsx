import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'
import { Specialist } from '../../../types'

interface SpecialistListProps {
  specialistList: Specialist[]
  deleteSpecialist: (id: number) => void
}

const SpecialistList = (props: SpecialistListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Specialty</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.specialistList.map((specialist) => {
            return (
              <TableRow key={specialist.specialistId}>
                <TableCell>{specialist.name}</TableCell>
                <TableCell>{specialist.speciality}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      props.deleteSpecialist(specialist.specialistId)
                    }
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SpecialistList
