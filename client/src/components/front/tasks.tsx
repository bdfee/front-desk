import { List, ListItemText, Typography, Divider } from '@mui/material'

const Tasks = () => {
  return (
    <>
      <Typography>todays tasks</Typography>
      <Divider />
      <List>
        <ListItemText primary="task title" secondary={'task description'} />
      </List>
    </>
  )
}

export default Tasks
