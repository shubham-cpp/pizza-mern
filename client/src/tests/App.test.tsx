import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('should render "Hello react"', () => {
  const { getByRole } = render(<App />);
  expect(
    getByRole('heading', { name: 'Hello from react' }),
  ).toBeInTheDocument();
});
