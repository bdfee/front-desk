import { useState, Dispatch, SetStateAction, useEffect } from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { useQuery } from 'react-query'
import { Specialist } from '../../../types'
import specialistService from '../../../services/specialist'

export interface SelectSpecialistProps {
  specialistId: string
  setSpecialistId: Dispatch<SetStateAction<string>>
}

const SelectSpecialist = ({
  specialistId,
  setSpecialistId,
}: SelectSpecialistProps) => {
  const [specialists, setSpecialists] = useState<Specialist[]>([])

  const { error, data } = useQuery('GET_SPECIALISTS', specialistService.getAll)

  useEffect(() => {
    if (data) {
      setSpecialists(data)
    }
  }, [data])

  if (!data) {
    return <div>fetching specialists</div>
  }

  if (error) {
    return <div>error fetching specialists</div>
  }

  return (
    <FormControl sx={{ width: 175 }}>
      <InputLabel id="specialist">Specialist</InputLabel>
      <Select
        labelId="specialist"
        value={specialistId}
        onChange={({ target }) => setSpecialistId(target.value)}
        input={<OutlinedInput label="Specialist" />}
      >
        {specialists.map((specialist) => (
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
