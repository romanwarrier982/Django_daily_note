import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';

describe('Header Component', () => {
  it('renders the header with Notes title and a dark mode toggle', () => {
    const mockSetDarkMode = jest.fn();
    render(
      <MemoryRouter>
        <Header darkMode={true} setDarkMode={mockSetDarkMode} />
      </MemoryRouter>
    );

    expect(screen.getByText('Daily Notes')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /notes/i })).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument(); // The moon icon
  });

  it('calls setDarkMode when the toggle is clicked', () => {
    const mockSetDarkMode = jest.fn();
    render(
      <MemoryRouter>
        <Header darkMode={true} setDarkMode={mockSetDarkMode} />
      </MemoryRouter>
    );

    const toggle = screen.getByRole('img');
    fireEvent.click(toggle);

    expect(mockSetDarkMode).toHaveBeenCalledWith(false); // Expect dark mode to toggle off
  });
});
