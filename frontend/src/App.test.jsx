import 'regenerator-runtime/runtime';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('react-mic', () => ({
  ReactMic: jest.fn(({ record }) => (
    <div data-testid="react-mic">{record ? 'Recording' : 'Not Recording'}</div>
  )),
}));

test('renders NotesListPage at default route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/notes/i)).toBeInTheDocument(); // Update this text based on NotesListPage content
});
