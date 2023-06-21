import InformationList from './patient-information'
import PatientModal from '../patient-modal'
import { useState, useEffect } from 'react'
import { PatientDetail } from '../../types'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import patientService from '../../services/patients'

const PatientInformation = () => {
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

  return (
    <>
      <InformationList patient={patient} />
      <PatientModal type="edit" state={patient} stateSetter={setPatient} />
    </>
  )
}

export default PatientInformation
