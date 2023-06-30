import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import SpecialistTable from './table'
import { createLocalSpecialistList } from '../../testHelpers/specialists'
import { Specialist } from '../../types'
import userEvent from '@testing-library/user-event'

// const renderSpecialistTable = (specialistList: Specialist[]) => {
//   const mockDeleteSpecialist = jest.fn()
//   const mockUpdateSpecialist = jest.fn()
//   const mockSetError = jest.fn()

//   render(
//     <SpecialistTable
//       specialistList={specialistList}
//       deleteSpecialist={mockDeleteSpecialist}
//       updateSpecialist={mockUpdateSpecialist}
//       setError={mockSetError}
//     />,
//   )

//   return {
//     screen: screen.getByTestId('specialist-table'),
//     functions: {
//       delete: mockDeleteSpecialist(),
//       update: mockUpdateSpecialist(),
//       error: mockSetError(),
//     },
//   }
// }

// describe('table elements', () => {
//   test('table rows and columns are rendered', async () => {
//     const specialistList = createLocalSpecialistList(1)

//     const table = renderSpecialistTable(specialistList).screen

//     const tableHead = Array.from(table.querySelectorAll('th'))
//     expect(tableHead).toHaveLength(3)
//     tableHead.map((th) => {
//       expect(th).toBeDefined()
//     })

//     const tableData = Array.from(table.querySelectorAll('td'))
//     expect(tableData).toHaveLength(3)
//     tableData.map((td) => {
//       expect(td).toBeDefined()
//     })

//     const actionButtons = Array.from(tableData[2].querySelectorAll('button'))
//     actionButtons.map((btn) => {
//       expect(btn).toBeDefined()
//     })
//   })
// })

// const getActionButtons = (table: HTMLElement) =>
//   Array.from(table.querySelectorAll('td'))[2].querySelectorAll('button')

// describe('actions update table structure', () => {
//   test('edit button toggles target cells into inputs', async () => {
//     const specialistList = createLocalSpecialistList(1)
//     const table = renderSpecialistTable(specialistList).screen
//     const actionButtons = getActionButtons(table)

//     userEvent.click(actionButtons[1])
//     expect(Array.from(table.querySelectorAll('input'))).toHaveLength(2)
//   })

//   test('edit button adds save to target row', () => {
//     const specialistList = createLocalSpecialistList(1)
//     const table = renderSpecialistTable(specialistList).screen
//     const actionButtons = getActionButtons(table)

//     userEvent.click(actionButtons[1])
//     expect(screen.getByText('cancel'))
//     expect(screen.getByText('save'))
//     expect(screen.getByText('delete'))
//   })

//   test('edit button removes edit button from other rows', () => {
//     const specialistList = createLocalSpecialistList(2)
//     const table = renderSpecialistTable(specialistList).screen
//     const actionButtonsRowOne = getActionButtons(table)
//     userEvent.click(actionButtonsRowOne[1])
//     expect(screen.getAllByText('cancel')).toHaveLength(1)
//     expect(screen.queryByText('edit')).not.toBeInTheDocument()
//   })
// })

// describe('user actions in edit mode', () => {
//   test('name input can be edited', () => {
//     const specialistList = createLocalSpecialistList(1)
//     const table = renderSpecialistTable(specialistList).screen
//     const actionButtons = getActionButtons(table)

//     userEvent.click(actionButtons[1])

//     const name = screen.getByDisplayValue('test specialist')
//     userEvent.type(name, '{selectall}')
//     userEvent.type(name, '{backspace}')
//     userEvent.type(name, 'edited name')

//     expect(screen.getByDisplayValue('edited name'))
//   })

//   test('speciality can be edited', () => {
//     const specialistList = createLocalSpecialistList(1)
//     const table = renderSpecialistTable(specialistList).screen
//     const actionButtons = getActionButtons(table)

//     userEvent.click(actionButtons[1])

//     const speciality = screen.getByDisplayValue('test speciality')
//     userEvent.type(speciality, '{selectall}')
//     userEvent.type(speciality, '{backspace}')
//     userEvent.type(speciality, 'edited speciality')

//     expect(screen.getByDisplayValue('edited speciality'))
//   })

//   test('edited name calls updateSpecialist', () => {
//     //
//   })

//   test('edited speciality calls updateSpecialist', () => {
//     //
//   })

//   test('cancelled edit returns cells to original values', () => {
//     //
//   })

//   test('invalid name displays expected message', () => {
//     //
//   })

//   test('invalid speciality returns expected message', () => {
//     //
//   })
// })
