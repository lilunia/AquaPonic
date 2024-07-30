import { render, fireEvent, screen } from '@testing-library/react/pure'
import { Input } from '../../src/components/Input/Input'

test('Passes input value to callback function', () => {
	const mockOnChange = jest.fn()
	render(<Input onChange={e => mockOnChange(e.target.value)} />)
	const input = screen.getByTestId('input-test')

	fireEvent.change(input, { target: { value: 'H' } })
	fireEvent.change(input, { target: { value: 'Hello' } })
	expect(mockOnChange).toHaveBeenCalledTimes(2)
	expect(mockOnChange).toHaveBeenCalledWith('H')
	expect(mockOnChange).toHaveBeenCalledWith('Hello')
})
