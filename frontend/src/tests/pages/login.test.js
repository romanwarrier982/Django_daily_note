import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { login } from '../../services/api';
import Login from '../../pages/Login';

// Mock the login API function
jest.mock('../../services/api', () => ({
  login: jest.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test('renders login form correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username or Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
  });

  test('shows validation errors when form is submitted empty', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    const errorMessages = await screen.findAllByText('This field is required');
    expect(errorMessages).toHaveLength(2); // Assuming there are two errors
  });

  test('submits the form with correct data', async () => {
    const mockLoginResponse = {
      access: 'test-access-token',
      refresh: 'test-refresh-token',
    };

    login.mockResolvedValueOnce(mockLoginResponse);

    render(
      <Router>
        <Login />
      </Router>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });

  });

  test('handles login failure gracefully', async () => {
    const mockError = {
      response: { data: { error: 'Invalid credentials' } },
    };
    login.mockRejectedValueOnce(mockError);

    render(
      <Router>
        <Login />
      </Router>
    );

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: 'wronguser',
        password: 'wrongpassword',
      });
    });

  });
});
