import axios from 'axios'
import { useState, useEffect } from 'react'
import { Specialist, SpecialistInput } from '../types'
import SpecialistForm from './components/specialist-form'

import SpecialistList from './components/specialist-list'
import specialistService from './services/specialist'

const App = () => {
  const [specialistList, setSpecialistList] = useState<Specialist[]>([])

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setSpecialistList(await specialistService.getAll())
      } catch (error) {
        console.log(error)
      }
    }
    fetchSpecialists()
  }, [])

  const submitNewSpecialist = async (values: SpecialistInput) => {
    try {
      const specialist = await specialistService.create(values)
      console.log('create', specialist)
      setSpecialistList(specialistList.concat(specialist))
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error submitting specialist')
      }
    }
  }

  const deleteSpecialist = async (id: number) => {
    try {
      await specialistService.deleteById(id)
      setSpecialistList(
        specialistList.filter(({ specialistId }) => specialistId !== id),
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('axios error' + error.message)
      } else {
        console.log('unknown error deleting specialist')
      }
    }
  }

  return (
    <div className="App">
      <SpecialistList
        specialistList={specialistList}
        deleteSpecialist={deleteSpecialist}
      />
      <SpecialistForm onSubmit={submitNewSpecialist} />
    </div>
  )
}

export default App
