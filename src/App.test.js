import { render, screen } from '@testing-library/react';
import App from './App';

test('renders phone input component', () => {
  render(<App />); 
  const phoneElement = screen.getByLabelText('(123) 456-7890');
  expect(phoneElement).toBeInTheDocument();
});
