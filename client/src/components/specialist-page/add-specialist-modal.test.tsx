import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddSpecialistModal from '../specialist-modal'

// const renderModal = () =>
//   render(
//     <AddSpecialistModal
//       modalOpen={true}
//       onClose={() => console.log('closed')}
//       onSubmit={(values) => {
//         console.log('onSubmit: ' + values)
//       }}
//       error={undefined}
//       setError={(error) => {
//         console.log(error)
//       }}
//     />,
//   )

// test('get elements', () => {
//   renderModal()
//   expect(screen.getByLabelText('dialog-title')).toBeDefined()
//   expect(screen.getByText('Add a new specialist')).toBeDefined()
// })

// test('modal renders specialist form', () => {
//   renderModal()
//   expect(screen.getByLabelText('Specialist form'))
// })
