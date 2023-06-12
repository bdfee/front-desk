import { TextField, Grid, Button } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { SpecialistFormProps } from '../../types'

const SpecialistForm = (props: SpecialistFormProps) => {
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')

  const addSpecialist = (event: SyntheticEvent) => {
    event.preventDefault()
    props.onSubmit({
      name,
      speciality,
    })
  }

  return (
    <div>
      <form onSubmit={addSpecialist}>
        <TextField
          id="name"
          label="Standard"
          variant="standard"
          value={name}
          onChange={({ target }) => {
            setName(target.value)
          }}
        />
        <TextField
          id="speciality"
          label="Standard"
          variant="standard"
          value={speciality}
          onChange={({ target }) => setSpeciality(target.value)}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default SpecialistForm
