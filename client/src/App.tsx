import { useState, useEffect } from 'react'
import { Specialist } from '../types'

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

  return (
    <div className="App">
      <SpecialistList specialistList={specialistList} />
    </div>
  )
}

export default App
