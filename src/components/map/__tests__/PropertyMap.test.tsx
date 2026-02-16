import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import { Window } from 'happy-dom';

// Setup DOM environment manually for this test file
const window = new Window();
// @ts-expect-error - Manual shim for testing environment
global.window = window;
// @ts-expect-error - Manual shim for testing environment
global.document = window.document;
// @ts-expect-error - Manual shim for testing environment
global.navigator = window.navigator;
// @ts-expect-error - Manual shim for testing environment
global.HTMLDivElement = window.HTMLDivElement; // Needed for useRef<HTMLDivElement>

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PropertyMap from '../PropertyMap';

// Mock mapbox-gl
const mockMapInstance = {
  addControl: mock(() => {}),
  remove: mock(() => {}),
  flyTo: mock(() => {}),
  on: mock(() => {}),
};

const mockMapConstructor = mock(() => mockMapInstance);

mock.module('mapbox-gl', () => {
  return {
    default: {
      Map: mockMapConstructor,
      NavigationControl: mock(() => ({})),
      accessToken: '',
    },
  };
});

describe('PropertyMap', () => {
  beforeEach(() => {
    mockMapConstructor.mockClear();
    mockMapInstance.addControl.mockClear();
    mockMapInstance.remove.mockClear();
    mockMapInstance.flyTo.mockClear();
    // Reset DOM
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cleanup();
  });

  test('should initialize map on mount', () => {
    render(<PropertyMap center={[0, 0]} zoom={10} />);

    expect(mockMapConstructor).toHaveBeenCalledTimes(1);
    expect(mockMapConstructor).toHaveBeenCalledWith(expect.objectContaining({
      center: [0, 0],
      zoom: 10,
    }));
  });

  test('should update map center and zoom when props change', () => {
    const { rerender } = render(<PropertyMap center={[0, 0]} zoom={10} />);

    expect(mockMapConstructor).toHaveBeenCalledTimes(1);

    // Update props
    rerender(<PropertyMap center={[10, 10]} zoom={15} />);

    // Check if flyTo was called (this is the desired behavior)
    expect(mockMapInstance.flyTo).toHaveBeenCalledWith(expect.objectContaining({
      center: [10, 10],
      zoom: 15,
    }));
  });
});
