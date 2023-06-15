import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SpecialistTable from './specialist-table'
import { createLocalSpecialistList } from '../../testHelpers/specialists'
import { Specialist } from '../../types'
import userEvent from '@testing-library/user-event'

const renderSpecialistTable = (specialistList: Specialist[]) => {
  const mockDeleteSpecialist = jest.fn()
  const mockUpdateSpecialist = jest.fn()
  const mockSetError = jest.fn()

  render(
    <SpecialistTable
      specialistList={specialistList}
      deleteSpecialist={mockDeleteSpecialist}
      updateSpecialist={mockUpdateSpecialist}
      setError={mockSetError}
    />,
  )

  return screen.getByTestId('specialist-table')
}

describe('table elements', () => {
  test('table rows and columns are rendered', async () => {
    const specialistList = createLocalSpecialistList(1)

    const table = renderSpecialistTable(specialistList)

    const tableHead = Array.from(table.querySelectorAll('th'))
    expect(tableHead).toHaveLength(3)
    tableHead.map((th) => {
      expect(th).toBeDefined()
    })

    const tableData = Array.from(table.querySelectorAll('td'))
    expect(tableData).toHaveLength(3)
    tableData.map((td) => {
      expect(td).toBeDefined()
    })

    const actionButtons = Array.from(tableData[2].querySelectorAll('button'))
    actionButtons.map((btn) => {
      expect(btn).toBeDefined()
    })
  })
})

describe('actions update table structure', () => {
  const getActionButtons = (table: HTMLElement) =>
    Array.from(table.querySelectorAll('td'))[2].querySelectorAll('button')

  test('edit button toggles target cells into inputs', async () => {
    const specialistList = createLocalSpecialistList(1)
    const table = renderSpecialistTable(specialistList)
    const actionButtons = getActionButtons(table)

    userEvent.click(actionButtons[1])
    expect(Array.from(table.querySelectorAll('input'))).toHaveLength(2)
  })

  test('edit button adds save to target row', () => {
    //
  })

  test('edit button adds cancel to target row', () => {
    //
  })

  test('edit button removes edit button from other rows', () => {
    //
  })
})

describe('user actions in edit mode', () => {
  test('name input can be edited', () => {
    //
  })

  test('speciality can be edited', () => {
    //
  })

  test('edited name calls updateSpecialist', () => {
    //
  })

  test('edited speciality calls updateSpecialist', () => {
    //
  })

  test('cancelled edit returns cells to original values', () => {
    //
  })

  test('invalid name displays expected message', () => {
    //
  })

  test('invalid speciality returns expected message', () => {
    //
  })
})
