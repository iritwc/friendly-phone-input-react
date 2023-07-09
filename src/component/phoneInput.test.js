import { render, screen, fireEvent, keyboard } from '@testing-library/react';
import PhoneInput from './phoneInput';
// import { keyboard } from '@testing-library/user-event';

const setup = async () => {
  const utils = render(<PhoneInput />);
  const input = await screen.getByRole('textbox', {name: "(123) 456-7890"});
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

test('It should fromat for size<=3', async () => {
  const {input} = await setup()
  fireEvent.change(input, {target: {value: '123'}})
  expect(input.value).toBe('123');
});

test('It should format for size > 3 && size<=6', async () => {
  const {input} = await setup()
  fireEvent.change(input, {target: {value: '123456'}})
  expect(input.value).toBe('(123) 456');
});

test('It should format for size > 6', async () => {
  const {input} = await setup()
  fireEvent.change(input, {target: {value: '1234567890'}})
  expect(input.value).toBe('(123) 456-7890');
});

test('It should reposition the caret and keep format rule on Insert', async () => {
  const {input} = await setup()
  fireEvent.change(input, {target: {value: '124'}});
  expect(input.value).toBe('124') // need to make a change so React registers "" as a change
  expect(input.selectionStart).toBe(3);
  // Simulate a 'Backspace' keydown
  fireEvent.change(input, {target: {value: input.value, selectionStart: input.selectionStart-1}});
  expect(input.selectionStart).toBe(2);
  // fireEvent.keyDown(input, {key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37});
  fireEvent.keyDown(input, {key: 3, code: 'Digit3', keyCode: 51});
  fireEvent.change(input, {target: {value: '1234', selectionStart: 3}});
  expect(input.value).toBe('(123) 4');
  expect(input.selectionStart).toBe(4);
});

test('It should reposition the caret and keep format rule on Delete', async () => {
  const {input} = await setup()
  fireEvent.change(input, {target: {value: '12345567'}});
  expect(input.value).toBe('(123) 455-67');
  fireEvent.change(input, {target: {value: '(123) 45-67', selectionStart:9 }});
  expect(input.value).toBe('(123) 456-7');
  expect(input.selectionStart).toBe(8);
});