import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
// import SpecialistForm from '../specialist-modal/specialist-form'

// describe('form elements', () => {
//   test('get elements by aria label', () => {
//     render(
//       <SpecialistForm
//         onSubmit={(values) => console.log(values)}
//         onCancel={() => console.log('cancel')}
//         setError={() => undefined}
//       />,
//     )

//     expect(screen.getByLabelText('Specialist form'))
//     expect(screen.getByLabelText('Name input'))
//     expect(screen.getByLabelText('Speciality input'))
//     expect(screen.getByLabelText('Cancel button'))
//     expect(screen.getByLabelText('Add button'))
//   })
// })

// test('submit disable with empty fields', () => {
//   const mockOnSubmit = jest.fn()
//   const mockSetError = jest.fn()
//   const mockOnCancel = jest.fn()

//   render(
//     <SpecialistForm
//       onSubmit={mockOnSubmit}
//       setError={mockSetError}
//       onCancel={mockOnCancel}
//     />,
//   )

//   const nameInput = screen.getByLabelText('Name input')
//   userEvent.type(nameInput, '{selectall}')
//   userEvent.type(nameInput, '{backspace}')
//   userEvent.type(nameInput, 'John')

//   expect(screen.getByLabelText('Add button')).toBeDisabled()
//   expect(mockOnSubmit).not.toHaveBeenCalled()

//   const specialityInput = screen.getByLabelText('Speciality input')
//   userEvent.type(nameInput, '{selectall}')
//   userEvent.type(nameInput, '{backspace}')
//   userEvent.type(specialityInput, 'Dentist')

//   expect(screen.getByLabelText('Add button')).toBeDisabled()
//   expect(mockSetError).not.toHaveBeenCalled()
// })
