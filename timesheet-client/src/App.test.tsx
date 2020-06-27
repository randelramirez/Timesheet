import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Login from './containers/Login/Login';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Sign in');
  expect(linkElement).toBeInTheDocument();
});
