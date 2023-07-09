import { render, screen, fireEvent } from '@testing-library/react';
import PhoneInput from './phoneInput';

const setup = async () => {
  const utils = render(<PhoneInput />);
  const input = await screen.getByLabelText('(123) 456-7890');
  console.log(input.value);
  return {
    input,
    ...utils,
  }
}

// afterEach(() => )

test('It should not allow letters to be inputted', async () => {
  const {input} = await setup()
  expect(input.value).toBe('') // empty before
  fireEvent.change(input, {target: {value: 'Good Day'}})
  expect(input.value).toBe('') //empty after
});

test('It should keep first 3 digits non formatted', async () => {
  const {input} = await setup()
  fireEvent.change(input, {target: {value: '123'}})
  expect(input.value).toBe('123');
});

test('It should format input of size > 3 && size<=6', async () => {
  const {input} = await setup()
  fireEvent.change(input, {target: {value: '123456'}})
  expect(input.value).toBe('(123) 456');
});

test('It should format input of size > 6', async () => {
  const {input} = await setup()
  fireEvent.change(input, {target: {value: '1234567890'}})
  expect(input.value).toBe('(123) 456-7890');
});