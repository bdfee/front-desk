import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { SelectSpecialistProps } from '../../../types'
import { useFetchSpecialists } from './actions'
import { useContext } from 'react'
import { AlertCtx } from '../../../components/context-providers/alert'

const SelectSpecialist = ({
  specialistId,
  setSpecialistId,
}: SelectSpecialistProps) => {
  const alertCtx = useContext(AlertCtx)

  const { data: specialistData, status } = useFetchSpecialists(
    alertCtx?.setAlertPayload,
  )

  if (status === 'error' || status === 'loading') {
    return <div>{status}: fetching specialists</div>
  }

  return (
    <FormControl sx={{ width: 175 }}>
      <InputLabel id="specialist" size="small">
        Specialist
      </InputLabel>
      <Select
        labelId="specialist"
        value={specialistId}
        size="small"
        onChange={({ target }) => setSpecialistId(target.value)}
        input={<OutlinedInput label="Specialist" />}
      >
        {specialistData.map((specialist) => (
          <MenuItem
            key={specialist.specialistId}
            value={specialist.specialistId.toString()}
          >
            {specialist.name}
          </MenuItem>
        ))}
      </Select>
      {specialistId && (
        <Button
          style={{
            color: 'blue',
          }}
          size="small"
          onClick={() => setSpecialistId('')}
        >
          clear
        </Button>
      )}
    </FormControl>
  )
}

export default SelectSpecialist
