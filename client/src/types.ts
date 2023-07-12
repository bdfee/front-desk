import { Dispatch, SetStateAction } from 'react'

export interface Specialist {
  specialistId: number
  name: string
  speciality: string
  [key: string]: string | number
}

export type SpecialistInput = Omit<Specialist, 'specialistId'>

export interface Patient {
  patientId: number
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  specialistId: number
}

export interface SpecialistFormProps {
  closeModal: () => void
}

export type PatientInput = Omit<Patient, 'patientId'>

export type PatientDetail = Patient & {
  specialist: Omit<Specialist, 'specialistId | speciality'>
}

export interface PatientModalProps {
  type: string
}

export interface PatientFormProps {
  type: string
  closeModal: () => void
}

export interface SpecialistModalProps {
  closeModal: () => void
  modalOpen: boolean
}

export interface InformationListProps {
  patientId: number
}

export interface SelectSpecialistProps {
  specialistId: string
  setSpecialistId: Dispatch<SetStateAction<string>>
}

export interface SelectPatientProps {
  patientId: string
  setPatientId: Dispatch<SetStateAction<string>>
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non-binary',
  Transgender = 'transgender',
}

export interface Appointment {
  appointmentId: number
  patientId: number
  specialistId: number
  date: string
  start: string
  end: string
  type: string
  description: string
}

export type AppointmentDetail = Appointment & {
  specialist: Omit<Specialist, 'speciality'>
  patient: Omit<
    Patient,
    'email' | 'phone' | 'dateOfBirth' | 'gender' | 'address' | 'specialistId'
  >
}

export type AppointmentInput = Omit<Appointment, 'appointmentId'>

export interface RBCEventProps {
  title: string
  appointmentId: number
  type: string
  start: Date
  end: Date
}

export interface RBCEventPropsForForm {
  start: string
  end: string
  date: string
}

export interface RBCProps {
  openModal: (values: RBCEventPropsForForm) => void
}

export type NewEvent = Omit<RBCEventProps, 'title' | 'appointmentId' | 'type'>

export interface TableData {
  specialist: Specialist
  appointmentCount: number
  patientCount: number
}

export interface TableProps {
  setError: (errorMessage: string) => () => void
}

export interface SwatchProps {
  color: string
}

export interface AppointmentFormProps {
  serviceType: string
  closeModal: () => void
  formValues?: RBCEventPropsForForm
}

export interface BaseAppointmentModalProps {
  serviceType: string
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  formValues?: RBCEventPropsForForm
  clearFormValues?: () => void
}

export interface SelectTypeProps {
  type: string
  setType: Dispatch<SetStateAction<string>>
}

export interface FetchedFormComponentsProps {
  patientId: string
  setPatientId: Dispatch<SetStateAction<string>>
  specialistId: string
  setSpecialistId: Dispatch<SetStateAction<string>>
  type: string
  setType: Dispatch<SetStateAction<string>>
}

export interface AppointmentListProps {
  id: number
}
