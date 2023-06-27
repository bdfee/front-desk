import {
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface SelectTypeProps {
  type: string
  setType: Dispatch<SetStateAction<string>>
}

const SelectType = ({ type, setType }: SelectTypeProps) => {
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-type">Appointment type</InputLabel>

      <Select
        labelId="select-type"
        value={type}
        onChange={({ target }) => setType(target.value)}
        input={<OutlinedInput label="Appointment type" />}
      >
        <MenuItem value="intake">Intake</MenuItem>
        <MenuItem value="physicalTherapy">Physical Therapy</MenuItem>
        <MenuItem value="nutrition">Nutrition</MenuItem>
      </Select>
      {type && (
        <Button
          style={{
            color: 'blue',
          }}
          size="small"
          onClick={() => setType('')}
        >
          clear
        </Button>
      )}
    </FormControl>
  )
}

export default SelectType
