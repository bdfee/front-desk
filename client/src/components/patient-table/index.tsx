import PatientTable from './patient-table'
import AddPatientModal from '../patient-modal'
import { createContext } from 'react'
import { PatientDetail } from '../../types'

interface FormActionContextType {
  type: string
  patient?: PatientDetail
}

export const FormActionCtx = createContext<FormActionContextType | null>(null)

const PatientPage = () => {
  const formCtx = { type: 'add' }
  return (
    <>
      <PatientTable />
      <FormActionCtx.Provider value={formCtx}>
        <AddPatientModal />
      </FormActionCtx.Provider>
    </>
  )
}

export default PatientPage
