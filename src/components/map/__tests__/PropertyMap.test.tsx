import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import PropertyMap from "../PropertyMap";
import React from "react";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Initialize happy-dom for React
GlobalRegistrator.register();

// Mock mapbox-gl
const flyToMock = mock(() => {});
const removeMock = mock(() => {});
const addControlMock = mock(() => {});

// Mock the Map class
// We need to store the instance so we can verify methods called on it
let mapInstance: Record<string, unknown> | undefined;

const MapMock = mock((options: Record<string, unknown>) => {
  mapInstance = {
    options,
    addControl: addControlMock,
    remove: removeMock,
    flyTo: flyToMock,
    on: mock(() => {}),
  };
  return mapInstance;
});

mock.module("mapbox-gl", () => {
  return {
    default: {
      Map: MapMock,
      NavigationControl: mock(() => {}),
      accessToken: "",
    },
  };
});

describe("PropertyMap Performance", () => {
  beforeEach(() => {
    MapMock.mockClear();
    flyToMock.mockClear();
    removeMock.mockClear();
    addControlMock.mockClear();
    mapInstance = undefined;
  });

  afterEach(() => {
    cleanup();
  });

  test("should initialize map once and use flyTo for updates", () => {
    const { rerender } = render(<PropertyMap center={[0, 0]} zoom={10} />);

    // Check initialization
    expect(MapMock).toHaveBeenCalledTimes(1);
    const initialCall = MapMock.mock.calls[0][0];
    expect(initialCall.center).toEqual([0, 0]);
    expect(initialCall.zoom).toBe(10);

    // Update props
    rerender(<PropertyMap center={[1, 1]} zoom={12} />);

    // Check optimization: flyTo should be called
    // It's called twice: once on mount (redundant but harmless), and once on update
    expect(flyToMock).toHaveBeenCalledTimes(2);

    const flyToCall = flyToMock.mock.calls[1][0];
    expect(flyToCall.center).toEqual([1, 1]);
    expect(flyToCall.zoom).toBe(12);

    // Map should NOT be re-initialized
    expect(MapMock).toHaveBeenCalledTimes(1);
  });
});
