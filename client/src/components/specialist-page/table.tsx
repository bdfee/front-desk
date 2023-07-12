import { useState, ChangeEvent, useContext } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { TextField, Paper, Button, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { Specialist } from '../../types'
import { sanitizeTextInput, validateTextInput } from '../../validations/inputs'
import { isSpecialist } from '../../typeUtils'
import 'dayjs/plugin/utc'
import 'dayjs/plugin/timezone'
import {
  useGetTableData,
  useDeleteSpecialistById,
  useUpdateSpecialistById,
} from './actions'
import { AlertCtx } from '../../App'

const SpecialistTable = () => {
  const [editMode, setEditMode] = useState(false)
  const [editRowIdx, setEditRowIdx] = useState(-1)
  const [editRowData, setEditRowData] = useState<Specialist | undefined>()

  const queryClient = useQueryClient()
  const alertCtx = useContext(AlertCtx)

  const { data: tableData, status: tableDataStatus } = useGetTableData(
    alertCtx?.setAlertPayload,
  )

  const { mutate: deleteSpecialistById } = useDeleteSpecialistById(
    queryClient,
    alertCtx?.setAlertPayload,
  )
  const { mutate: updateSpecialistById } = useUpdateSpecialistById(
    queryClient,
    alertCtx?.setAlertPayload,
  )

  if (tableDataStatus === 'loading' || tableDataStatus === 'error') {
    return <Typography>{tableDataStatus}: table data</Typography>
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
      alertCtx?.setAlertPayload('error', 'invalid update to name', 'page')
      return
    } else if (!validateTextInput(editRowData.speciality)) {
      alertCtx?.setAlertPayload('error', 'invalid update to speciality', 'page')
      return
    } else {
      name = sanitizeTextInput(editRowData.name)
      speciality = sanitizeTextInput(editRowData.speciality)
    }

    if (isSpecialist(editRowData)) {
      updateSpecialistById({
        specialistId: +editRowData.specialistId,
        values: { name, speciality },
      })
      setEditMode(false)
      setEditRowIdx(-1)
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
