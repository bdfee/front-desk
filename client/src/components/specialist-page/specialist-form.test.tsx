import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddSpecialistForm from './specialist-form'

describe('form elements', () => {
  test('get elements by aria label', () => {
    render(
      <AddSpecialistForm
        onSubmit={(values) => console.log(values)}
        onCancel={() => console.log('cancel')}
        setError={() => undefined}
      />,
    )

    expect(screen.getByLabelText('Specialist form'))
    expect(screen.getByLabelText('Name input'))
    expect(screen.getByLabelText('Specialty input'))
    expect(screen.getByLabelText('Cancel button'))
    expect(screen.getByLabelText('Submit button'))
  })
})

// describe('validation', () => {

// })
