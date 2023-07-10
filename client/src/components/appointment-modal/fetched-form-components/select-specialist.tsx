import { Dispatch, SetStateAction } from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { Specialist } from '../../../types'
import { useQuery } from '@tanstack/react-query'
// import { useFetchSpecialists } from '../../specialistActions'
import specialistService from '../../../services/specialist'

export interface SelectSpecialistProps {
  specialistId: string
  setSpecialistId: Dispatch<SetStateAction<string>>
}

const SelectSpecialist = ({
  specialistId,
  setSpecialistId,
}: SelectSpecialistProps) => {
  let specialists: Specialist[]

  const { data: specialistData, status } = useQuery<Specialist[]>({
    queryKey: ['SPECIALISTS'],
    queryFn: specialistService.getAll,
  })

  if (status === 'error') {
    return <div>error fetching specialists</div>
  }

  if (status === 'loading') {
    specialists = []
  } else specialists = specialistData

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
