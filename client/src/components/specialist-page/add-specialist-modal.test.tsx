import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddSpecialistModal from './add-specialist-modal'

test('modal opens props', () => {
  render(
    <AddSpecialistModal
      modalOpen={true}
      onClose={() => console.log('closed')}
      onSubmit={(values) => {
        console.log('onSubmit: ' + values)
      }}
      error={undefined}
      setError={(error) => {
        console.log(error)
      }}
    />,
  )

  const modal = screen.getByRole('dialog')
  expect(modal).toBeDefined()
})
