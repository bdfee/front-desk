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
import { Specialist } from '../../types'

interface TableEditorProps {
  handleRowEdit: (rowIds: number) => void
  handleCellEdit: (
    event: React.ChangeEvent<HTMLInputElement>,
    colName: string,
  ) => void
  handleSaveRow: () => void
  editMode: boolean
  editRowIdx: number
  editRowData: Specialist | undefined
}

interface SpecialistListProps {
  specialistList: Specialist[]
  deleteSpecialist: (id: number) => void
  tableEditor: TableEditorProps
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
          {props.specialistList.map((specialist, idx) => {
            return (
              <TableRow key={specialist.specialistId}>
                <TableCell>
                  {props.tableEditor.editMode &&
                  props.tableEditor.editRowIdx === idx &&
                  props.tableEditor.editRowData ? (
                    <input
                      type="text"
                      value={props.tableEditor.editRowData.name}
                      onChange={(e) =>
                        props.tableEditor.handleCellEdit(e, 'name')
                      }
                    />
                  ) : (
                    specialist.name
                  )}
                </TableCell>
                <TableCell>
                  {props.tableEditor.editMode &&
                  props.tableEditor.editRowIdx === idx &&
                  props.tableEditor.editRowData ? (
                    <input
                      type="text"
                      value={props.tableEditor.editRowData.speciality}
                      onChange={(e) =>
                        props.tableEditor.handleCellEdit(e, 'speciality')
                      }
                    />
                  ) : (
                    specialist.speciality
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      props.deleteSpecialist(specialist.specialistId)
                    }
                  >
                    delete
                  </Button>
                  {props.tableEditor.editMode &&
                  props.tableEditor.editRowIdx === idx ? (
                    <>
                      <Button onClick={() => props.tableEditor.handleSaveRow()}>
                        save
                      </Button>
                      <Button
                        onClick={() => props.tableEditor.handleRowEdit(idx)}
                      >
                        cancel
                      </Button>
                    </>
                  ) : (
                    !props.tableEditor.editMode && (
                      <Button
                        onClick={() => props.tableEditor.handleRowEdit(idx)}
                      >
                        edit
                      </Button>
                    )
                  )}
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
