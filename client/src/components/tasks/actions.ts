import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import taskService from '../../services/task'
import userService from '../../services/user'
import { SetAlertPayload, TaskDetail, TaskInput } from '../../types'

export const useFetchTasks = (setAlertPayload?: SetAlertPayload) =>
  useQuery<TaskDetail[], Error>({
    queryKey: ['TASKS'],
    queryFn: taskService.getAll,
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching tasks', 'page'),
  })

export const useFetchUserTasksById = (
  userId: number,
  setAlertPayload?: SetAlertPayload,
) =>
  useQuery<TaskDetail[]>({
    queryKey: ['TASKS', userId],
    queryFn: () => userService.getTasksByUser(userId),
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error fetching user tasks', 'page'),
  })

export const useDeleteTaskById = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
  useMutation({
    mutationFn: (id: number) => taskService.deleteById(id),
    onSuccess: (_, id: number) => {
      queryClient.setQueryData<TaskDetail[]>(['TASKS'], (oldTasks = []) =>
        oldTasks.filter((task) => task.taskId !== id),
      )

      setAlertPayload && setAlertPayload('success', 'task deleted', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error deleting task', 'page'),
  })

export const useUpdateTaskById = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
  useMutation<TaskDetail, Error, { taskId: number; values: TaskInput }>({
    mutationFn: ({ taskId, values }) => taskService.updateById(taskId, values),
    onSuccess: (data, { taskId }) => {
      queryClient.setQueryData<TaskDetail[]>(['TASKS'], (oldTasks = []) =>
        oldTasks.map((task) => (task.taskId === taskId ? data : task)),
      )
      setAlertPayload && setAlertPayload('success', 'task updated', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error updating task', 'page'),
  })

export const useCreateTask = (
  queryClient: QueryClient,
  setAlertPayload?: SetAlertPayload,
) =>
  useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TASKS'] })
      setAlertPayload && setAlertPayload('success', 'task added', 'page')
    },
    onError: () =>
      setAlertPayload &&
      setAlertPayload('error', 'error creating task', 'page'),
  })
