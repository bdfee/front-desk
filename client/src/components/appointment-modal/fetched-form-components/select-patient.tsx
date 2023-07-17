import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { useContext } from 'react'
import { AlertCtx } from '../../../components/context-providers/alert'

import { SelectPatientProps } from '../../../types'
import { useFetchPatients } from './actions'

const SelectPatient = ({ patientId, setPatientId }: SelectPatientProps) => {
  const alertCtx = useContext(AlertCtx)

  const { data: patientsData, status: patientsStatus } = useFetchPatients(
    alertCtx?.setAlertPayload,
  )
  if (patientsStatus === 'error' || patientsStatus == 'loading') {
    return <div>{patientsStatus}: fetching patients</div>
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
        {patientsData.map((patient) => {
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
