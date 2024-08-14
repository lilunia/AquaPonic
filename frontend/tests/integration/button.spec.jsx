import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../../src/components/Button'

test('Properly renders passed text', () => {
	render(<Button>Click me!</Button>)
	const button = screen.getByRole('button')
	expect(button).toHaveTextContent('Click me!')
})

test('Calls onClick callback after being clicked', () => {
	const onClickCallback = jest.fn(() => console.log('Button clicked'))
	render(<Button onClick={onClickCallback} />)
	fireEvent.click(screen.getByRole('button'))
	expect(onClickCallback).toHaveBeenCalled()
})
