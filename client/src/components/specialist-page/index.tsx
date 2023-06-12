import { useEffect, useState } from 'react'
import SpecialistList from './specialist-list'
import SpecialistForm from './specialist-form'
import axios from 'axios'
import { Specialist, SpecialistInput } from '../../../types'
import specialistService from '../../services/specialist'

const SpecialistPage = () => {
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
    <>
      <SpecialistList
        specialistList={specialistList}
        deleteSpecialist={deleteSpecialist}
      />
      <SpecialistForm onSubmit={submitNewSpecialist} />
    </>
  )
}

export default SpecialistPage
