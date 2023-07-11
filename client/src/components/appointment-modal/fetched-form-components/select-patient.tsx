import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material'

import { PatientDetail, SelectPatientProps } from '../../../types'
import { useFetchPatients } from './actions'

const SelectPatient = ({ patientId, setPatientId }: SelectPatientProps) => {
  let patients: PatientDetail[]

  const { data: patientsData, status: patientsStatus } = useFetchPatients()

  if (patientsStatus === 'error') {
    return <div>error fetching patients</div>
  }

  if (patientsStatus === 'loading') {
    patients = []
  } else patients = patientsData

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
