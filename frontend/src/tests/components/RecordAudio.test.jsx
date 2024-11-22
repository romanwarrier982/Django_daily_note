import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RecordAudio from '../../components/RecordAudio';

jest.mock('react-mic', () => ({
  ReactMic: jest.fn(({ record }) => (
    <div data-testid="react-mic">{record ? 'Recording' : 'Not Recording'}</div>
  )),
}));

describe('RecordAudio Component', () => {
  it('starts and stops recording', () => {
    render(<RecordAudio onAudioUpload={jest.fn()} />);

    fireEvent.click(screen.getByText(/start/i));
    expect(screen.getByText(/stop/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/stop/i));
    expect(screen.getByText(/start/i)).toBeInTheDocument();
  });
});
