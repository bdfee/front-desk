import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import { SetStateAction, Dispatch, useEffect } from 'react'
import { useAlertCtx } from '../../components/context-providers/alert'
import { useFetchUsers } from './actions'
import { getSecureLocalStorageId } from '../user-admin/actions'

interface SelectUserProps {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
}

const SelectUser = ({ userId, setUserId }: SelectUserProps) => {
  const alertCtx = useAlertCtx()

  useEffect(() => {
    const id = getSecureLocalStorageId()
    if (id) {
      setUserId('' + id)
    }
  }, [])

  const { data: users, status } = useFetchUsers(alertCtx?.setAlertPayload)

  if (status === 'error' || status === 'loading') {
    return <div>{status}: fetching users</div>
  }

  return (
    <FormControl
      sx={{
        width: 175,
      }}
    >
      <InputLabel id="select-user">User</InputLabel>
      <Select
        labelId="select-user"
        value={userId}
        onChange={({ target }) => setUserId(target.value)}
        input={<OutlinedInput label="User" />}
      >
        {users.map((user) => (
          <MenuItem key={user.userId} value={user.userId.toString()}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
      {userId && (
        <Button
          style={{
            color: 'primary',
          }}
          size="small"
          onClick={() => setUserId('')}
        >
          clear
        </Button>
      )}
    </FormControl>
  )
}

export default SelectUser
