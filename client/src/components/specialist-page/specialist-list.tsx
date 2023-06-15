import { useState } from 'react'
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
import { Specialist, SpecialistInput } from '../../types'
import {
  sanitizeTextInput,
  validateTextInput,
} from '../../validations/specialist'
import { isSpecialist } from '../../typeUtils'

interface SpecialistListProps {
  specialistList: Specialist[]
  deleteSpecialist: (id: number) => void
  updateSpecialist: (id: number, object: SpecialistInput) => void
  setError: (errorMessage: string) => void
}

const SpecialistList = (props: SpecialistListProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editRowIdx, setEditRowIdx] = useState(-1)
  const [editRowData, setEditRowData] = useState<Specialist | undefined>()

  const handleRowEdit = (rowIdx: number) => {
    setEditMode(!editMode)
    setEditRowIdx(editRowIdx === -1 ? rowIdx : -1)
    setEditRowData(props.specialistList[rowIdx])
  }

  const handleCellEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
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
      props.setError('invalid update to name')
      return
    } else if (!validateTextInput(editRowData.speciality)) {
      props.setError('invalid update to speciality')
      return
    } else {
      name = sanitizeTextInput(editRowData.name)
      speciality = sanitizeTextInput(editRowData.speciality)
    }

    try {
      if (isSpecialist(editRowData)) {
        props.updateSpecialist(editRowData.specialistId, {
          name,
          speciality,
        })
        setEditMode(false)
        setEditRowIdx(-1)
      }
    } catch (error) {
      props.setError('Error saving changes:' + error)
    }
  }
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
                  {editMode && editRowIdx === idx && editRowData ? (
                    <input
                      type="text"
                      value={editRowData.name}
                      onChange={(e) => handleCellEdit(e, 'name')}
                    />
                  ) : (
                    specialist.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode && editRowIdx === idx && editRowData ? (
                    <input
                      type="text"
                      value={editRowData.speciality}
                      onChange={(e) => handleCellEdit(e, 'speciality')}
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
                  {editMode && editRowIdx === idx ? (
                    <>
                      <Button onClick={() => handleSaveRow()}>save</Button>
                      <Button onClick={() => handleRowEdit(idx)}>cancel</Button>
                    </>
                  ) : (
                    !editMode && (
                      <Button onClick={() => handleRowEdit(idx)}>edit</Button>
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
