import { useState, ChangeEvent } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { TextField, Paper, Button, Typography } from '@mui/material'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Specialist, SpecialistInput, TableData, TableProps } from '../../types'
import { sanitizeTextInput, validateTextInput } from '../../validations/inputs'
import { isSpecialist } from '../../typeUtils'
import 'dayjs/plugin/utc'
import 'dayjs/plugin/timezone'
import specialistService from '../../services/specialist'

const SpecialistTable = ({ setError }: TableProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editRowIdx, setEditRowIdx] = useState(-1)
  const [editRowData, setEditRowData] = useState<Specialist | undefined>()

  const queryClient = useQueryClient()

  const {
    data: tableData,
    error: getTableDataError,
    status: tableDataStatus,
  } = useQuery<TableData[], Error>({
    queryKey: ['SPECIALISTS_TABLE'],
    queryFn: specialistService.getTableData,
  })

  const { mutate: deleteSpecialistById } = useMutation({
    mutationFn: specialistService.deleteById,
    onSuccess: (_, specialistId: number) => {
      queryClient.setQueryData<Specialist[]>(
        ['SPECIALISTS'],
        (oldSpecialists = []) =>
          oldSpecialists.filter(
            (specialist) => specialist.specialistId !== specialistId,
          ),
      )

      queryClient.setQueryData<TableData[]>(
        ['SPECIALISTS_TABLE'],
        (oldTableData = []) =>
          oldTableData.filter(
            (row) => row.specialist.specialistId !== specialistId,
          ),
      )
    },
  })

  const { mutate: updateSpecialistById } = useMutation<
    Specialist,
    Error,
    { specialistId: number; values: SpecialistInput }
  >({
    mutationFn: ({ specialistId, values }) =>
      specialistService.updateById(specialistId, values),
    onSuccess: (_, { specialistId, values }) => {
      queryClient.setQueryData<TableData[]>(
        ['SPECIALISTS_TABLE'],
        (oldTableData = []) =>
          oldTableData.map((row) =>
            row.specialist.specialistId === specialistId
              ? {
                  specialist: {
                    specialistId: specialistId,
                    name: String(values.name),
                    speciality: String(values.speciality),
                  },
                  appointmentCount: +row.appointmentCount,
                  patientCount: +row.patientCount,
                }
              : row,
          ),
      )

      queryClient.setQueryData<Specialist[]>(
        ['SPECIALISTS'],
        (oldSpecialistsData = []) =>
          oldSpecialistsData.map((specialist) =>
            specialist.specialistId === specialistId
              ? {
                  specialistId,
                  name: String(values.name),
                  speciality: String(values.speciality),
                }
              : specialist,
          ),
      )
    },
  })

  if (tableDataStatus === 'loading') {
    return <div>fetching table data</div>
  }

  if (tableDataStatus === 'error') {
    return <div>error fetching table data: {getTableDataError.message}</div>
  }

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
      setError('invalid update to name')
      return
    } else if (!validateTextInput(editRowData.speciality)) {
      setError('invalid update to speciality')
      return
    } else {
      name = sanitizeTextInput(editRowData.name)
      speciality = sanitizeTextInput(editRowData.speciality)
    }

    try {
      if (isSpecialist(editRowData)) {
        updateSpecialistById({
          specialistId: +editRowData.specialistId,
          values: { name, speciality },
        })
        setEditMode(false)
        setEditRowIdx(-1)
      }
    } catch (error) {
      console.log('Error saving changes:' + error)
    }
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
                    disabled={
                      row.patientCount !== 0 || row.appointmentCount !== 0
                    }
                    onClick={() =>
                      deleteSpecialistById(+row.specialist.specialistId)
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
