import TaskForm from './task-form'
import { useState } from 'react'
import { TaskList } from './task-list'
import { Collapse } from '@mui/material'

const Tasks = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <Collapse in={collapsed}>
        <TaskForm />
      </Collapse>
      <TaskList setCollapsed={setCollapsed} collapsed={collapsed}/>
    </>
  )
}

export default Tasks
