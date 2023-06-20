import PatientInformation from './patient-information'
import AddPatientModal from './add-patient-modal'
import { createContext, useState, useEffect } from 'react'
import { PatientDetail } from '../../types'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import patientService from '../../services/patients'

interface FormActionContextType {
  type: string
  patient: PatientDetail
}

export const PatientFormActionCtx = createContext<FormActionContextType | null>(
  null,
)

const InfoIndex = () => {
  const [patient, setPatient] = useState<PatientDetail>()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id) {
          const patient = await patientService.getOneById(+id)
          setPatient(patient)
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('axios error' + error.message)
        } else {
          console.log('unknown error fetching patient')
        }
      }
    }
    void fetchPatient()
  }, [id])
  if (!patient) {
    return <div>fetching patient info</div>
  }

  const formUpdateCtx: FormActionContextType = { type: 'update', patient }
  return (
    <div id="form">
      <PatientFormActionCtx.Provider value={formUpdateCtx}>
        <PatientInformation />
        <AddPatientModal />
      </PatientFormActionCtx.Provider>
    </div>
  )
}

export default InfoIndex
