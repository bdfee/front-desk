import { useState, ChangeEvent } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  Typography,
} from '@mui/material'
import { Specialist, SpecialistInput } from '../../types'
import { useQuery, useMutation } from 'react-query'
import { sanitizeTextInput, validateTextInput } from '../../validations/inputs'
import specialistService from '../../services/specialist'
import { isSpecialist } from '../../typeUtils'
import 'dayjs/plugin/utc'
import 'dayjs/plugin/timezone'
import { queryClient } from '../../App'

interface TableData {
  specialist: Specialist
  appointmentCount: number
  patientCount: number
}

interface TableProps {
  setError: (errorMessage: string) => () => void
}

const SpecialistTable = ({ setError }: TableProps) => {
  const [tableData, setTableData] = useState<TableData[]>([])
  const [editMode, setEditMode] = useState(false)
  const [editRowIdx, setEditRowIdx] = useState(-1)
  const [editRowData, setEditRowData] = useState<Specialist | undefined>()

  const { error: fetchTableDataError } = useQuery({
    queryKey: ['GET_SPECIALISTS_TABLE'],
    queryFn: specialistService.getTableData,
    onSuccess: (data) => setTableData(data),
    onError: (error: Error) => 'error ' + error.message,
  })

  const deleteSpecialistById = useMutation<void, Error, number>(
    (id: number) => specialistService.deleteById(id),
    {
      onSuccess: (_data, id: number) => {
        queryClient.invalidateQueries('GET_SPECIALISTS')
        setTableData(
          tableData.filter(({ specialist }) => specialist.specialistId !== id),
        )
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )

  const handleUpdateTableRowBySpecialistId = (
    specialistId: number,
    data: Specialist,
  ) => {
    const { appointmentCount, patientCount } = tableData.filter(
      (obj) => obj.specialist.specialistId === specialistId,
    )[0]

    setTableData(
      tableData.map((obj) =>
        obj.specialist.specialistId === specialistId
          ? {
              specialist: data,
              appointmentCount: appointmentCount,
              patientCount: patientCount,
            }
          : obj,
      ),
    )
  }

  const updateTableRowBySpecialistId = useMutation<
    Specialist,
    Error,
    [number, SpecialistInput]
  >(
    (variables) => {
      const [specialistId, values] = variables
      return specialistService.updateById(specialistId, values)
    },
    {
      onSuccess: (data: Specialist, variables: [number, SpecialistInput]) => {
        const [specialistId] = variables
        handleUpdateTableRowBySpecialistId(specialistId, data)
        queryClient.invalidateQueries({
          queryKey: [`UPDATE_SPECIALIST_${specialistId}`],
        })
        queryClient.invalidateQueries({
          queryKey: ['GET_SPECIALISTS'],
        })
      },
      onError: (error: Error) => console.error('Error:', error),
    },
  )

  const handleRowEdit = (rowIdx: number) => {
    if (tableData) {
      setEditMode(!editMode)
      setEditRowIdx(editRowIdx === -1 ? rowIdx : -1)
      setEditRowData(tableData[rowIdx].specialist)
    }
  }

  const handleCellEdit = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    colName: string,
  ) => {
    if (editRowData) {
      const data = { ...editRowData }
      data[colName] = event.target.value
      setEditRowData(data)
    }
  }

  const handleSaveRow = () => {
    if (editRowData === undefined) {
      throw new Error('update row undefined')
    }

    let name
    let speciality

    if (!validateTextInput(editRowData.name)) {
      console.log('invalid update to name')
      return
    } else if (!validateTextInput(editRowData.speciality)) {
      console.log('invalid update to speciality')
      return
    } else {
      name = sanitizeTextInput(editRowData.name)
      speciality = sanitizeTextInput(editRowData.speciality)
    }

    try {
      if (isSpecialist(editRowData)) {
        updateTableRowBySpecialistId.mutate([
          +editRowData.specialistId,
          {
            name,
            speciality,
          },
        ])
        setEditMode(false)
        setEditRowIdx(-1)
      }
    } catch (error) {
      console.log('Error saving changes:' + error)
    }
  }

  if (fetchTableDataError) {
    console.log(fetchTableDataError.message)
  }

  if (updateTableRowBySpecialistId.isError) {
    console.log(updateTableRowBySpecialistId.error.message)
  }

  if (deleteSpecialistById.isError) {
    console.log(deleteSpecialistById.error.message)
  }

  if (!tableData) {
    return <div>fetching table data</div>
  }

  return (
    <TableContainer component={Paper} data-testid="specialist-table">
      <Typography variant="h3">Specialists</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Specialty</TableCell>
            <TableCell>Number of Clients</TableCell>
            <TableCell>Upcoming Appointments</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, idx) => {
            return (
              <TableRow key={row.specialist.specialistId}>
                <TableCell>
                  {editMode && editRowIdx === idx && editRowData ? (
                    <TextField
                      type="text"
                      value={editRowData.name}
                      onChange={(e) => handleCellEdit(e, 'name')}
                      aria-label="Edit name"
                    />
                  ) : (
                    row.specialist.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode && editRowIdx === idx && editRowData ? (
                    <TextField
                      type="text"
                      value={editRowData.speciality}
                      onChange={(e) => handleCellEdit(e, 'speciality')}
                      aria-label="Edit specialty"
                    />
                  ) : (
                    row.specialist.speciality
                  )}
                </TableCell>
                <TableCell>{row.patientCount}</TableCell>
                <TableCell>{row.appointmentCount}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      deleteSpecialistById.mutate(row.specialist.specialistId)
                    }
                    aria-label="Delete specialist"
                  >
                    delete
                  </Button>
                  {editMode && editRowIdx === idx ? (
                    <>
                      <Button
                        onClick={() => handleSaveRow()}
                        aria-label="Save changes"
                      >
                        save
                      </Button>
                      <Button
                        onClick={() => handleRowEdit(idx)}
                        aria-label="Cancel edit"
                      >
                        cancel
                      </Button>
                    </>
                  ) : (
                    !editMode && (
                      <Button
                        onClick={() => handleRowEdit(idx)}
                        aria-label="Edit row"
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

export default SpecialistTable
