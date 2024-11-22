class MockAudioContext {
  constructor() {
    this.createMediaStreamSource = jest.fn();
    this.destination = {};
  }
  createOscillator() {
    return {
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
    };
  }
  close() {
    return Promise.resolve();
  }
}

// Mock window.AudioContext and window.webkitAudioContext
global.AudioContext = MockAudioContext;
global.webkitAudioContext = MockAudioContext;
