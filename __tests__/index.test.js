import React from 'react';
import { render } from '@testing-library/react';
import Index from '../src/pages/index';

test('should render the title correctly', () => {
  const { getByText } = render(<Index />);
  const titleElement = getByText(/Welcome to Volley!/);

  expect(titleElement).toBeInTheDocument();
});
