import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { useQuery } from 'react-query'
import { PatientDetail } from '../../../types'
import patientService from '../../../services/patients'

export interface SelectPatientProps {
  patientId: string
  setPatientId: Dispatch<SetStateAction<string>>
}

const SelectPatient = ({ patientId, setPatientId }: SelectPatientProps) => {
  const [patients, setPatients] = useState<PatientDetail[]>([])

  const { error, data } = useQuery('GET_PATIENTS', patientService.getAll)

  useEffect(() => {
    if (data) {
      setPatients(data)
    }
  }, [data])

  if (!data) {
    return (
      <>
        <InputLabel id="loading-patients" size="small">
          Loading Patients
        </InputLabel>
      </>
    )
  }

  if (error) {
    return <div>error fetching patients</div>
  }

  return (
    <FormControl
      sx={{
        width: 175,
      }}
    >
      <InputLabel id="select-patients" size="small">
        Patient
      </InputLabel>
      <Select
        labelId="select-patients"
        value={patientId}
        size="small"
        onChange={({ target }) => setPatientId(target.value)}
        input={<OutlinedInput label="Patient" />}
      >
        {patients.map((patient) => {
          return (
            <MenuItem
              key={patient.patientId}
              value={patient.patientId.toString()}
            >
              {patient.name}
            </MenuItem>
          )
        })}
      </Select>
      {patientId && (
        <Button
          style={{
            color: 'blue',
          }}
          size="small"
          onClick={() => setPatientId('')}
        >
          clear
        </Button>
      )}
    </FormControl>
  )
}

export default SelectPatient
