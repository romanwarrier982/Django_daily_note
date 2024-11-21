import 'regenerator-runtime/runtime';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders NotesListPage at default route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/notes/i)).toBeInTheDocument(); // Update this text based on NotesListPage content
});

test('renders Login page at /login', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument(); // Update based on Login page content
});

test('renders Signup page at /signup', () => {
  render(
    <MemoryRouter initialEntries={['/signup']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/signup/i)).toBeInTheDocument(); // Update based on Signup page content
});

test('renders NotePage for a specific note', () => {
  render(
    <MemoryRouter initialEntries={['/note/1']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/note/i)).toBeInTheDocument(); // Update based on NotePage content
});
