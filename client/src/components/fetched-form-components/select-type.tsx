import {
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { SelectTypeProps } from '../../types'
import Swatch from '../appointment-modal/swatch'

const SelectType = ({ type, setType }: SelectTypeProps) => {
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-type" size="small">
        Appointment type
      </InputLabel>

      <Select
        labelId="select-type"
        value={type}
        size="small"
        onChange={({ target }) => setType(target.value)}
        input={<OutlinedInput label="Appointment type" />}
      >
        <MenuItem value="intake">
          Intake
          {!type && <Swatch color="gray" />}
        </MenuItem>
        <MenuItem value="physicalTherapy">
          Physical Therapy
          {!type && <Swatch color="red" />}
        </MenuItem>
        <MenuItem value="nutrition">
          Nutrition
          {!type && <Swatch color="green" />}
        </MenuItem>
      </Select>
      {type && (
        <Button
          style={{
            color: 'primary',
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
