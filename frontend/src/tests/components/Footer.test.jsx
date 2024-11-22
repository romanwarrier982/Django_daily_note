import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  it('renders the current year and copyright information', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    expect(screen.getByText(`${currentYear} Randall Thomas`, { exact: false })).toBeInTheDocument();
  });
});
