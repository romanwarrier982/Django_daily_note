import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListItem from '../../components/ListItem';

describe('ListItem Component', () => {
  it('renders a new note button when no note is provided', () => {
    render(
      <MemoryRouter>
        <ListItem />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { "aria-label": "plus" })).toBeInTheDocument();
  });

  it('renders a note with the correct title and description', () => {
    const note = {
      title: 'Sample Note Title',
      description: 'Sample Note Description',
      updated: '2024-11-20T12:34:56Z',
    };

    render(
      <MemoryRouter>
        <ListItem note={note} />
      </MemoryRouter>
    );

    expect(screen.getByText('Sample Note Title')).toBeInTheDocument();
    expect(screen.getByText('Sample Note Description')).toBeInTheDocument();
    expect(screen.getByText(/ago/i)).toBeInTheDocument(); // Checks for relative time (e.g., "a moment ago")
  });
});
