import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search bar', () => {
  render(<App />);
  const searchBar = screen.getByLabelText('Search');
  expect(searchBar).toBeInTheDocument();
});

test('renders sorting select', () => {
  render(<App />);
  const sortBy = screen.getByLabelText('Sort by');
  expect(sortBy).toBeInTheDocument();
});
